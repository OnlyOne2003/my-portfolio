'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  ExternalLink,
  Github,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Image as ImageIcon,
  Layers,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface MediaItem {
  id: number
  type: 'image' | 'video'
  src: string
  thumbnail?: string
  caption?: string
}

interface Project {
  id: number
  title: string
  description: string
  coverImage: string
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  category: string
  media: MediaItem[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: 1,
    title: 'دیجی پایه',
    description: 'پلتفرم تعامل فروشندگان کالای دیجیتال با Next.js و FastAPI',
    coverImage: '/projects/digipaye/cover.jpg',
    tech: ['Next.js', 'FastAPI', 'PWA', 'Tailwind'],
    category: 'وب',
    media: [
      { id: 1, type: 'image', src: '/projects/digipaye/1.jpg', caption: 'صفحه اصلی' },
      { id: 2, type: 'image', src: '/projects/digipaye/2.jpg', caption: 'داشبورد فروشنده' },
      { id: 3, type: 'image', src: '/projects/digipaye/3.jpg', caption: 'صفحه محصولات' },
      { id: 4, type: 'video', src: '/projects/digipaye/demo.mp4', thumbnail: '/projects/digipaye/demo-thumb.jpg', caption: 'دمو برنامه' },
    ],
  },
  {
    id: 2,
    title: 'فریمد',
    description: 'اپلیکیشن موبایل تعامل خیاطان و طراحان پارچه',
    coverImage: '/projects/framed/cover.jpg',
    tech: ['React Native', 'Expo', 'UI/UX'],
    category: 'موبایل',
    media: [
      { id: 1, type: 'image', src: '/projects/framed/1.jpg', caption: 'صفحه خوش‌آمدگویی' },
      { id: 2, type: 'image', src: '/projects/framed/2.jpg', caption: 'فید طراحان' },
      { id: 3, type: 'image', src: '/projects/framed/3.jpg', caption: 'پروفایل کاربر' },
      { id: 4, type: 'image', src: '/projects/framed/4.jpg', caption: 'بازار پارچه' },
      { id: 5, type: 'video', src: '/projects/framed/demo.mp4', thumbnail: '/projects/framed/demo-thumb.jpg', caption: 'دمو برنامه' },
    ],
  },
  {
    id: 3,
    title: 'آراتایل',
    description: 'سیستم مدیریت فروش مصالح ساختمانی',
    coverImage: '/projects/aratile/cover.jpg',
    tech: ['React Native', 'Expo', 'Redux'],
    category: 'موبایل',
    media: [
      { id: 1, type: 'image', src: '/projects/aratile/1.jpg', caption: 'کاتالوگ محصولات' },
      { id: 2, type: 'image', src: '/projects/aratile/2.jpg', caption: 'جزئیات محصول' },
      { id: 3, type: 'image', src: '/projects/aratile/3.jpg', caption: 'سبد خرید' },
      { id: 4, type: 'video', src: '/projects/aratile/demo.mp4', thumbnail: '/projects/aratile/demo-thumb.jpg', caption: 'دمو برنامه' },
    ],
  },
  {
    id: 4,
    title: 'شناس',
    description: 'مدیریت پروژه و پیمانکاران عمرانی',
    coverImage: '/projects/shenas/cover.jpg',
    tech: ['React Native', 'Expo', 'API Integration'],
    category: 'موبایل',
    media: [
      { id: 1, type: 'image', src: '/projects/shenas/1.jpg', caption: 'لیست پروژه‌ها' },
      { id: 2, type: 'image', src: '/projects/shenas/2.jpg', caption: 'مدیریت پیمانکاران' },
      { id: 3, type: 'image', src: '/projects/shenas/3.jpg', caption: 'گزارش‌گیری' },
      { id: 4, type: 'video', src: '/projects/shenas/demo.mp4', thumbnail: '/projects/shenas/demo-thumb.jpg', caption: 'دمو برنامه' },
    ],
  },
  {
    id: 5,
    title: 'شدآمد',
    description: 'مدیریت ناوگان حمل و نقل شرکت‌های بزرگ',
    coverImage: '/projects/shadamad/cover.jpg',
    tech: ['React', 'TypeScript', 'Dashboard'],
    category: 'وب',
    media: [
      { id: 1, type: 'image', src: '/projects/shadamad/1.jpg', caption: 'داشبورد اصلی' },
      { id: 2, type: 'image', src: '/projects/shadamad/2.jpg', caption: 'ردیابی ناوگان' },
      { id: 3, type: 'image', src: '/projects/shadamad/3.jpg', caption: 'گزارش سفرها' },
      { id: 4, type: 'video', src: '/projects/shadamad/demo.mp4', thumbnail: '/projects/shadamad/demo-thumb.jpg', caption: 'دمو سیستم' },
    ],
  },
  {
    id: 6,
    title: 'کاج سبز',
    description: 'مدیریت همیاران المپیاد جهانی فیزیک',
    coverImage: '/projects/kajsabz/cover.jpg',
    tech: ['JavaScript', 'PWA', 'HTML/CSS'],
    category: 'وب',
    media: [
      { id: 1, type: 'image', src: '/projects/kajsabz/1.jpg', caption: 'صفحه اصلی' },
      { id: 2, type: 'image', src: '/projects/kajsabz/2.jpg', caption: 'لیست همیاران' },
      { id: 3, type: 'image', src: '/projects/kajsabz/3.jpg', caption: 'پنل مدیریت' },
    ],
  },
]

