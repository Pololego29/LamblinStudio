import { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, Environment } from '@react-three/drei'
import * as THREE from 'three'

// ══════════════════════════════════════════════════════════════════════════════
//  CONSTANTES — modifiez librement pour ajuster la pièce
// ══════════════════════════════════════════════════════════════════════════════

const COIN_RADIUS      = 1.5
//  ^ rayon de la pièce (monde 3D). Augmentez pour une pièce plus grande.

const COIN_THICKNESS   = 0.20
//  ^ épaisseur de la tranche. Ex: 0.14 (fine) → 0.28 (épaisse).

const FRONT_LOGO_SCALE    = 1.1
//  ^ ratio 0–1 : fraction du diamètre de la pièce occupée par la loutre.
//  0.72 = 72 % du diamètre → taille réelle du plan = COIN_RADIUS * 2 * 0.72
//  ▸ Loutre trop petite → augmenter (ex: 0.80, 0.88)
//  ▸ Loutre qui déborde → réduire (ex: 0.60, 0.65)

const FRONT_LOGO_OFFSET_X = 0
//  ^ décalage horizontal en world units (positif = droite, négatif = gauche)

const FRONT_LOGO_OFFSET_Y = -0.05
//  ^ décalage vertical en world units (positif = haut, négatif = bas)

const ROTATION_SPEED   = 0.60
//  ^ rotation idle (rad/s). Ex: 0.3 = très lente, 1.2 = rapide.

const HOVER_SPEED      = 3.2
//  ^ rotation au survol. Ex: 2.0 = accélération douce, 5.0 = flip vif.

const GOLD_COLOR       = '#C8A454'
//  ^ or champagne doux (moins saturé que le jaune pur).
//  Essais : '#D4AF37' (or classique), '#B8924A' (or sombre), '#E8C878' (clair).

// ══════════════════════════════════════════════════════════════════════════════
//  TEXTURES PROCÉDURALES
// ══════════════════════════════════════════════════════════════════════════════

// roughnessMap : stries concentriques de pièce
// En roughnessMap, noir (0) = brillant / blanc (1) = mat
// Sillons profonds (noirs) brillants → stries visibles en lumière rasante
function createStriaMap() {
  const S  = 512
  const cv = document.createElement('canvas')
  cv.width = S; cv.height = S
  const ctx = cv.getContext('2d')

  // Base mi-mat
  ctx.fillStyle = '#727272'
  ctx.fillRect(0, 0, S, S)

  // Stries : alternance fine ligne brillante + plage mi-mate
  for (let r = 4; r < 256; r++) {
    const slot = r % 7   // 7 px par cycle
    let col
    if (slot === 0)      col = '#101010'  // sillon profond brillant
    else if (slot <= 2)  col = '#909090'  // plage légèrement mate
    else                 col = '#686868'  // inter-strie

    ctx.beginPath()
    ctx.arc(256, 256, r, 0, Math.PI * 2)
    ctx.strokeStyle = col
    ctx.lineWidth   = slot === 0 ? 1.8 : 1
    ctx.stroke()
  }

  // Zone centrale légèrement plus lisse (sous l'emblème)
  const cg = ctx.createRadialGradient(256, 256, 0, 256, 256, 160)
  cg.addColorStop(0,   'rgba(20,20,20,0.55)')
  cg.addColorStop(0.6, 'rgba(40,40,40,0.25)')
  cg.addColorStop(1,   'rgba(0,0,0,0)')
  ctx.fillStyle = cg
  ctx.beginPath(); ctx.arc(256, 256, 160, 0, Math.PI * 2); ctx.fill()

  // Clip circulaire
  ctx.globalCompositeOperation = 'destination-in'
  ctx.beginPath(); ctx.arc(256, 256, 254, 0, Math.PI * 2); ctx.fill()

  return new THREE.CanvasTexture(cv)
}

