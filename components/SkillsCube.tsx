'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const CUBE_SIZE = 160
const HALF = CUBE_SIZE / 2

const skillsFaces = [
  {
    name: 'React',
    emoji: '⚛️',
    textColor: 'text-cyan-300',
    glowRgba: 'rgba(6, 182, 212, 0.65)',
    borderColor: 'rgba(6, 182, 212, 0.45)',
    bg: 'linear-gradient(135deg, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0.06) 100%)',
    shadow: '0 0 50px rgba(6, 182, 212, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
  },
  {
    name: 'TypeScript',
    emoji: '📘',
    textColor: 'text-blue-300',
    glowRgba: 'rgba(59, 130, 246, 0.65)',
    borderColor: 'rgba(59, 130, 246, 0.45)',
    bg: 'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.06) 100%)',
    shadow: '0 0 50px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
  },
  {
    name: 'Next.js',
    emoji: '▲',
    textColor: 'text-gray-100',
    glowRgba: 'rgba(200, 200, 200, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    bg: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)',
    shadow: '0 0 50px rgba(200, 200, 200, 0.3), inset 0 1px 0 rgba(255,255,255,0.25)',
  },
  {
    name: 'Tailwind',
    emoji: '🎨',
    textColor: 'text-sky-300',
    glowRgba: 'rgba(56, 189, 248, 0.65)',
    borderColor: 'rgba(56, 189, 248, 0.45)',
    bg: 'linear-gradient(135deg, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.06) 100%)',
    shadow: '0 0 50px rgba(56, 189, 248, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
  },
  {
    name: 'React Native',
    emoji: '📱',
    textColor: 'text-purple-300',
    glowRgba: 'rgba(168, 85, 247, 0.65)',
    borderColor: 'rgba(168, 85, 247, 0.45)',
    bg: 'linear-gradient(135deg, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0.06) 100%)',
    shadow: '0 0 50px rgba(168, 85, 247, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
  },
]

const rotations = [
  'rotateX(0deg) rotateY(0deg)',
  'rotateX(0deg) rotateY(-90deg)',
  'rotateX(0deg) rotateY(180deg)',
  'rotateX(0deg) rotateY(90deg)',
  'rotateX(-90deg) rotateY(0deg)',
]

const CubeFace = ({
  skill,
  transform,
}: {
  skill: typeof skillsFaces[0]
  transform: string
}) => (
  <div
    className="absolute flex flex-col items-center justify-center rounded-2xl overflow-hidden"
    style={{
      width: CUBE_SIZE,
      height: CUBE_SIZE,
      transform,
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
      background: skill.bg,
      border: `1px solid ${skill.borderColor}`,
      boxShadow: skill.shadow,
      backdropFilter: 'blur(16px)',
    }}
  >
    {/* Shimmer top edge */}
    <div
      className="absolute top-0 left-0 right-0 h-px"
      style={{ background: `linear-gradient(90deg, transparent, ${skill.glowRgba}, transparent)` }}
    />
    {/* Corner dots */}
    <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full" style={{ background: skill.glowRgba, boxShadow: `0 0 6px ${skill.glowRgba}` }} />
    <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full" style={{ background: skill.glowRgba, boxShadow: `0 0 6px ${skill.glowRgba}` }} />
    <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full" style={{ background: skill.glowRgba, boxShadow: `0 0 6px ${skill.glowRgba}` }} />
    <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full" style={{ background: skill.glowRgba, boxShadow: `0 0 6px ${skill.glowRgba}` }} />

    <div className="text-5xl mb-2 leading-none select-none">{skill.emoji}</div>
    <div className={`text-xs font-bold tracking-widest uppercase ${skill.textColor}`}>
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
      background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
      border: '1px solid rgba(255,255,255,0.07)',
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

  const active = skillsFaces[currentFace]

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Halo + floating cube */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: CUBE_SIZE + 100, height: CUBE_SIZE + 100 }}
      >
        {/* Pulsing halo */}
        <motion.div
          animate={{
            background: `radial-gradient(circle, ${active.glowRgba} 0%, transparent 70%)`,
            scale: [1, 1.18, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            filter: 'blur(18px)',
          }}
        />

        {/* Floating cube */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ perspective: '1200px', width: CUBE_SIZE, height: CUBE_SIZE }}
        >
          <motion.div
            animate={{ transform: rotations[currentFace] }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            style={{
              transformStyle: 'preserve-3d',
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            <CubeFace skill={skillsFaces[0]} transform={`translateZ(${HALF}px)`} />
            <CubeFace skill={skillsFaces[1]} transform={`rotateY(90deg) translateZ(${HALF}px)`} />
            <CubeFace skill={skillsFaces[2]} transform={`rotateY(180deg) translateZ(${HALF}px)`} />
            <CubeFace skill={skillsFaces[3]} transform={`rotateY(-90deg) translateZ(${HALF}px)`} />
            <CubeFace skill={skillsFaces[4]} transform={`rotateX(90deg) translateZ(${HALF}px)`} />
            <DecoFace transform={`rotateX(-90deg) translateZ(${HALF}px)`} />
          </motion.div>
        </motion.div>
      </div>

      {/* Indicator dots */}
      <div className="flex items-center gap-1.5">
        {skillsFaces.map((skill, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentFace(i)}
            animate={{
              width: i === currentFace ? 22 : 7,
              background: i === currentFace ? skill.glowRgba : 'rgba(255,255,255,0.18)',
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              height: 7,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label={skill.name}
          />
        ))}
      </div>
    </div>
  )
}