// ─── Media Placeholder ────────────────────────────────────────────────────────

const COLORS = [
  'from-persian-500/40 to-turquoise-500/40',
  'from-turquoise-500/40 to-purple-500/40',
  'from-purple-500/40 to-persian-500/40',
  'from-pink-500/40 to-persian-500/40',
  'from-persian-500/40 to-pink-500/40',
]

function MediaPlaceholder({ index, label, isVideo }: { index: number; label?: string; isVideo?: boolean }) {
  const color = COLORS[index % COLORS.length]
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${color}`}>
      {isVideo ? (
        <Play size={40} className="text-white/60 mb-2" />
      ) : (
        <ImageIcon size={40} className="text-white/60 mb-2" />
      )}
      {label && <p className="text-white/50 text-xs text-center px-2">{label}</p>}
    </div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

interface LightboxProps {
  media: MediaItem[]
  startIndex: number
  onClose: () => void
}

function Lightbox({ media, startIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const item = media[current]

  const goTo = useCallback(
    (next: number, dir: 'left' | 'right') => {
      setDirection(dir)
      setCurrent(next)
    },
    []
  )

  const goPrev = useCallback(() => {
    if (current > 0) goTo(current - 1, 'right')
  }, [current, goTo])

  const goNext = useCallback(() => {
    if (current < media.length - 1) goTo(current + 1, 'left')
  }, [current, media.length, goTo])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, goPrev, goNext])

  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'left' ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'left' ? -300 : 300,
      opacity: 0,
    }),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
        onClick={onClose}
      >
        <X size={22} />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-sm text-gray-400 font-mono z-10">
        {current + 1} / {media.length}
      </div>

      {/* Prev button */}
      <button
        onClick={(e) => { e.stopPropagation(); goPrev() }}
        disabled={current === 0}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-20 z-10"
      >
        <ChevronRight size={28} />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); goNext() }}
        disabled={current === media.length - 1}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-20 z-10"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Media content */}
      <div
        className="relative w-full max-w-5xl px-20 flex items-center justify-center"
        style={{ height: '75vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="w-full h-full flex items-center justify-center"
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                controls
                className="max-w-full max-h-full rounded-2xl shadow-2xl"
                style={{ maxHeight: '70vh' }}
                onError={(e) => {
                  (e.target as HTMLVideoElement).style.display = 'none'
                }}
              />
            ) : (
              <img
                src={item.src}
                alt={item.caption ?? ''}
                className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
                style={{ maxHeight: '70vh' }}
                onError={(e) => {
                  const el = e.target as HTMLImageElement
                  el.style.display = 'none'
                  el.parentElement!.innerHTML = `<div class="w-96 h-72 flex flex-col items-center justify-center bg-white/5 rounded-2xl text-gray-400"><svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5'><rect x='3' y='3' width='18' height='18' rx='2'/><circle cx='8.5' cy='8.5' r='1.5'/><path d='m21 15-5-5L5 21'/></svg><p class='mt-3 text-sm'>${item.caption ?? 'تصویر'}</p></div>`
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Caption */}
      {item.caption && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-300 text-sm px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
          {item.caption}
        </div>
      )}

      {/* Dot indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
        {media.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i, i > current ? 'left' : 'right') }}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ─── Gallery Modal (per-project folder) ───────────────────────────────────────

interface GalleryModalProps {
  project: Project
  onClose: () => void
}

function GalleryModal({ project, onClose }: GalleryModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxIndex === null) onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, lightboxIndex])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="glass-strong rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm rounded-t-3xl">
            <div>
              <h3 className="text-2xl font-bold gradient-text">{project.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{project.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
            >
              <X size={24} />
            </button>
          </div>

          <div className="px-6 pb-6">
            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* External links */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex gap-3 mb-6">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-persian-500/20 border border-persian-500/30 hover:bg-persian-500/30 transition-colors text-sm"
                  >
                    <ExternalLink size={14} />
                    مشاهده آنلاین
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm"
                  >
                    <Github size={14} />
                    کد منبع
                  </a>
                )}
              </div>
            )}

            {/* Media count */}
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <Layers size={16} />
              <span>{project.media.length} فایل رسانه</span>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.media.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  onClick={() => setLightboxIndex(idx)}
                  className="relative aspect-video rounded-xl overflow-hidden group hover:ring-2 hover:ring-persian-500/60 transition-all focus:outline-none"
                >
                  {/* Thumbnail */}
                  <div className="w-full h-full bg-white/5">
                    {item.type === 'video' ? (
                      item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.caption ?? ''}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const parent = (e.target as HTMLElement).parentElement!
                            ;(e.target as HTMLElement).remove()
                            const div = document.createElement('div')
                            div.className = 'w-full h-full'
                            div.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-persian-500/30 to-turquoise-500/30"><svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='white' opacity='0.6' viewBox='0 0 24 24'><polygon points='5 3 19 12 5 21 5 3'/></svg></div>`
                            parent.appendChild(div)
                          }}
                        />
                      ) : (
                        <MediaPlaceholder index={idx} label={item.caption} isVideo />
                      )
                    ) : (
                      <img
                        src={item.src}
                        alt={item.caption ?? ''}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const parent = (e.target as HTMLElement).parentElement!
                          ;(e.target as HTMLElement).remove()
                          const div = document.createElement('div')
                          div.className = 'w-full h-full'
                          parent.appendChild(div)
                          const root = document.createElement('div')
                          root.className = 'w-full h-full'
                          parent.innerHTML = ''
                          parent.appendChild(root)
                        }}
                      />
                    )}
                  </div>

                  {/* Video play icon overlay */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-persian-500/80 transition-colors">
                        <Play size={18} className="text-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    {item.caption && (
                      <p className="text-xs text-white px-2 py-1.5 w-full truncate">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox (above gallery modal) */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            media={project.media}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project
  index: number
  inView: boolean
  onClick: () => void
}