// colorMap : gradient radial champagne → nuances naturelles sur la face
function createGoldColorMap() {
  const S  = 512
  const cv = document.createElement('canvas')
  cv.width = S; cv.height = S
  const ctx = cv.getContext('2d')

  const g = ctx.createRadialGradient(200, 180, 0, 256, 256, 270)
  g.addColorStop(0,    '#DFC070')  // reflet chaud excentré
  g.addColorStop(0.25, '#C8A454')  // GOLD_COLOR de base
  g.addColorStop(0.60, '#B89040')  // mi-bord plus sombre
  g.addColorStop(0.85, '#A07830')  // bord profond
  g.addColorStop(1.0,  '#8A6420')  // extrème bord mat
  ctx.fillStyle = g
  ctx.beginPath(); ctx.arc(256, 256, 256, 0, Math.PI * 2); ctx.fill()

  return new THREE.CanvasTexture(cv)
}

// Crénelage de la tranche
function createReedingMap() {
  const cv  = document.createElement('canvas')
  cv.width  = 512; cv.height = 64
  const ctx = cv.getContext('2d')
  const n   = 160              // nb de dents
  const rw  = 512 / n

  for (let i = 0; i < n; i++) {
    const even = i % 2 === 0
    const g = ctx.createLinearGradient(i * rw, 0, (i + 1) * rw, 0)
    g.addColorStop(0,   even ? '#C09030' : '#6A4010')
    g.addColorStop(0.3, even ? '#E8C060' : '#8A5820')
    g.addColorStop(0.5, even ? '#F0D070' : '#9A6828')
    g.addColorStop(0.7, even ? '#E8C060' : '#8A5820')
    g.addColorStop(1,   even ? '#A07820' : '#5A3808')
    ctx.fillStyle = g
    ctx.fillRect(i * rw, 0, rw, 64)
  }

  const t = new THREE.CanvasTexture(cv)
  t.wrapS = THREE.RepeatWrapping
  return t
}

