'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles, AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function FloatingGeometry({
  geometry,
  position,
  color,
  wireframe = false,
  speed = 0.1,
  floatIntensity = 1,
  opacity = 0.12,
}: {
  geometry: 'torus' | 'icosahedron' | 'octahedron' | 'torusKnot' | 'dodecahedron'
  position: [number, number, number]
  color: string
  wireframe?: boolean
  speed?: number
  floatIntensity?: number
  opacity?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const scrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const scrollBoost = 1 + scrollRef.current * 2
    meshRef.current.rotation.x += delta * speed * scrollBoost
    meshRef.current.rotation.y += delta * speed * 1.3 * scrollBoost
  })

  const geo = useMemo(() => {
    switch (geometry) {
      case 'torus':
        return new THREE.TorusGeometry(1, 0.4, 16, 32)
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(1, 0)
      case 'octahedron':
        return new THREE.OctahedronGeometry(1, 0)
      case 'torusKnot':
        return new THREE.TorusKnotGeometry(0.8, 0.3, 64, 8)
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(1, 0)
    }
  }, [geometry])

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={floatIntensity}>
      <mesh ref={meshRef} position={position} geometry={geo}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={opacity}
          wireframe={wireframe}
          emissive={color}
          emissiveIntensity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  )
}

function MouseParallax() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.6
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    target.current.x += (mouse.current.x - target.current.x) * 0.02
    target.current.y += (mouse.current.y - target.current.y) * 0.02
    camera.position.x = target.current.x * 0.5
    camera.position.y = -target.current.y * 0.5
    camera.lookAt(0, 0, 0)
  })

  return null
}

function SceneContent({ isMobile }: { isMobile: boolean }) {
  const particleCount = isMobile ? 40 : 100
  const geometryCount = isMobile ? 3 : 6

  const geometries = useMemo(() => {
    const configs: {
      geometry: 'torus' | 'icosahedron' | 'octahedron' | 'torusKnot' | 'dodecahedron'
      position: [number, number, number]
      color: string
      wireframe: boolean
      speed: number
      floatIntensity: number
      opacity: number
    }[] = [
      { geometry: 'torusKnot', position: [4, 2, -3], color: '#ea5540', wireframe: true, speed: 0.08, floatIntensity: 1.2, opacity: 0.1 },
      { geometry: 'icosahedron', position: [-4, -2, -2], color: '#14b8a6', wireframe: false, speed: 0.12, floatIntensity: 0.8, opacity: 0.08 },
      { geometry: 'octahedron', position: [3, -3, -4], color: '#9333ea', wireframe: true, speed: 0.1, floatIntensity: 1, opacity: 0.1 },
      { geometry: 'torus', position: [-3, 3, -5], color: '#a855f7', wireframe: false, speed: 0.06, floatIntensity: 1.5, opacity: 0.07 },
      { geometry: 'dodecahedron', position: [5, -1, -6], color: '#ea5540', wireframe: true, speed: 0.09, floatIntensity: 0.6, opacity: 0.08 },
      { geometry: 'icosahedron', position: [-5, 1, -3], color: '#14b8a6', wireframe: true, speed: 0.07, floatIntensity: 1.3, opacity: 0.09 },
    ]
    return configs.slice(0, geometryCount)
  }, [geometryCount])

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ea5540" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#14b8a6" />

      {geometries.map((config, i) => (
        <FloatingGeometry key={i} {...config} />
      ))}

      <Sparkles
        count={particleCount}
        scale={[20, 20, 15]}
        size={isMobile ? 1.5 : 2}
        speed={0.3}
        color="#a855f7"
        opacity={0.4}
      />
      <Sparkles
        count={Math.floor(particleCount * 0.5)}
        scale={[18, 18, 12]}
        size={isMobile ? 1 : 1.5}
        speed={0.2}
        color="#ea5540"
        opacity={0.3}
      />
      <Sparkles
        count={Math.floor(particleCount * 0.3)}
        scale={[15, 15, 10]}
        size={isMobile ? 1 : 1.8}
        speed={0.25}
        color="#14b8a6"
        opacity={0.35}
      />

      <MouseParallax />
      <AdaptiveDpr pixelated />

      {!isMobile && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.8}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.1} darkness={0.5} />
        </EffectComposer>
      )}
    </>
  )
}

export default function Scene3DBackground() {
  const prefersReduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (prefersReduced) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