function ProjectCard({ project, index, inView, onClick }: ProjectCardProps) {
  const imageCount = project.media.filter((m) => m.type === 'image').length
  const videoCount = project.media.filter((m) => m.type === 'video').length

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      onClick={onClick}
      className="glass-strong rounded-3xl overflow-hidden group hover:scale-105 transition-transform cursor-pointer"
    >
      {/* Cover Image */}
      <div className="relative h-56 overflow-hidden">
        <div className="w-full h-full">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              const parent = (e.target as HTMLElement).parentElement!
              ;(e.target as HTMLElement).style.display = 'none'
              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-persian-500/20 to-turquoise-500/20"><div class="text-center text-gray-400"><svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.2' class='mx-auto mb-2 opacity-40'><rect x='3' y='3' width='18' height='18' rx='2'/><circle cx='8.5' cy='8.5' r='1.5'/><path d='m21 15-5-5L5 21'/></svg></div></div>`
            }}
          />
        </div>

        {/* Gradient overlay always visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Media badges */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {imageCount > 0 && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs">
              <ImageIcon size={11} />
              {imageCount}
            </span>
          )}
          {videoCount > 0 && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs">
              <Play size={11} />
              {videoCount}
            </span>
          )}
        </div>

        {/* Click-to-open hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-sm flex items-center gap-2">
            <Layers size={14} />
            مشاهده گالری
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [selectedCategory, setSelectedCategory] = useState('همه')
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const categories = ['همه', 'وب', 'موبایل']

  const filtered =
    selectedCategory === 'همه'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <section id="projects" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            پروژه‌های من
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-persian-500 to-turquoise-500 mx-auto rounded-full" />
          <p className="mt-6 text-gray-300 text-lg">نمونه کارها و پروژه‌های انجام شده</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-persian-500 to-persian-600 text-white shadow-lg shadow-persian-500/50'
                  : 'glass hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              inView={inView}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {activeProject && (
          <GalleryModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
