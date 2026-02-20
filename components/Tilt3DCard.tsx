'use client'

import { motion, useTransform } from 'framer-motion'
import { useTilt3D } from '@/hooks/useTilt3D'

interface Tilt3DCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  perspective?: number
  scale?: number
  glare?: boolean
}

export default function Tilt3DCard({
  children,
  className = '',
  maxTilt = 12,
  perspective = 1000,
  scale = 1.02,
  glare = true,
}: Tilt3DCardProps) {
  const { containerStyle, motionProps, isHovered, glareX, glareY } = useTilt3D({
    maxTilt,
    perspective,
    scale,
    glare,
  })

  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]: number[]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
  )

  return (
    <div style={containerStyle}>
      <motion.div {...motionProps} className={`relative ${className}`}>
        {children}
        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
            style={{
              background: glareBackground,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}
      </motion.div>
    </div>
  )
}
