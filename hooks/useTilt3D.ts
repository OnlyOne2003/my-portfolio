'use client'

import { useRef, useState, useEffect } from 'react'
import { useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'

interface UseTilt3DOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
  glare?: boolean
}

export function useTilt3D(options: UseTilt3DOptions = {}) {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.02,
    speed = 400,
    glare = true,
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: speed, damping: 30 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig)

  const glareX = useTransform(x, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouchDevice || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5
    x.set(normalizedX)
    y.set(normalizedY)
  }

  function handleMouseEnter() {
    if (isTouchDevice) return
    setIsHovered(true)
  }

  function handleMouseLeave() {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const containerStyle = {
    perspective: `${perspective}px`,
  }

  const motionProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    style: {
      rotateX,
      rotateY,
      transformStyle: 'preserve-3d' as const,
    },
    whileHover: isTouchDevice ? {} : { scale },
    transition: { scale: { duration: 0.2 } },
  }

  return {
    containerStyle,
    motionProps,
    isHovered,
    glareX,
    glareY,
    glare,
  }
}
