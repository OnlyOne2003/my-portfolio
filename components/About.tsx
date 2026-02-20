'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, GraduationCap, Heart } from 'lucide-react'

const personalInfo = [
  { icon: Calendar, label: 'تاریخ تولد', value: '۲۳ شهریور ۱۳۸۲' },
  { icon: MapPin, label: 'محل سکونت', value: 'اصفهان، ایران' },
  { icon: GraduationCap, label: 'تحصیلات', value: 'کارشناسی علوم کامپیوتر' },
]

const interests = [
  'طراحی رابط کاربری (UI/UX)',
  'انیمیشن‌های وب',
  'تکنولوژی‌های جدید',
  'توسعه موبایل',
]

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            درباره من
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-persian-500 to-turquoise-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Profile Image & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Profile Card */}
            <div className="glass-strong rounded-3xl p-8 mb-8 card-hover">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-persian-500 to-turquoise-500 flex items-center justify-center text-4xl font-bold">
                  ی
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">یگانه سادات موسوی</h3>
                  <p className="text-persian-400 font-mono">Frontend Developer</p>
                </div>
              </div>

              {/* Personal Info */}
              <div className="space-y-4">
                {personalInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl glass hover:bg-white/10 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-persian-500/20">
                      <item.icon className="w-5 h-5 text-persian-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="font-semibold">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '2+', label: 'سال تجربه' },
                { number: '15+', label: 'پروژه موفق' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="glass-strong rounded-2xl p-4 text-center"
                >
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Description & Interests */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* About Text */}
            <div className="glass-strong rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">
                <span className="gradient-text">🚀 داستان من</span>
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  سلام! من یگانه موسوی هستم، توسعه‌دهنده فرانت‌اند با بیش از ۲ سال تجربه در 
                  ساخت رابط‌های کاربری زیبا و کارآمد. علاقه‌مند به خلق تجربه‌های دیجیتال 
                  که کاربران رو شگفت‌زده می‌کنه.
                </p>
                <p>
                  تخصص من در React، React Native و Next.js هست و همیشه به دنبال یادگیری 
                  تکنولوژی‌های جدید و بهبود مهارت‌هام هستم. باور دارم که کد خوب باید هم 
                  زیبا باشه و هم کارآمد.
                </p>
                <p>
                  در پروژه‌های مختلفی مثل شدآمد، فریمد، شناس، آراتایل و کاج‌سبز فعالیت داشتم 
                  و در تیم‌های Agile به صورت حرفه‌ای کار کردم.
                </p>
              </div>
            </div>

            {/* Interests */}
            <div className="glass-strong rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Heart className="text-persian-400" size={24} />
                <span className="gradient-text">علایق من</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="px-4 py-2 rounded-full glass border border-persian-500/30 hover:border-persian-500 hover:bg-persian-500/10 transition-all cursor-default"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
