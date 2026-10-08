"""Génère src/assets/seven-fronts-map.svg : carte stylisée et originale de l'Europe
découpée en régions (Voronoï sur un contour tracé à la main dans coast.py).

Usage (hors dépendances du site) :
    python3 -m venv .venv && .venv/bin/pip install shapely numpy
    .venv/bin/python scripts/map/map.py src/assets/seven-fronts-map.svg
"""
import sys, math, random
import numpy as np
from shapely.geometry import Polygon, MultiPolygon, Point, MultiPoint, box, LineString
from shapely.ops import unary_union, voronoi_diagram, linemerge
from shapely import make_valid
sys.path.insert(0, sys.path[0])
from coast import *

random.seed(7); np.random.seed(7)
LON0, LON1, LAT0, LAT1 = -11.5, 42.0, 34.8, 64.0
KX = math.cos(math.radians(51))
W = 1000.0
S = W / ((LON1 - LON0) * KX)
H = round((LAT1 - LAT0) * S)
def P(lon, lat): return ((lon - LON0) * KX * S, (LAT1 - lat) * S)
def poly(c): return make_valid(Polygon([P(*p) for p in c]))

frame = box(0, 0, W, H)
main = poly(MAINLAND).difference(poly(BLACK_SEA)).difference(poly(AZOV))
land = unary_union([main] + [poly(i) for i in ISLANDS]).intersection(frame)
africa = poly(AFRICA).intersection(frame)
sea = frame.difference(land).difference(africa)
print('H', H, 'land area', land.area, 'valid', land.is_valid)

