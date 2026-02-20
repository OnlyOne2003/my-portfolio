'use client'

import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { RefObject } from 'react'

interface UseScrollProgressOptions {
  target: RefObject<HTMLElement>
  offset?: [string, string]
}

interface ScrollProgressResult {
  scrollYProgress: MotionValue<number>
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  translateZ: MotionValue<number>
  opacity: MotionValue<number>
  scale: MotionValue<number>
}

export function useScrollProgress({
  target,
  offset = ['start end', 'end start'],
}: UseScrollProgressOptions): ScrollProgressResult {
  const { scrollYProgress } = useScroll({ target, offset })

  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.5], [-15, 0, 0])
  const rotateY = useTransform(scrollYProgress, [0, 0.3, 0.5], [-10, 0, 0])
  const translateZ = useTransform(scrollYProgress, [0, 0.3], [-40, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1])

  return {
    scrollYProgress,
    rotateX,
    rotateY,
    translateZ,
    opacity,
    scale,
  }
}
