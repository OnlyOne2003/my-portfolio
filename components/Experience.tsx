'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Code, Smartphone } from 'lucide-react'

const experiences = [
  {
    title: 'دیجی پایه',
    role: 'توسعه‌دهنده فول‌استک',
    period: 'شهریور ۱۴۰۴',
    type: 'وب اپلیکیشن',
    tech: ['Next.js', 'FastAPI', 'PWA'],
    description: 'پلتفرم تعامل فروشندگان کالای دیجیتال. مسئولیت توسعه بک‌اند و فرانت‌اند.',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'فریمد',
    role: 'توسعه‌دهنده فرانت‌اند و UI/UX',
    period: 'اردیبهشت ۱۴۰۴',
    type: 'اپلیکیشن موبایل',
    tech: ['React Native', 'Expo'],
    description: 'اپلیکیشن تعامل خیاطان و طراحان پارچه. مسئول کامل طراحی و توسعه فرانت‌اند.',
    icon: Smartphone,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'آراتایل',
    role: 'توسعه‌دهنده فرانت‌اند و UI/UX',
    period: 'اسفند ۱۴۰۳',
    type: 'اپلیکیشن موبایل',
    tech: ['React Native', 'Expo'],
    description: 'سیستم مدیریت فروش مصالح ساختمانی. طراحی و پیاده‌سازی کامل رابط کاربری.',
    icon: Smartphone,
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'شناس',
    role: 'توسعه‌دهنده فرانت‌اند و UI/UX',
    period: 'بهمن ۱۴۰۳',
    type: 'اپلیکیشن موبایل',
    tech: ['React Native', 'Expo'],
    description: 'مدیریت پروژه و پیمانکاران عمرانی و ساختمانی. مسئولیت کامل فرانت‌اند و تجربه کاربری.',
    icon: Smartphone,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'شدآمد',
    role: 'توسعه‌دهنده فرانت‌اند',
    period: 'مرداد ۱۴۰۳ - تاکنون',
    type: 'وب اپلیکیشن',
    tech: ['React'],
    description: 'مدیریت و بهینه‌سازی حمل و نقل شرکت‌های بالای ۵۰۰ نفر. توسعه داشبورد پیچیده.',
    icon: Code,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'کاج سبز',
    role: 'توسعه‌دهنده فرانت‌اند',
    period: 'خرداد ۱۴۰۳',
    type: 'وب اپلیکیشن PWA',
    tech: ['JavaScript', 'PWA', 'HTML', 'CSS'],
    description: 'مدیریت همیاران دانشگاه صنعتی اصفهان در المپیاد جهانی فیزیک.',
    icon: Code,
    color: 'from-teal-500 to-green-500',
  },
]

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  })

  return (
    <section id="experience" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            تجربیات کاری
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-persian-500 to-turquoise-500 mx-auto rounded-full" />
          <p className="mt-6 text-gray-300 text-lg">
            پروژه‌ها و تجربیات حرفه‌ای من
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute right-1/2 translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-persian-500 via-purple-500 to-turquoise-500 hidden md:block" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`flex items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="glass-strong rounded-3xl p-6 md:p-8 hover:scale-105 transition-transform">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                          <p className="text-persian-400 font-semibold mb-1">{exp.role}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar size={16} />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${exp.color}`}>
                          <exp.icon className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Type Badge */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 rounded-full text-sm glass border border-white/20">
                          {exp.type}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-sm font-mono bg-white/5 border border-white/10 hover:border-white/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:block">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg`}
                    >
                      <div className="w-6 h-6 rounded-full bg-white/20" />
                    </motion.div>
                  </div>

                  {/* Spacer for even items */}
                  {isEven && <div className="flex-1 hidden md:block" />}
                  {!isEven && <div className="flex-1 hidden md:block" />}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: experiences.length * 0.15 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            <span className="gradient-text">🎓 تحصیلات</span>
          </h3>
          
          <div className="glass-strong rounded-3xl p-8 max-w-2xl mx-auto">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                <Code className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold mb-2">کارشناسی علوم کامپیوتر</h4>
                <p className="text-turquoise-400 font-semibold mb-3">دانشگاه کاشان</p>
                <p className="text-gray-300">
                  تحصیل در رشته علوم کامپیوتر با تمرکز بر توسعه نرم‌افزار و برنامه‌نویسی
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
