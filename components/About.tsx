'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import {
  Calendar, MapPin, GraduationCap, Heart,
  Users, Lightbulb, Search, Zap, BarChart2, RefreshCw, Shield, GitBranch,
  Building2, Briefcase
} from 'lucide-react'

const personalInfo = [
  { icon: Calendar, label: 'تاریخ تولد', value: '۲۳ شهریور ۱۳۸۲' },
  { icon: MapPin, label: 'محل سکونت', value: 'اصفهان، ایران' },
  { icon: GraduationCap, label: 'تحصیلات', value: 'کارشناسی علوم کامپیوتر' },
]

const interests = [
  { label: 'طراحی رابط کاربری (UI/UX)', emoji: '🎨', desc: 'علاقه به خلق تجربیات بصری زیبا و کاربرپسند' },
  { label: 'انیمیشن‌های وب', emoji: '✨', desc: 'ایجاد تعاملات پویا و جذاب در وب' },
  { label: 'تکنولوژی‌های جدید', emoji: '🚀', desc: 'همیشه به دنبال یادگیری و اکتشاف فناوری‌های نوین' },
  { label: 'توسعه موبایل', emoji: '📱', desc: 'ساخت اپلیکیشن‌های موبایل با React Native' },
  { label: 'معماری نرم‌افزار', emoji: '🏗️', desc: 'طراحی ساختار کد تمیز و مقیاس‌پذیر' },
  { label: 'تجربه کاربری', emoji: '💡', desc: 'تمرکز بر رضایت کاربر در هر مرحله از توسعه' },
]

const softSkills = [
  { icon: Lightbulb, label: 'حل مسئله', desc: 'توانایی تحلیل مشکلات پیچیده و یافتن راه‌حل‌های خلاقانه و عملی' },
  { icon: Users, label: 'کار تیمی', desc: 'همکاری موثر با اعضای تیم و مشارکت فعال در محیط‌های گروهی' },
  { icon: Search, label: 'توجه به جزئیات', desc: 'دقت بالا در پیاده‌سازی و بررسی کدها و رابط‌های کاربری' },
  { icon: Zap, label: 'یادگیری سریع', desc: 'توانایی یادگیری سریع تکنولوژی‌ها و فریمورک‌های جدید' },
  { icon: BarChart2, label: 'تفکر تحلیلی', desc: 'بررسی و تحلیل دقیق نیازمندی‌ها و داده‌ها برای تصمیم‌گیری بهتر' },
  { icon: RefreshCw, label: 'سازگاری', desc: 'انعطاف‌پذیری در برابر تغییرات و شرایط مختلف پروژه' },
  { icon: Shield, label: 'مسئولیت‌پذیری', desc: 'تعهد کامل به انجام وظایف و تحویل به‌موقع پروژه‌ها' },
  { icon: GitBranch, label: 'تسلط بر Agile', desc: 'تجربه کار حرفه‌ای در تیم‌های Agile و آشنایی با اسکرام' },
]

function FlipCard({
  front,
  back,
  delay = 0,
  inView,
}: {
  front: React.ReactNode
  back: React.ReactNode
  delay?: number
  inView: boolean
}) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      className="relative h-32 cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 150, damping: 20 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl glass-strong flex flex-col items-center justify-center gap-2 p-4"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-persian-500/20 to-turquoise-500/20 border border-persian-500/40 flex items-center justify-center p-4 text-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {back}
        </div>
      </motion.div>
    </motion.div>
  )
}

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

        <div className="grid md:grid-cols-2 gap-12 items-start">
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
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: '2+', label: 'سال تجربه' },
                { number: '15+', label: 'پروژه موفق' },
                { number: '3+', label: 'تیم همکاری' },
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

          {/* Right: Description */}
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
                <p className="flex items-start gap-2">
                  <Building2 className="w-5 h-5 text-persian-400 mt-0.5 shrink-0" />
                  <span>
                    افتخار همکاری با <strong className="text-persian-300">شهرداری کاشان</strong> رو
                    داشتم و در این پروژه تجربه‌ای ارزشمند در توسعه سامانه‌های سازمانی
                    به دست آوردم.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Briefcase className="w-5 h-5 text-turquoise-400 mt-0.5 shrink-0" />
                  <span>
                    علاوه بر کارهای تمام‌وقت، مدتی به عنوان <strong className="text-turquoise-300">فریلنسر</strong> فعالیت
                    کردم و پروژه‌های متنوعی رو برای کلاینت‌های مختلف پیاده‌سازی کردم که این
                    تجربه مهارت‌های مدیریت پروژه و ارتباط با مشتری رو در من تقویت کرد.
                  </span>
                </p>
                <p>
                  در پروژه‌های مختلفی مثل شدآمد، فریمد، شناس، آراتایل و کاج‌سبز فعالیت داشتم
                  و در تیم‌های Agile به صورت حرفه‌ای کار کردم.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Soft Skills & Interests side by side */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 items-start">
          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-strong rounded-3xl p-8 h-full">
              <h3 className="text-2xl font-bold mb-2 text-center">
                <span className="gradient-text">💡 مهارت‌های نرم</span>
              </h3>
              <p className="text-center text-gray-400 mb-8 text-sm">روی کارت‌ها هاور کنید</p>
              <div className="grid grid-cols-2 gap-4">
                {softSkills.map((skill, index) => (
                  <FlipCard
                    key={skill.label}
                    delay={0.5 + index * 0.1}
                    inView={inView}
                    front={
                      <>
                        <div className="p-3 rounded-xl bg-persian-500/20">
                          <skill.icon className="w-6 h-6 text-persian-400" />
                        </div>
                        <span className="font-semibold text-center text-sm">{skill.label}</span>
                      </>
                    }
                    back={
                      <p className="text-sm text-gray-300 leading-relaxed">{skill.desc}</p>
                    }
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="glass-strong rounded-3xl p-8 h-full">
              <h3 className="text-2xl font-bold mb-2 text-center flex items-center justify-center gap-2">
                <Heart className="text-persian-400" size={24} />
                <span className="gradient-text">علایق من</span>
              </h3>
              <p className="text-center text-gray-400 mb-8 text-sm">روی کارت‌ها هاور کنید</p>
              <div className="grid grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <FlipCard
                    key={interest.label}
                    delay={0.6 + index * 0.1}
                    inView={inView}
                    front={
                      <>
                        <span className="text-3xl">{interest.emoji}</span>
                        <span className="font-medium text-center text-sm">{interest.label}</span>
                      </>
                    }
                    back={
                      <p className="text-sm text-gray-300 leading-relaxed">{interest.desc}</p>
                    }
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
