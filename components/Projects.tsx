'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Upload, X } from 'lucide-react'
import Image from 'next/image'

interface Project {
  id: number
  title: string
  description: string
  image: string
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  category: string
}

const initialProjects: Project[] = [
  {
    id: 1,
    title: 'دیجی پایه',
    description: 'پلتفرم تعامل فروشندگان کالای دیجیتال با Next.js و FastAPI',
    image: '/projects/digipaye.jpg',
    tech: ['Next.js', 'FastAPI', 'PWA', 'Tailwind'],
    category: 'وب',
  },
  {
    id: 2,
    title: 'فریمد',
    description: 'اپلیکیشن موبایل تعامل خیاطان و طراحان پارچه',
    image: '/projects/framed.jpg',
    tech: ['React Native', 'Expo', 'UI/UX'],
    category: 'موبایل',
  },
  {
    id: 3,
    title: 'آراتایل',
    description: 'سیستم مدیریت فروش مصالح ساختمانی',
    image: '/projects/aratile.jpg',
    tech: ['React Native', 'Expo', 'Redux'],
    category: 'موبایل',
  },
  {
    id: 4,
    title: 'شناس',
    description: 'مدیریت پروژه و پیمانکاران عمرانی',
    image: '/projects/shenas.jpg',
    tech: ['React Native', 'Expo', 'API Integration'],
    category: 'موبایل',
  },
  {
    id: 5,
    title: 'شدآمد',
    description: 'مدیریت ناوگان حمل و نقل شرکت‌های بزرگ',
    image: '/projects/shadamad.jpg',
    tech: ['React', 'TypeScript', 'Dashboard'],
    category: 'وب',
  },
  {
    id: 6,
    title: 'کاج سبز',
    description: 'مدیریت همیاران المپیاد جهانی فیزیک',
    image: '/projects/kajsabz.jpg',
    tech: ['JavaScript', 'PWA', 'HTML/CSS'],
    category: 'وب',
  },
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  })

  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [selectedCategory, setSelectedCategory] = useState('همه')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tech: '',
    category: 'وب',
  })
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const categories = ['همه', 'وب', 'موبایل']

  const filteredProjects = selectedCategory === 'همه'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProject = () => {
    if (newProject.title && newProject.description && uploadedImage) {
      const project: Project = {
        id: projects.length + 1,
        title: newProject.title,
        description: newProject.description,
        image: uploadedImage,
        tech: newProject.tech.split(',').map(t => t.trim()),
        category: newProject.category,
      }
      
      setProjects([...projects, project])
      setNewProject({ title: '', description: '', tech: '', category: 'وب' })
      setUploadedImage(null)
      setIsUploadModalOpen(false)
    }
  }

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
          <p className="mt-6 text-gray-300 text-lg">
            نمونه کارها و پروژه‌های انجام شده
          </p>
        </motion.div>

        {/* Category Filter + Upload Button */}
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
          
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-6 py-3 rounded-full font-semibold glass hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Upload size={20} />
            افزودن پروژه
          </button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="glass-strong rounded-3xl overflow-hidden group hover:scale-105 transition-transform"
            >
              {/* Project Image */}
              <div className="relative h-56 bg-gradient-to-br from-persian-500/20 to-turquoise-500/20 overflow-hidden">
                {project.image && project.image.startsWith('/projects/') ? (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Upload size={48} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">تصویر پروژه</p>
                    </div>
                  </div>
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : null}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center gap-2 hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink size={16} />
                        مشاهده
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center gap-2 hover:bg-white/30 transition-colors"
                      >
                        <Github size={16} />
                        کد
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
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
          ))}
        </div>

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-strong rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold gradient-text">افزودن پروژه جدید</h3>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">تصویر پروژه</label>
                  <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-white/40 transition-colors">
                    {uploadedImage ? (
                      <div className="relative">
                        <img src={uploadedImage} alt="Preview" className="max-h-64 mx-auto rounded-xl" />
                        <button
                          onClick={() => setUploadedImage(null)}
                          className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-400 mb-2">کلیک کنید یا تصویر را بکشید</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان پروژه</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-persian-500 outline-none transition-colors"
                    placeholder="مثال: اپلیکیشن فروشگاهی"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">توضیحات</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-persian-500 outline-none transition-colors resize-none"
                    rows={4}
                    placeholder="توضیحات کامل پروژه..."
                  />
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="block text-sm font-medium mb-2">تکنولوژی‌ها (با کاما جدا کنید)</label>
                  <input
                    type="text"
                    value={newProject.tech}
                    onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-persian-500 outline-none transition-colors"
                    placeholder="React, Next.js, Tailwind"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2">دسته‌بندی</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-persian-500 outline-none transition-colors"
                  >
                    <option value="وب">وب</option>
                    <option value="موبایل">موبایل</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleAddProject}
                  disabled={!newProject.title || !newProject.description || !uploadedImage}
                  className="w-full py-4 bg-gradient-to-r from-persian-500 to-persian-600 rounded-xl font-semibold shadow-lg shadow-persian-500/50 hover:shadow-persian-500/80 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  افزودن پروژه
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
