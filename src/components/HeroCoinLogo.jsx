import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// ══════════════════════════════════════════════════════════════════════════════
//  Pièce d'or 3D de la loutre — identité de Lamblin Studio.
//  Face avant : illustration de la loutre (PNG/WebP avec alpha réel).
//  Face arrière : gravure « LAMBLIN STUDIO ». Tranche crénelée.
//  Chargée en différé (React.lazy) : three.js est isolé dans son propre chunk.
// ══════════════════════════════════════════════════════════════════════════════

export const COIN_TEXTURE = '/brand/otter-coin-1024.webp'

const COIN_RADIUS = 1.5
const COIN_THICKNESS = 0.2
const ROTATION_SPEED = 0.5 // rad/s au repos
const HOVER_SPEED = 2.6 // rad/s au survol
const CAMERA_Z = 5.3
const CAMERA_FOV = 40

// ── Textures procédurales ────────────────────────────────────────────────────

function canvasTexture(w, h, draw) {
  const cv = document.createElement('canvas')
  cv.width = w
  cv.height = h
  draw(cv.getContext('2d'))
  const t = new THREE.CanvasTexture(cv)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

// Stries concentriques (roughnessMap : sombre = brillant)
function createStriaMap() {
  const t = canvasTexture(512, 512, (ctx) => {
    ctx.fillStyle = '#727272'
    ctx.fillRect(0, 0, 512, 512)
    for (let r = 4; r < 256; r++) {
      const slot = r % 7
      ctx.beginPath()
      ctx.arc(256, 256, r, 0, Math.PI * 2)
      ctx.strokeStyle = slot === 0 ? '#101010' : slot <= 2 ? '#909090' : '#686868'
      ctx.lineWidth = slot === 0 ? 1.8 : 1
      ctx.stroke()
    }
  })
  t.colorSpace = THREE.NoColorSpace
  return t
}

function createGoldColorMap() {
  return canvasTexture(512, 512, (ctx) => {
    const g = ctx.createRadialGradient(200, 180, 0, 256, 256, 270)
    g.addColorStop(0, '#DFC070')
    g.addColorStop(0.25, '#C8A454')
    g.addColorStop(0.6, '#B89040')
    g.addColorStop(0.85, '#A07830')
    g.addColorStop(1, '#8A6420')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 512, 512)
  })
}

// Crénelage de la tranche
function createReedingMap() {
  const t = canvasTexture(512, 64, (ctx) => {
    const n = 160
    const rw = 512 / n
    for (let i = 0; i < n; i++) {
      const even = i % 2 === 0
      const g = ctx.createLinearGradient(i * rw, 0, (i + 1) * rw, 0)
      g.addColorStop(0, even ? '#C09030' : '#6A4010')
      g.addColorStop(0.5, even ? '#F0D070' : '#9A6828')
      g.addColorStop(1, even ? '#A07820' : '#5A3808')
      ctx.fillStyle = g
      ctx.fillRect(i * rw, 0, rw, 64)
    }
  })
  t.wrapS = THREE.RepeatWrapping
  return t
}

// Face arrière : gravure « LAMBLIN STUDIO »
function createBackMap() {
  return canvasTexture(512, 512, (ctx) => {
    const g = ctx.createRadialGradient(220, 200, 8, 256, 256, 265)
    g.addColorStop(0, '#DFC070')
    g.addColorStop(0.45, '#C8A454')
    g.addColorStop(0.8, '#A07830')
    g.addColorStop(1, '#7A5518')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(256, 256, 256, 0, Math.PI * 2)
    ctx.fill()

    for (let r = 10; r < 250; r += 7) {
      ctx.beginPath()
      ctx.arc(256, 256, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0,0,0,0.06)'
      ctx.lineWidth = 1
      ctx.stroke()
    }
    ctx.strokeStyle = 'rgba(0,0,0,0.22)'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(256, 256, 218, 0, Math.PI * 2)
    ctx.stroke()
    ctx.strokeStyle = 'rgba(255,220,80,0.30)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(256, 256, 222, 0, Math.PI * 2)
    ctx.stroke()

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(0,0,0,0.4)'
    ctx.shadowBlur = 4
    ctx.fillStyle = 'rgba(10,4,0,0.82)'
    ctx.font = 'bold 64px Georgia, serif'
    ctx.fillText('LAMBLIN', 256, 214)
    ctx.font = 'bold 50px Georgia, serif'
    ctx.fillText('STUDIO', 256, 296)
    ctx.shadowBlur = 0
    ctx.fillStyle = 'rgba(10,4,0,0.45)'
    ctx.fillRect(176, 252, 160, 2)
  })
}

// ── Environnement local (aucun HDR téléchargé) ───────────────────────────────

function LocalEnvironment() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04).texture
    scene.environment = env
    return () => {
      scene.environment = null
      env.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])
  return null
}

