'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skills = [
  'JavaScript',
  'React.js',
  'React Native',
  'Next.js',
  'TypeScript',
  'HTML5 & CSS3',
  'Tailwind CSS',
  'Redux Toolkit',
  'REST API',
  'Git & GitHub',
  'Expo',
  'PWA',
]

const tools = [
  'VS Code',
  'Figma',
  'Axios',
  'Framer Motion',
  'Responsive Design',
  'Agile / Scrum',

]

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            مهارت‌های من
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-persian-500 to-turquoise-500 mx-auto rounded-full" />
          <p className="mt-6 text-gray-300 text-lg">
            تکنولوژی‌ها و ابزارهایی که باهاشون کار می‌کنم
          </p>
        </motion.div>

        {/* Technical Skills */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl font-bold mb-8"
          >
            <span className="gradient-text">💻 مهارت‌های تخصصی</span>
          </motion.h3>
          
          <div className="glass-strong rounded-3xl p-8">
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="px-6 py-3 rounded-full glass border border-persian-500/30 hover:border-persian-500 hover:bg-persian-500/10 transition-all cursor-default font-medium"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8">
            <span className="gradient-text">🛠️ ابزارها و تکنولوژی‌ها</span>
          </h3>
          
          <div className="glass-strong rounded-3xl p-8">
            <div className="flex flex-wrap gap-3">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 1 + index * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="px-6 py-3 rounded-full glass border border-turquoise-500/30 hover:border-turquoise-500 hover:bg-turquoise-500/10 transition-all cursor-default font-medium"
                >
                  {tool}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Language Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-8">
            <span className="gradient-text">🌍 مهارت‌های زبانی</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold">فارسی</span>
                <span className="text-persian-400 font-semibold">مادری</span>
              </div>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex-1 h-2 bg-gradient-to-r from-persian-500 to-persian-600 rounded-full" />
                ))}
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold">انگلیسی</span>
                <span className="text-turquoise-400 font-semibold">پیشرفته (B2)</span>
              </div>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 h-2 rounded-full ${
                      i < 4 
                        ? 'bg-gradient-to-r from-turquoise-500 to-turquoise-600' 
                        : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