def poisson(geom, r, extra=(), tries=60000):
    pts = list(extra)
    minx, miny, maxx, maxy = geom.bounds
    from shapely.prepared import prep
    pg = prep(geom)
    grid = {}
    def ok(x, y):
        gx, gy = int(x // r), int(y // r)
        for i in range(gx - 1, gx + 2):
            for j in range(gy - 1, gy + 2):
                for (px, py) in grid.get((i, j), []):
                    if (px - x) ** 2 + (py - y) ** 2 < r * r: return False
        return True
    def add(x, y): grid.setdefault((int(x // r), int(y // r)), []).append((x, y))
    for p in pts: add(*p)
    for _ in range(tries):
        x = random.uniform(minx, maxx); y = random.uniform(miny, maxy)
        if pg.contains(Point(x, y)) and ok(x, y):
            pts.append((x, y)); add(x, y)
    return pts

# graines garanties sur les îles
island_seeds = [tuple(poly(i).representative_point().coords[0]) for i in ISLANDS]
land_pts = poisson(land, 27, island_seeds)
sea_pts = poisson(sea, 70)
print('land seeds', len(land_pts), 'sea seeds', len(sea_pts))

def cells(pts, clip):
    vd = voronoi_diagram(MultiPoint(pts), envelope=frame.buffer(200))
    out = []
    for c in vd.geoms:
        g = c.intersection(clip)
        if g.is_empty or g.area < 4: continue
        # garder la/les parties : on garde tout, mais on ignore les miettes
        if g.geom_type == 'MultiPolygon':
            parts = [p for p in g.geoms if p.area > 4]
            if not parts: continue
            g = MultiPolygon(parts)
        elif g.geom_type != 'Polygon':
            polys = [p for p in getattr(g, 'geoms', []) if p.geom_type == 'Polygon' and p.area > 4]
            if not polys: continue
            g = MultiPolygon(polys)
        out.append(g)
    return out

land_cells = cells(land_pts, land)
sea_cells = cells(sea_pts, sea)
print('land cells', len(land_cells), 'sea cells', len(sea_cells))

# 7 camps : capitales (lon, lat), rayon d'influence, couleur
CAMPS = [
  ((-3.7, 40.4), 290, '#a8853f'),   # ocre
  ((2.35, 47.6), 215, '#4d6a86'),   # acier
  ((-1.8, 53.2), 260, '#3f6b67'),   # sarcelle
  ((11.0, 51.6), 200, '#5f7350'),   # olive
  ((13.5, 42.6), 175, '#99604a'),   # terre cuite
  ((30.5, 51.5), 235, '#7d3a2f'),   # sang-de-boeuf
  ((31.0, 39.4), 255, '#6e6150'),   # terre d'ombre
]
caps = [P(*c[0]) for c in CAMPS]
def noise(x, y):
    return (math.sin(x / 61.0 + 1.3) * math.cos(y / 47.0 - 0.7) + 0.6 * math.sin((x + y) / 33.0)) * 0.16
owner = []
for g in land_cells:
    c = g.representative_point()
    best, bd = -1, 1e9
    for k, (cx, cy) in enumerate(caps):
        d = math.hypot(c.x - cx, c.y - cy) / CAMPS[k][1] * (1 + noise(c.x + 13 * k, c.y - 7 * k))
        if d < bd: bd, best = d, k
    owner.append(best if bd < 1.0 else -1)

def r1(v): return ('%.1f' % v).rstrip('0').rstrip('.')
def ring_d(coords):
    pts = list(coords)[:-1]
    return 'M' + 'L'.join(r1(x) + ' ' + r1(y) for x, y in pts) + 'Z'
def geom_d(g):
    polys = [g] if g.geom_type == 'Polygon' else list(g.geoms)
    d = ''
    for p in polys:
        d += ring_d(p.exterior.coords)
        for h in p.interiors: d += ring_d(h.coords)
    return d

# arêtes partagées → lignes de front entre camps différents
from collections import defaultdict
edges = defaultdict(set)
def key(a, b):
    a = (round(a[0], 1), round(a[1], 1)); b = (round(b[0], 1), round(b[1], 1))
    return (a, b) if a <= b else (b, a)
for idx, g in enumerate(land_cells):
    polys = [g] if g.geom_type == 'Polygon' else list(g.geoms)
    for p in polys:
        cs = list(p.exterior.coords)
        for a, b in zip(cs, cs[1:]):
            edges[key(a, b)].add(idx)
front_segs = []
for k, ids in edges.items():
    if len(ids) == 2:
        a, b = list(ids)
        if owner[a] != -1 and owner[b] != -1 and owner[a] != owner[b]:
            front_segs.append(LineString(k))
fronts = linemerge(unary_union(front_segs)) if front_segs else None
front_lines = [fronts] if fronts is not None and fronts.geom_type == 'LineString' else list(fronts.geoms)
front_lines = [l for l in front_lines if l.length > 25]
print('front lines', len(front_lines))
def line_d(l):
    return 'M' + 'L'.join(r1(x) + ' ' + r1(y) for x, y in l.coords)

out = []
o = out.append
o(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {int(W)} {H}" width="{int(W)}" height="{H}" role="img" aria-labelledby="t d">')
o('<title id="t">Seven Fronts — carte stratégique stylisée</title>')
o('<desc id="d">Illustration originale et simplifiée de l\'Europe découpée en régions terrestres et maritimes, avec sept camps colorés et des lignes de front.</desc>')
o('''<style>
.sea{fill:#0f1518}.seac{fill:none;stroke:#1d272b;stroke-width:1}
.grat{fill:none;stroke:#2a3539;stroke-width:.8;stroke-dasharray:2 5}
.neu{fill:#2b3335;stroke:#151a1c;stroke-width:1.1;stroke-linejoin:round}
.camp{stroke:#151a1c;stroke-width:1.1;stroke-linejoin:round}
.coast{fill:none;stroke:#cfc6b2;stroke-opacity:.55;stroke-width:1.4;stroke-linejoin:round}
.off{fill:url(#hatch);stroke:#3a4447;stroke-width:1}
.front{fill:none;stroke:#e0b45c;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:7 6;animation:march 2.4s linear infinite}
.front-u{fill:none;stroke:#0d1112;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;opacity:.8}
.arrow{fill:none;stroke-width:5;stroke-linecap:round;opacity:.95}
.cap{fill:#e9e3d4;stroke:#0d1112;stroke-width:2}
.ring{fill:none;stroke:#e9e3d4;stroke-width:1.5;transform-box:fill-box;transform-origin:center;animation:pulse 3.2s ease-out infinite}
.lbl{font:600 11px "IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;fill:#8d9699;letter-spacing:.02em}
@keyframes march{to{stroke-dashoffset:-26}}
@keyframes pulse{0%{transform:scale(.6);opacity:.9}100%{transform:scale(2.4);opacity:0}}
@media (prefers-reduced-motion:reduce){.front,.ring{animation:none}.ring{opacity:0}}
</style>''')
o('<defs><pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#161c1e"/><line x1="0" y1="0" x2="0" y2="8" stroke="#283134" stroke-width="2"/></pattern></defs>')
o(f'<rect class="sea" width="{int(W)}" height="{H}"/>')
o('<path class="seac" d="' + ''.join(geom_d(g) for g in sea_cells) + '"/>')
# graticule tous les 5°
gd = ''
for lon in range(-10, 45, 5):
    x, _ = P(lon, 0); gd += f'M{r1(x)} 0V{H}'
for lat in range(35, 65, 5):
    _, y = P(0, lat); gd += f'M0 {r1(y)}H{int(W)}'
o(f'<path class="grat" d="{gd}"/>')
if not africa.is_empty:
    o('<path class="off" d="' + geom_d(africa) + '"/>')
o('<path class="neu" d="' + ''.join(geom_d(g) for g, w in zip(land_cells, owner) if w == -1) + '"/>')
for k, c in enumerate(CAMPS):
    d = ''.join(geom_d(g) for g, w in zip(land_cells, owner) if w == k)
    if d: o(f'<path class="camp" fill="{c[2]}" d="{d}"/>')
o('<path class="coast" d="' + geom_d(land) + '"/>')
fd = ''.join(line_d(l) for l in front_lines)
o(f'<path class="front-u" d="{fd}"/><path class="front" d="{fd}"/>')
# flèches d'offensive (courbes quadratiques)
def arrow(a, ctrl, b, color):
    ax, ay = P(*a); cx, cy = P(*ctrl); bx, by = P(*b)
    ang = math.atan2(by - cy, bx - cx); L = 16
    h1 = (bx - L * math.cos(ang - 0.5), by - L * math.sin(ang - 0.5))
    h2 = (bx - L * math.cos(ang + 0.5), by - L * math.sin(ang + 0.5))
    return (f'<path class="arrow" stroke="#0d1112" stroke-width="9" d="M{r1(ax)} {r1(ay)}Q{r1(cx)} {r1(cy)} {r1(bx)} {r1(by)}M{r1(h1[0])} {r1(h1[1])}L{r1(bx)} {r1(by)}L{r1(h2[0])} {r1(h2[1])}"/>'
            f'<path class="arrow" stroke="{color}" d="M{r1(ax)} {r1(ay)}Q{r1(cx)} {r1(cy)} {r1(bx)} {r1(by)}M{r1(h1[0])} {r1(h1[1])}L{r1(bx)} {r1(by)}L{r1(h2[0])} {r1(h2[1])}"/>')
o(arrow((4.0, 46.5), (7.0, 48.8), (9.6, 50.3), '#9fb7cc'))
o(arrow((27.0, 51.5), (22.5, 51.0), (19.0, 51.6), '#d8957f'))
o(arrow((28.0, 40.2), (24.5, 41.6), (21.8, 42.6), '#c9bba0'))
# capitales
for (lonlat, _, col) in CAMPS:
    x, y = P(*lonlat)
    o(f'<circle class="ring" cx="{r1(x)}" cy="{r1(y)}" r="9"/>')
    o(f'<rect class="cap" x="{r1(x-5)}" y="{r1(y-5)}" width="10" height="10" transform="rotate(45 {r1(x)} {r1(y)})"/>')
# cadre gradué
seg = 20
fr = ''
for i in range(0, int(W), seg * 2):
    fr += f'M{i} 0h{seg}M{i} {H}h{seg}'
for j in range(0, H, seg * 2):
    fr += f'M0 {j}v{seg}M{int(W)} {j}v{seg}'
o(f'<path d="{fr}" stroke="#cfc6b2" stroke-width="8" opacity=".5"/>')
o(f'<rect x="8" y="8" width="{int(W)-16}" height="{H-16}" fill="none" stroke="#cfc6b2" stroke-opacity=".35" stroke-width="1"/>')
# libellés de coordonnées (réels : la projection est géographique)
for lon in range(-10, 45, 10):
    x, _ = P(lon, 0)
    o(f'<text class="lbl" x="{r1(x+4)}" y="{H-14}">{abs(lon)}°{"O" if lon < 0 else "E"}</text>')
for lat in range(40, 65, 5):
    _, y = P(0, lat)
    o(f'<text class="lbl" x="14" y="{r1(y-4)}">{lat}°N</text>')
o('</svg>')
svg = ''.join(out)
open(sys.argv[1], 'w').write(svg)
print('bytes', len(svg))
