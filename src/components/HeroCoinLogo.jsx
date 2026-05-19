import { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, Environment } from '@react-three/drei'
import * as THREE from 'three'

// ══════════════════════════════════════════════════════════════════════════════
//  CONSTANTES — valeurs à modifier si besoin
// ══════════════════════════════════════════════════════════════════════════════
//  COIN_RADIUS  → rayon de la pièce (ex: 1.5)
//  COIN_HEIGHT  → épaisseur de la tranche  (ex: 0.18)
//  OTTER_SCALE  → taille de la loutre (ex: 2.3 = 77% du diamètre → marges)
//  ROT_SPEED    → rotation idle en rad/s   (ex: 0.65)
//  HOVER_SPEED  → rotation au survol       (ex: 3.0)
const COIN_RADIUS = 1.5
const COIN_HEIGHT = 0.18
const OTTER_SCALE = 2.3
const ROT_SPEED   = 0.65
const HOVER_SPEED = 3.0

// ══════════════════════════════════════════════════════════════════════════════
//  TEXTURES PROCÉDURALES
// ══════════════════════════════════════════════════════════════════════════════

// Stries concentriques → roughnessMap des faces dorées
function createStriaMap() {
  const S   = 512
  const cv  = document.createElement('canvas')
  cv.width  = S; cv.height = S
  const ctx = cv.getContext('2d')

  ctx.fillStyle = '#666'
  ctx.fillRect(0, 0, S, S)

  for (let r = 6; r < 258; r += 2.5) {
    ctx.beginPath()
    ctx.arc(256, 256, r, 0, Math.PI * 2)
    ctx.strokeStyle = r % 10 < 2 ? '#232323' : '#909090'
    ctx.lineWidth   = r % 10 < 2 ? 2 : 1
    ctx.stroke()
  }
  // Clip circulaire (la roughnessMap ne déborde pas sur le bord)
  ctx.globalCompositeOperation = 'destination-in'
  ctx.beginPath()
  ctx.arc(256, 256, 254, 0, Math.PI * 2)
  ctx.fill()

  return new THREE.CanvasTexture(cv)
}

// Rainures / crénelage sur la tranche
function createReedingMap() {
  const cv  = document.createElement('canvas')
  cv.width  = 512; cv.height = 64
  const ctx = cv.getContext('2d')
  const n   = 140
  const rw  = 512 / n

  for (let i = 0; i < n; i++) {
    const even = i % 2 === 0
    const g = ctx.createLinearGradient(i * rw, 0, (i + 1) * rw, 0)
    g.addColorStop(0,   even ? '#D4A800' : '#7A5000')
    g.addColorStop(0.4, even ? '#F5D060' : '#9A6800')
    g.addColorStop(0.6, even ? '#F5D060' : '#9A6800')
    g.addColorStop(1,   even ? '#B08800' : '#6A4000')
    ctx.fillStyle = g
    ctx.fillRect(i * rw, 0, rw, 64)
  }

  const t = new THREE.CanvasTexture(cv)
  t.wrapS = THREE.RepeatWrapping
  return t
}

// Face arrière : disque doré + texte "LAMBLIN STUDIO 2026"
// Le texte est dessiné normalement — la rotation.y=PI du plan
// fait le miroir mathématiquement, le résultat est lisible ✓
function createBackMap() {
  const S   = 512
  const cv  = document.createElement('canvas')
  cv.width  = S; cv.height = S
  const ctx = cv.getContext('2d')

  const g = ctx.createRadialGradient(256, 256, 8, 256, 256, 262)
  g.addColorStop(0,   '#F5D060')
  g.addColorStop(0.5, '#C8960C')
  g.addColorStop(1,   '#7A5000')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(256, 256, 256, 0, Math.PI * 2)
  ctx.fill()

  // Anneau décoratif
  ctx.strokeStyle = 'rgba(0,0,0,0.20)'
  ctx.lineWidth   = 5
  ctx.beginPath()
  ctx.arc(256, 256, 216, 0, Math.PI * 2)
  ctx.stroke()

  // Texte
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle    = 'rgba(12,6,0,0.80)'
  ctx.font = 'bold 64px Georgia, serif'
  ctx.fillText('LAMBLIN', 256, 188)
  ctx.font = 'bold 50px Georgia, serif'
  ctx.fillText('STUDIO', 256, 276)
  ctx.font = '22px Georgia, serif'
  ctx.fillStyle = 'rgba(12,6,0,0.45)'
  ctx.fillText('✦  2026  ✦', 256, 366)

  return new THREE.CanvasTexture(cv)
}

// ══════════════════════════════════════════════════════════════════════════════
//  COIN — géométrie
// ══════════════════════════════════════════════════════════════════════════════
//
//  Architecture des meshes (axe de la pièce = Z, caméra sur +Z) :
//
//    z = +h/2  CircleGeometry face avant (normale +Z, face caméra)
//    z = +h/2  PlaneGeometry  loutre (légèrement devant, additif)
//    z = 0     CylinderGeometry tranche (rotation.x=PI/2 → axe Z)
//    z = 0     TorusGeometry   anneau doré sur le pourtour
//    z = -h/2  CircleGeometry  face arrière (rotation.y=PI, normale -Z)
//    z = -h/2  PlaneGeometry   texte dos (rotation.y=PI)
//
//  Rotation du group sur Y → la pièce montre face puis dos comme une vraie pièce.