// Face arrière : texture canvas complète (fond doré + texte)
function createBackMap() {
  const S  = 512
  const cv = document.createElement('canvas')
  cv.width = S; cv.height = S
  const ctx = cv.getContext('2d')

  // Fond doré champagne (cohérent avec GOLD_COLOR)
  const g = ctx.createRadialGradient(220, 200, 8, 256, 256, 265)
  g.addColorStop(0,    '#DFC070')
  g.addColorStop(0.45, '#C8A454')
  g.addColorStop(0.80, '#A07830')
  g.addColorStop(1.0,  '#7A5518')
  ctx.fillStyle = g
  ctx.beginPath(); ctx.arc(256, 256, 256, 0, Math.PI * 2); ctx.fill()

  // Micro-stries concentriques (cohérence visuelle avec la face avant)
  for (let r = 10; r < 250; r += 7) {
    ctx.beginPath(); ctx.arc(256, 256, r, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(0,0,0,0.06)'; ctx.lineWidth = 1; ctx.stroke()
  }

  // Anneau intérieur
  ctx.strokeStyle = 'rgba(0,0,0,0.22)'; ctx.lineWidth = 4
  ctx.beginPath(); ctx.arc(256, 256, 218, 0, Math.PI * 2); ctx.stroke()
  ctx.strokeStyle = 'rgba(255,220,80,0.30)'; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.arc(256, 256, 222, 0, Math.PI * 2); ctx.stroke()

  // Texte (dessiné normalement — rotation.y=PI du plan gère l'orientation ✓)
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'

  // Ombre douce
  ctx.shadowColor = 'rgba(0,0,0,0.4)'; ctx.shadowBlur = 4

  ctx.fillStyle = 'rgba(10,4,0,0.82)'
  ctx.font = 'bold 64px Georgia, serif'
  ctx.fillText('LAMBLIN', 256, 188)
  ctx.font = 'bold 50px Georgia, serif'
  ctx.fillText('STUDIO', 256, 274)

  ctx.shadowBlur = 0
  ctx.font = '21px Georgia, serif'
  ctx.fillStyle = 'rgba(10,4,0,0.48)'
  ctx.fillText('✦  2026  ✦', 256, 364)

  return new THREE.CanvasTexture(cv)
}

// ══════════════════════════════════════════════════════════════════════════════
//  COIN MESH
// ══════════════════════════════════════════════════════════════════════════════
//
//  Axe pièce = Z  (caméra à +Z).  Group tourne sur Y.
//
//  z = +T/2   CircleGeometry face avant  (normale +Z)
//  z = +T/2   PlaneGeometry  loutre      (AdditiveBlending, fond noir = transparent)
//  z = 0      CylinderGeometry tranche   (ouvert, rotation.x=PI/2)
//  z = 0      TorusGeometry   bord équatorial
//  z = -T/2   CircleGeometry  face arrière (rotation.y=PI)
//  z = -T/2   PlaneGeometry   texte dos    (rotation.y=PI)

function Coin({ mouseRef }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const autoRotY = useRef(0)
  const floatT   = useRef(0)

  // ── Textures ──────────────────────────────────────────────────────────────
  const otterTex = useTexture('/brand/otter-coin-web.png')
  const striaMap    = useMemo(() => createStriaMap(),    [])
  const goldColorMap= useMemo(() => createGoldColorMap(),[])
  const reedingMap  = useMemo(() => createReedingMap(),  [])
  const backMap     = useMemo(() => createBackMap(),     [])

  // ── Matériaux ─────────────────────────────────────────────────────────────

  // Face AVANT (sous la loutre) — moins brillante, plus mate et naturelle
  const goldFrontMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: goldColorMap,
    roughnessMap: striaMap,
    metalness: 0.72,
    roughness: 0.42,
    clearcoat: 0.08,
    clearcoatRoughness: 0.40,
    envMapIntensity: 0.7,
  }), [goldColorMap, striaMap])

  // Face ARRIÈRE (Lamblin Studio) — garde l'effet brillant premium
  const goldBackMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: goldColorMap,
    roughnessMap: striaMap,
    metalness: 0.90,
    roughness: 0.20,
    clearcoat: 0.30,
    clearcoatRoughness: 0.18,
    envMapIntensity: 1.6,
  }), [goldColorMap, striaMap])

  // Tranche crénelée
  const rimMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#A07828',
    metalness: 0.96,
    roughness: 0.12,
    map: reedingMap,
    envMapIntensity: 2.2,
  }), [reedingMap])

  // Torus bord — très brillant
  const torusMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#E8C858',
    metalness: 0.99,
    roughness: 0.04,
    clearcoat: 0.5,
    clearcoatRoughness: 0.05,
    envMapIntensity: 3.5,
  }), [])

  // Loutre — fond noir = transparent via AdditiveBlending
  // Si votre PNG a un vrai canal alpha : changez blending en THREE.NormalBlending
  const otterMat = useMemo(() => new THREE.MeshBasicMaterial({
    map: otterTex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  }), [otterTex])

  // Texte dos
  const backTextMat = useMemo(() => new THREE.MeshBasicMaterial({
    map: backMap,
    transparent: true,
    alphaTest: 0.01,
    toneMapped: false,
  }), [backMap])

  const T2 = COIN_THICKNESS / 2

  useFrame((_, delta) => {
    if (!groupRef.current) return

    autoRotY.current += delta * (hovered ? HOVER_SPEED : ROTATION_SPEED)
    groupRef.current.rotation.y = autoRotY.current

    // Float sinusoïdal subtil
    floatT.current += delta * 0.85
    groupRef.current.position.y = Math.sin(floatT.current) * 0.06

    // Parallaxe souris : inclinaison X et Z douce
    const [mx, my] = mouseRef.current
    groupRef.current.rotation.x +=
      (my * 0.34 - groupRef.current.rotation.x) * 0.055
    groupRef.current.rotation.z +=
      (mx * 0.12 - groupRef.current.rotation.z) * 0.055
  })

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* ── Tranche (cylindre ouvert, rotation.x aligne l'axe sur Z) ── */}
      <mesh material={rimMat} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[COIN_RADIUS, COIN_RADIUS, COIN_THICKNESS, 128, 1, true]}
        />
      </mesh>

      {/* ── Bord équatorial brillant ── */}
      <mesh material={torusMat}>
        <torusGeometry args={[COIN_RADIUS, 0.042, 24, 128]} />
      </mesh>

      {/* ══ FACE AVANT ══════════════════════════════════════════════════ */}

      {/* Disque doré base — mat/doux sous la loutre */}
      <mesh material={goldFrontMat} position={[0, 0, T2]}>
        <circleGeometry args={[COIN_RADIUS, 128]} />
      </mesh>

      {/* Loutre — plan centré sur la face avant.
          Taille = COIN_RADIUS * 2 * FRONT_LOGO_SCALE (ratio du diamètre).
          Fond noir = invisible (AdditiveBlending) → pas de carré visible.
          Ajustez FRONT_LOGO_SCALE, OFFSET_X, OFFSET_Y en haut du fichier. */}
      <mesh
        material={otterMat}
        position={[FRONT_LOGO_OFFSET_X, FRONT_LOGO_OFFSET_Y, T2 + 0.003]}
      >
        <planeGeometry
          args={[COIN_RADIUS * 2 * FRONT_LOGO_SCALE, COIN_RADIUS * 2 * FRONT_LOGO_SCALE]}
        />
      </mesh>

      {/* ══ FACE ARRIÈRE ════════════════════════════════════════════════ */}

      {/* Disque doré base — brillant pour le côté Lamblin Studio */}
      <mesh material={goldBackMat} position={[0, 0, -T2]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[COIN_RADIUS, 128]} />
      </mesh>

      {/* Texte "LAMBLIN STUDIO" (rotation.y=PI → lisible depuis l'arrière ✓) */}
      <mesh
        material={backTextMat}
        position={[0, 0, -T2 - 0.003]}
        rotation={[0, Math.PI, 0]}
      >
        <planeGeometry args={[COIN_RADIUS * 1.88, COIN_RADIUS * 1.88]} />
      </mesh>
    </group>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
