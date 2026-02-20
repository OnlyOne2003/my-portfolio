'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const CUBE_SIZE = 160
const HALF = CUBE_SIZE / 2

const skillsFaces = [
  {
    name: 'React',
    emoji: '⚛️',
    textColor: 'text-cyan-400',
    glow: '0 0 40px rgba(6, 182, 212, 0.45)',
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  {
    name: 'TypeScript',
    emoji: '📘',
    textColor: 'text-blue-400',
    glow: '0 0 40px rgba(59, 130, 246, 0.45)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  {
    name: 'Next.js',
    emoji: '▲',
    textColor: 'text-white',
    glow: '0 0 40px rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  {
    name: 'Tailwind',
    emoji: '🎨',
    textColor: 'text-sky-300',
    glow: '0 0 40px rgba(56, 189, 248, 0.45)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  {
    name: 'React Native',
    emoji: '📱',
    textColor: 'text-purple-400',
    glow: '0 0 40px rgba(168, 85, 247, 0.45)',
    borderColor: 'rgba(168, 85, 247, 0.3)',
  },
]

const rotations = [
  'rotateX(0deg) rotateY(0deg)',
  'rotateX(0deg) rotateY(-90deg)',
  'rotateX(0deg) rotateY(180deg)',
  'rotateX(0deg) rotateY(90deg)',
  'rotateX(90deg) rotateY(0deg)',
]

const CubeFace = ({
  skill,
  transform,
}: {
  skill: typeof skillsFaces[0]
  transform: string
}) => (
  <div
    className="absolute flex flex-col items-center justify-center rounded-2xl"
    style={{
      width: CUBE_SIZE,
      height: CUBE_SIZE,
      transform,
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
      background:
        'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)',
      border: `1px solid ${skill.borderColor}`,
      boxShadow: `${skill.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`,
      backdropFilter: 'blur(12px)',
    }}
  >
    <div className="text-5xl mb-2 leading-none select-none">{skill.emoji}</div>
    <div className={`text-sm font-bold tracking-wide ${skill.textColor}`}>
      {skill.name}
    </div>
  </div>
)

const DecoFace = ({ transform }: { transform: string }) => (
  <div
    style={{
      position: 'absolute',
      width: CUBE_SIZE,
      height: CUBE_SIZE,
      transform,
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
      background:
        'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
    }}
  />
)

export default function SkillsCube() {
  const [currentFace, setCurrentFace] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFace((prev) => (prev + 1) % skillsFaces.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="inline-block"
      style={{
        perspective: '1200px',
        width: CUBE_SIZE,
        height: CUBE_SIZE,
      }}
    >
      <motion.div
        animate={{ transform: rotations[currentFace] }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        style={{
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Front – React */}
        <CubeFace skill={skillsFaces[0]} transform={`translateZ(${HALF}px)`} />
        {/* Right – TypeScript */}
        <CubeFace skill={skillsFaces[1]} transform={`rotateY(90deg) translateZ(${HALF}px)`} />
        {/* Back – Next.js */}
        <CubeFace skill={skillsFaces[2]} transform={`rotateY(180deg) translateZ(${HALF}px)`} />
        {/* Left – Tailwind */}
        <CubeFace skill={skillsFaces[3]} transform={`rotateY(-90deg) translateZ(${HALF}px)`} />
        {/* Top – React Native */}
        <CubeFace skill={skillsFaces[4]} transform={`rotateX(90deg) translateZ(${HALF}px)`} />
        {/* Bottom – decorative */}
        <DecoFace transform={`rotateX(-90deg) translateZ(${HALF}px)`} />
      </motion.div>
    </div>
  )
}
