'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function ScrollProgress3D() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1])
  const hue = useTransform(smoothProgress, [0, 1], [0, 160])
  const background = useTransform(
    hue,
    (h) => `linear-gradient(to top, hsl(${h}, 80%, 55%), hsl(${h + 40}, 80%, 60%))`
  )

  return (
    <div
      className="fixed left-3 top-1/2 -translate-y-1/2 z-50 hidden md:block"
      style={{ perspective: '200px' }}
    >
      <div className="w-1.5 h-32 rounded-full bg-white/10 overflow-hidden backdrop-blur-sm">
        <motion.div
          className="w-full h-full rounded-full origin-bottom"
          style={{
            scaleY,
            background,
            transformStyle: 'preserve-3d',
            boxShadow: '0 0 10px rgba(147, 51, 234, 0.3)',
          }}
        />
      </div>
    </div>
  )
}