//  SCÈNE + ÉCLAIRAGE
// ══════════════════════════════════════════════════════════════════════════════

function CoinScene({ mouseRef }) {
  return (
    <>
      <ambientLight intensity={0.35} />

      {/* Key — chaude naturelle, légèrement décentrée (évite le "centre brûlé") */}
      <pointLight position={[3.5, 3,  6]}  intensity={3.5} color="#FFF0D8" />

      {/* Fill — froide avant-gauche pour contrastes métalliques */}
      <pointLight position={[-4,  -1, 5]}  intensity={2.0} color="#C0D8FF" />

      {/* Rim — orange chaud derrière pour l'effet de profondeur */}
      <pointLight position={[0,  -4, -4]}  intensity={2.8} color="#FFB030" />

      {/* Specular top — blanc neutre */}
      <pointLight position={[1,   5, 3.5]} intensity={2.0} color="#FFFFFF" />

      {/* Contre-lumière basse — réchauffe le bas de la pièce */}
      <pointLight position={[-1, -3, 2.5]} intensity={1.2} color="#D8A840" />

      {/* HDR environnement studio pour les reflets métalliques */}
      <Environment preset="studio" />

      <Suspense fallback={null}>
        <Coin mouseRef={mouseRef} />
      </Suspense>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
//  EXPORT
// ══════════════════════════════════════════════════════════════════════════════

function checkWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

function CoinFallback() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
                  width:'100%', height:'100%' }}>
      <img
        src="/brand/otter-coin-web.png"
        alt="Lamblin Studio"
        style={{ width:180, height:180, borderRadius:'50%',
                 filter:'drop-shadow(0 0 40px rgba(200,164,84,0.65))' }}
      />
    </div>
  )
}

export default function HeroCoinLogo() {
  const mouseRef = useRef([0, 0])
  const [webgl]  = useState(
    () => typeof window !== 'undefined' && checkWebGL()
  )

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mouseRef.current = [
      ((e.clientX - r.left) / r.width  - 0.5) * 2,
      -((e.clientY - r.top) / r.height - 0.5) * 2,
    ]
  }
  const onMouseLeave = () => { mouseRef.current = [0, 0] }

  if (!webgl) return <CoinFallback />

  return (
    <div className="w-full h-full" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <CoinScene mouseRef={mouseRef} />
      </Canvas>
    </div>
  )
}