// ── Pièce ────────────────────────────────────────────────────────────────────

function Coin({ mouseRef, onReady }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const angle = useRef(0)
  const floatT = useRef(0)
  const { gl } = useThree()

  const otterTex = useLoader(THREE.TextureLoader, COIN_TEXTURE)
  useMemo(() => {
    otterTex.colorSpace = THREE.SRGBColorSpace
    otterTex.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy())
    otterTex.needsUpdate = true
  }, [otterTex, gl])

  const mats = useMemo(() => {
    const striaMap = createStriaMap()
    const goldColorMap = createGoldColorMap()
    const reedingMap = createReedingMap()
    const backMap = createBackMap()
    return {
      goldFront: new THREE.MeshPhysicalMaterial({
        map: goldColorMap,
        roughnessMap: striaMap,
        metalness: 0.75,
        roughness: 0.4,
        envMapIntensity: 0.8,
      }),
      // Loutre : alpha réel, NormalBlending
      otter: new THREE.MeshStandardMaterial({
        map: otterTex,
        transparent: true,
        blending: THREE.NormalBlending,
        alphaTest: 0.02,
        metalness: 0.6,
        roughness: 0.45,
        envMapIntensity: 0.9,
      }),
      back: new THREE.MeshPhysicalMaterial({
        map: backMap,
        roughnessMap: striaMap,
        metalness: 0.7,
        roughness: 0.3,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
        envMapIntensity: 1.4,
      }),
      rim: new THREE.MeshStandardMaterial({
        color: '#A07828',
        map: reedingMap,
        metalness: 0.95,
        roughness: 0.16,
        envMapIntensity: 1.8,
      }),
      torus: new THREE.MeshPhysicalMaterial({
        color: '#E8C858',
        metalness: 0.98,
        roughness: 0.08,
        clearcoat: 0.5,
        envMapIntensity: 2.2,
      }),
    }
  }, [otterTex])

  useEffect(() => {
    onReady?.()
    return () => Object.values(mats).forEach((m) => m.dispose())
  }, [mats, onReady])

  useFrame((_, delta) => {
    const g = groupRef.current
    if (!g) return
    const dt = Math.min(delta, 0.05)
    angle.current += dt * (hovered ? HOVER_SPEED : ROTATION_SPEED)
    g.rotation.y = angle.current
    floatT.current += dt * 0.85
    g.position.y = Math.sin(floatT.current) * 0.05
    // Parallaxe souris
    const [mx, my] = mouseRef.current
    g.rotation.x += (-my * 0.3 - g.rotation.x) * 0.06
    g.rotation.z += (mx * 0.1 - g.rotation.z) * 0.06
  })

  const T2 = COIN_THICKNESS / 2
  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh material={mats.rim} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[COIN_RADIUS, COIN_RADIUS, COIN_THICKNESS, 128, 1, true]} />
      </mesh>
      <mesh material={mats.torus}>
        <torusGeometry args={[COIN_RADIUS, 0.04, 24, 128]} />
      </mesh>

      {/* Face avant */}
      <mesh material={mats.goldFront} position={[0, 0, T2]}>
        <circleGeometry args={[COIN_RADIUS, 128]} />
      </mesh>
      <mesh material={mats.otter} position={[0, 0, T2 + 0.004]}>
        <circleGeometry args={[COIN_RADIUS * 0.995, 128]} />
      </mesh>

      {/* Face arrière */}
      <mesh material={mats.back} position={[0, 0, -T2]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[COIN_RADIUS, 128]} />
      </mesh>
    </group>
  )
}

export default function HeroCoinLogo({ onReady }) {
  const wrapRef = useRef(null)
  const mouseRef = useRef([0, 0])
  const [visible, setVisible] = useState(true)

  // Met le rendu en pause quand la pièce sort de l'écran
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onPointerMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mouseRef.current = [((e.clientX - r.left) / r.width - 0.5) * 2, -((e.clientY - r.top) / r.height - 0.5) * 2]
  }

  return (
    <div
      ref={wrapRef}
      className="h-full w-full"
      onPointerMove={onPointerMove}
      onPointerLeave={() => (mouseRef.current = [0, 0])}
    >
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.NeutralToneMapping, toneMappingExposure: 0.95 }}
        style={{ background: 'transparent' }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[3.5, 3, 6]} intensity={22} color="#FFF0D8" />
        <pointLight position={[-4, -1, 5]} intensity={8} color="#C0D8FF" />
        <pointLight position={[0, -4, -4]} intensity={20} color="#FFB030" />
        <pointLight position={[1, 5, 3.5]} intensity={8} color="#FFFFFF" />
        <LocalEnvironment />
        <Suspense fallback={null}>
          <Coin mouseRef={mouseRef} onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  )
}
