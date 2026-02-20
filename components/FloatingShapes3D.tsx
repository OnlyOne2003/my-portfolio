'use client'

function Cube({ size, color }: { size: number; color: string }) {
  const half = size / 2
  const faces = [
    { transform: `rotateY(0deg) translateZ(${half}px)` },
    { transform: `rotateY(180deg) translateZ(${half}px)` },
    { transform: `rotateY(90deg) translateZ(${half}px)` },
    { transform: `rotateY(-90deg) translateZ(${half}px)` },
    { transform: `rotateX(90deg) translateZ(${half}px)` },
    { transform: `rotateX(-90deg) translateZ(${half}px)` },
  ]

  return (
    <div style={{ width: size, height: size, transformStyle: 'preserve-3d', position: 'relative' }}>
      {faces.map((face, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            background: color,
            border: `1px solid ${color.replace(/[\d.]+\)$/, '0.3)')}`,
            backdropFilter: 'blur(2px)',
            transform: face.transform,
            backfaceVisibility: 'visible',
          }}
        />
      ))}
    </div>
  )
}

function Pyramid({ size, color }: { size: number; color: string }) {
  const half = size / 2
  return (
    <div style={{ width: size, height: size, transformStyle: 'preserve-3d', position: 'relative' }}>
      {/* Base */}
      <div
        style={{
          position: 'absolute',
          width: size,
          height: size,
          background: color,
          transform: `rotateX(90deg) translateZ(-${half}px)`,
        }}
      />
      {/* 4 triangular faces approximated as tilted planes */}
      {[0, 90, 180, 270].map((rot, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            background: color,
            border: `1px solid ${color.replace(/[\d.]+\)$/, '0.3)')}`,
            transformOrigin: 'bottom center',
            transform: `rotateY(${rot}deg) rotateX(-35deg) translateZ(${half}px)`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
        />
      ))}
    </div>
  )
}

function Ring({ size, color }: { size: number; color: string }) {
  return (
    <div style={{ width: size, height: size, transformStyle: 'preserve-3d', position: 'relative' }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            border: `2px solid ${color}`,
            borderRadius: '50%',
            transform: `rotateY(${i * 22.5}deg)`,
          }}
        />
      ))}
    </div>
  )
}

function Octahedron({ size, color }: { size: number; color: string }) {
  const half = size / 2
  return (
    <div style={{ width: size, height: size, transformStyle: 'preserve-3d', position: 'relative' }}>
      {/* Top 4 faces */}
      {[0, 90, 180, 270].map((rot, i) => (
        <div
          key={`top-${i}`}
          style={{
            position: 'absolute',
            width: size,
            height: half,
            background: color,
            border: `1px solid ${color.replace(/[\d.]+\)$/, '0.25)')}`,
            transformOrigin: 'bottom center',
            transform: `rotateY(${rot}deg) rotateX(-45deg) translateZ(${half * 0.35}px)`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
        />
      ))}
      {/* Bottom 4 faces */}
      {[0, 90, 180, 270].map((rot, i) => (
        <div
          key={`bot-${i}`}
          style={{
            position: 'absolute',
            width: size,
            height: half,
            top: half,
            background: color,
            border: `1px solid ${color.replace(/[\d.]+\)$/, '0.25)')}`,
            transformOrigin: 'top center',
            transform: `rotateY(${rot}deg) rotateX(45deg) translateZ(${half * 0.35}px)`,
            clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
          }}
        />
      ))}
    </div>
  )
}

interface ShapeConfig {
  type: 'cube' | 'octahedron' | 'ring' | 'pyramid'
  size: number
  position: { top?: string; bottom?: string; left?: string; right?: string }
  color: string
  delay: number
  duration: number
}

const defaultShapes: ShapeConfig[] = [
  {
    type: 'cube',
    size: 40,
    position: { top: '15%', right: '10%' },
    color: 'rgba(234, 85, 64, 0.15)',
    delay: 0,
    duration: 20,
  },
  {
    type: 'octahedron',
    size: 55,
    position: { bottom: '25%', left: '8%' },
    color: 'rgba(20, 184, 166, 0.12)',
    delay: 3,
    duration: 25,
  },
  {
    type: 'ring',
    size: 70,
    position: { top: '45%', right: '5%' },
    color: 'rgba(147, 51, 234, 0.1)',
    delay: 5,
    duration: 30,
  },
  {
    type: 'pyramid',
    size: 35,
    position: { top: '65%', left: '12%' },
    color: 'rgba(168, 85, 247, 0.12)',
    delay: 2,
    duration: 22,
  },
]

const ShapeComponents = { Cube, Octahedron, Ring, Pyramid }

export default function FloatingShapes3D({ shapes = defaultShapes }: { shapes?: ShapeConfig[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ perspective: '800px' }}>
      {shapes.map((shape, i) => {
        const Component = ShapeComponents[shape.type.charAt(0).toUpperCase() + shape.type.slice(1) as keyof typeof ShapeComponents]
        return (
          <div
            key={i}
            className="absolute"
            style={{
              ...shape.position,
              width: shape.size,
              height: shape.size,
              animation: `float3d-${shape.type} ${shape.duration}s ease-in-out infinite`,
              animationDelay: `${shape.delay}s`,
            }}
          >
            <Component size={shape.size} color={shape.color} />
          </div>
        )
      })}
    </div>
  )
}