function Coin({ mouseRef }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const autoRotY = useRef(0)
  const floatT   = useRef(0)

  // --- Textures ---
  const otterTex = useTexture('/brand/otter-coin-web.png')

  const striaMap   = useMemo(() => createStriaMap(),   [])
  const reedingMap = useMemo(() => createReedingMap(), [])
  const backMap    = useMemo(() => createBackMap(),    [])

  // --- Matériaux ---
  const goldFaceMat = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#C5A028',
      metalness: 0.92,
      roughness: 0.18,
      roughnessMap: striaMap,
      envMapIntensity: 2.0,
    }),
    [striaMap]
  )

  const rimMat = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#B08B00',
      metalness: 0.96,
      roughness: 0.10,
      map: reedingMap,
      envMapIntensity: 2.5,
    }),
    [reedingMap]
  )

  const torusMat = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#F5D060',
      metalness: 0.99,
      roughness: 0.04,
      envMapIntensity: 4.0,
    }),
    []
  )

  // Loutre : fond noir du PNG → AdditiveBlending le rend transparent
  // (noir = 0 + doré = doré ; otter coloré = s'additionne au doré)
  // Si le PNG a un vrai canal alpha, remplacer par blending={THREE.NormalBlending}
  const otterMat = useMemo(
    () => new THREE.MeshBasicMaterial({
      map: otterTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    }),
    [otterTex]
  )

  const backTextMat = useMemo(
    () => new THREE.MeshBasicMaterial({
      map: backMap,
      transparent: true,
      alphaTest: 0.01,
      toneMapped: false,
    }),
    [backMap]
  )

  const h2 = COIN_HEIGHT / 2

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Rotation Y (spin de pièce)
    autoRotY.current += delta * (hovered ? HOVER_SPEED : ROT_SPEED)
    groupRef.current.rotation.y = autoRotY.current

    // Float léger
    floatT.current += delta * 0.9
    groupRef.current.position.y = Math.sin(floatT.current) * 0.07

    // Parallaxe souris (inclinaison X + Z)
    const [mx, my] = mouseRef.current
    groupRef.current.rotation.x +=
      (my * 0.36 - groupRef.current.rotation.x) * 0.055
    groupRef.current.rotation.z +=
      (mx * 0.13 - groupRef.current.rotation.z) * 0.055
  })

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Tranche crénelée — cylindre ouvert, rotation.x=PI/2 aligne l'axe sur Z */}
      <mesh material={rimMat} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[COIN_RADIUS, COIN_RADIUS, COIN_HEIGHT, 128, 1, true]}
        />
      </mesh>

      {/* Anneau doré sur le pourtour (torus dans le plan XY, axe Z par défaut) */}
      <mesh material={torusMat}>
        <torusGeometry args={[COIN_RADIUS, 0.048, 24, 128]} />
      </mesh>

      {/* ─── FACE AVANT ─── */}

      {/* Disque doré base */}
      <mesh material={goldFaceMat} position={[0, 0, h2]}>
        <circleGeometry args={[COIN_RADIUS, 128]} />
      </mesh>

      {/* Loutre posée comme emblème — légèrement devant le disque */}
      {/* Ajuster OTTER_SCALE en haut du fichier pour la taille de la loutre */}
      <mesh material={otterMat} position={[0, 0, h2 + 0.003]}>
        <planeGeometry args={[OTTER_SCALE, OTTER_SCALE]} />
      </mesh>

      {/* ─── FACE ARRIÈRE ─── */}

      {/* Disque doré base (rotation.y=PI → normale pointe en -Z) */}
      <mesh
        material={goldFaceMat}
        position={[0, 0, -h2]}
        rotation={[0, Math.PI, 0]}
      >
        <circleGeometry args={[COIN_RADIUS, 128]} />
      </mesh>

      {/* Texte "Lamblin Studio" (rotation.y=PI → lisible depuis derrière) */}
      <mesh
        material={backTextMat}
        position={[0, 0, -h2 - 0.003]}
        rotation={[0, Math.PI, 0]}
      >
        <planeGeometry args={[COIN_RADIUS * 1.85, COIN_RADIUS * 1.85]} />
      </mesh>
    </group>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
//  SCÈNE
// ══════════════════════════════════════════════════════════════════════════════

function CoinScene({ mouseRef }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      {/* Lumière key chaude — avant-haut */}
      <pointLight position={[4,  4,  7]} intensity={6}   color="#FFE566" />
      {/* Fill froide — avant-gauche */}
      <pointLight position={[-5, -2,  5]} intensity={2.5} color="#A0C8FF" />
      {/* Rim chaude — derrière */}
      <pointLight position={[0, -5, -4]} intensity={3.0} color="#FFB020" />
      {/* Spéculaire blanc — au-dessus */}
      <pointLight position={[2,  6,  4]} intensity={2.5} color="#FFFFFF" />
      {/* Dorée bas avant */}
      <pointLight position={[0, -4,  3]} intensity={1.5} color="#D4A800" />

      {/* Environnement HDR pour les reflets métalliques */}
      <Environment preset="studio" />

      <Suspense fallback={null}>
        <Coin mouseRef={mouseRef} />
      </Suspense>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
//  EXPORT PUBLIC
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <img
        src="/brand/otter-coin-web.png"
        alt="Lamblin Studio"
        style={{
          width: 180,
          height: 180,
          borderRadius: '50%',
          filter: 'drop-shadow(0 0 40px rgba(212,168,0,0.6))',
        }}
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
    <div
      className="w-full h-full"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
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
