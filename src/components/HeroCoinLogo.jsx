import { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, Environment } from '@react-three/drei'
import * as THREE from 'three'

// ─── Canvas texture for the back face ────────────────────────────────────────
function createBackTexture() {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // Gold radial gradient
  const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 262)
  grad.addColorStop(0, '#F5D060')
  grad.addColorStop(0.5, '#C8960C')
  grad.addColorStop(1, '#7A5000')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(256, 256, 256, 0, Math.PI * 2)
  ctx.fill()

  // Decorative inner ring
  ctx.strokeStyle = 'rgba(0,0,0,0.22)'
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.arc(256, 256, 216, 0, Math.PI * 2)
  ctx.stroke()

  // Flip horizontally so text reads correctly when seen from the back of the coin
  // (Three.js bottom cap UVs are mirrored relative to the viewer's perspective)
  ctx.save()
  ctx.translate(size, 0)
  ctx.scale(-1, 1)

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.fillStyle = 'rgba(15, 8, 0, 0.80)'
  ctx.font = 'bold 66px Georgia, serif'
  ctx.fillText('LAMBLIN', 256, 196)

  ctx.font = 'bold 50px Georgia, serif'
  ctx.fillText('STUDIO', 256, 284)

  ctx.font = '22px Georgia, serif'
  ctx.fillStyle = 'rgba(15, 8, 0, 0.50)'
  ctx.fillText('✦  2026  ✦', 256, 372)

  ctx.restore()

  return new THREE.CanvasTexture(canvas)
}

// ─── 3D Coin mesh ─────────────────────────────────────────────────────────────
function Coin({ mouseRef }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  // Accumulate rotation outside React state to avoid re-renders
  const autoRotY = useRef(0)

  const frontTexture = useTexture('/brand/otter-coin-front.png')
  const backTexture = useMemo(() => createBackTexture(), [])

  // Three-slot material array: [side/rim, top-cap=front, bottom-cap=back]
  const materials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({
        color: '#B8860B',
        metalness: 0.98,
        roughness: 0.08,
        envMapIntensity: 2.5,
      }),
      new THREE.MeshStandardMaterial({
        map: frontTexture,
        metalness: 0.18,
        roughness: 0.22,
        envMapIntensity: 1.0,
      }),
      new THREE.MeshStandardMaterial({
        map: backTexture,
        metalness: 0.18,
        roughness: 0.22,
        envMapIntensity: 1.0,
      }),
    ],
    [frontTexture, backTexture]
  )

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Spin faster on hover
    autoRotY.current += delta * (hovered ? 2.8 : 0.65)
    groupRef.current.rotation.y = autoRotY.current

    // Smooth mouse parallax — tilt on X/Z axes
    const [mx, my] = mouseRef.current
    groupRef.current.rotation.x +=
      (my * 0.38 - groupRef.current.rotation.x) * 0.055
    groupRef.current.rotation.z +=
      (mx * 0.16 - groupRef.current.rotation.z) * 0.055
  })

  return (
    <group ref={groupRef}>
      {/* Main coin body — rotation.x = PI/2 makes top cap face the camera */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        material={materials}
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[1.5, 1.5, 0.14, 128, 1, false]} />
      </mesh>

      {/* Golden edge ring — sits exactly at the coin rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.048, 24, 128]} />
        <meshStandardMaterial
          color="#F5D060"
          metalness={0.99}
          roughness={0.04}
          envMapIntensity={3.5}
        />
      </mesh>
    </group>
  )
}

// ─── Lighting + scene ────────────────────────────────────────────────────────
function CoinScene({ mouseRef }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      {/* Key light — warm gold, front-top */}
      <pointLight position={[4, 4, 7]} intensity={5} color="#FFE566" />
      {/* Fill light — cool blue, front-left */}
      <pointLight position={[-5, -2, 5]} intensity={2} color="#A0C8FF" />
      {/* Rim light — warm orange, rear */}
      <pointLight position={[0, -5, -3]} intensity={2.8} color="#FFB020" />
      {/* Specular pop — white, above */}
      <pointLight position={[2, 6, 3]} intensity={2} color="#FFFFFF" />

      {/* HDR environment for metallic reflections */}
      <Environment preset="studio" />

      <Suspense fallback={null}>
        <Coin mouseRef={mouseRef} />
      </Suspense>
    </>
  )
}

// ─── WebGL availability check ─────────────────────────────────────────────────
function isWebGLAvailable() {
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

// ─── Static fallback ──────────────────────────────────────────────────────────
function CoinFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <img
        src="/brand/otter-coin-front.png"
        alt="Lamblin Studio coin"
        className="w-48 h-48 rounded-full"
        style={{ filter: 'drop-shadow(0 0 40px rgba(212,168,0,0.55))' }}
      />
    </div>
  )
}

// ─── Public component ─────────────────────────────────────────────────────────
export default function HeroCoinLogo() {
  const mouseRef = useRef([0, 0])
  // Check once at mount — useState initialiser runs only client-side
  const [webgl] = useState(() =>
    typeof window !== 'undefined' && isWebGLAvailable()
  )

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mouseRef.current = [
      ((e.clientX - r.left) / r.width - 0.5) * 2,
      -((e.clientY - r.top) / r.height - 0.5) * 2,
    ]
  }

  const onMouseLeave = () => {
    mouseRef.current = [0, 0]
  }

  if (!webgl) return <CoinFallback />

  return (
    <div
      className="w-full h-full"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <CoinScene mouseRef={mouseRef} />
      </Canvas>
    </div>
  )
}
