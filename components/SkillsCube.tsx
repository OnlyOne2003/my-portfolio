'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const skillsFaces = [
  { name: 'React', emoji: '⚛️', color: 'from-red-500 to-pink-500', textColor: 'text-pink-400' },
  { name: 'TypeScript', emoji: '📘', color: 'from-blue-500 to-cyan-500', textColor: 'text-cyan-400' },
  { name: 'Next.js', emoji: '▲', color: 'from-gray-700 to-gray-900', textColor: 'text-gray-300' },
  { name: 'Tailwind', emoji: '🎨', color: 'from-cyan-500 to-blue-500', textColor: 'text-blue-400' },
  { name: 'React Native', emoji: '📱', color: 'from-purple-500 to-pink-500', textColor: 'text-purple-400' },
  { name: 'JavaScript', emoji: '✨', color: 'from-yellow-500 to-orange-500', textColor: 'text-yellow-400' },
]

const CubeFace = ({ skill, transform }: { skill: typeof skillsFaces[0]; transform: string }) => (
  <motion.div
    className={`absolute w-32 h-32 rounded-xl flex flex-col items-center justify-center border-2 transition-all`}
    style={{
      transform,
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
      perspective: '1200px',
      background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`,
      borderImage: `linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1)) 1`,
      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
    }}
  >
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl mb-2"
      >
        {skill.emoji}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`text-sm font-semibold ${skill.textColor}`}
      >
        {skill.name}
      </motion.div>
    </div>
  </motion.div>
)

export default function SkillsCube() {
  const [currentFace, setCurrentFace] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFace((prev) => (prev + 1) % skillsFaces.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getRotation = () => {
    const rotations = [
      'rotateX(0deg) rotateY(0deg)',
      'rotateX(0deg) rotateY(-90deg)',
      'rotateX(0deg) rotateY(180deg)',
      'rotateX(0deg) rotateY(90deg)',
      'rotateX(90deg) rotateY(0deg)',
      'rotateX(-90deg) rotateY(0deg)',
    ]
    return rotations[currentFace]
  }

  return (
    <div
      className="inline-block"
      style={{
        perspective: '1000px',
        width: '128px',
        height: '128px',
      }}
    >
      <motion.div
        animate={{ transform: getRotation() }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
        }}
        style={{
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Front Face - React */}
        <CubeFace
          skill={skillsFaces[0]}
          transform="translateZ(64px)"
        />

        {/* Right Face - TypeScript */}
        <CubeFace
          skill={skillsFaces[1]}
          transform="rotateY(90deg) translateZ(64px)"
        />

        {/* Back Face - Next.js */}
        <CubeFace
          skill={skillsFaces[2]}
          transform="rotateY(180deg) translateZ(64px)"
        />

        {/* Left Face - Tailwind */}
        <CubeFace
          skill={skillsFaces[3]}
          transform="rotateY(-90deg) translateZ(64px)"
        />

        {/* Top Face - React Native */}
        <CubeFace
          skill={skillsFaces[4]}
          transform="rotateX(90deg) translateZ(64px)"
        />

        {/* Bottom Face - JavaScript */}
        <CubeFace
          skill={skillsFaces[5]}
          transform="rotateX(-90deg) translateZ(64px)"
        />
      </motion.div>
    </div>
  )
}
