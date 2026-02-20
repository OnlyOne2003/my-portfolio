'use client'

import { motion } from 'framer-motion'
import { Github, Mail, FileDown } from 'lucide-react'
import SkillsCube from './SkillsCube'

const socialLinks = [
  { icon: Github, href: 'https://github.com/OnlyOne2003', label: 'GitHub' },
  { icon: Mail, href: 'mailto:yeganeh.mousavi.2003@gmail.com', label: 'Email' },
]

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-persian-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-turquoise-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10 pt-20 sm:pt-0">
        <div className="text-center">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="inline-block px-6 py-2 rounded-full glass text-persian-400 text-sm font-medium">
              سلام، من یگانه‌ام 👋
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 persian-decoration"
          >
            <span className="gradient-text">توسعه‌دهنده</span>
            <br />
            <span className="text-white">فرانت‌اند</span>
          </motion.h1>

          {/* Skills Cube */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 flex items-center justify-center"
          >
            <SkillsCube />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-persian-500 to-persian-600 rounded-full font-semibold shadow-lg shadow-persian-500/50 hover:shadow-persian-500/80 transition-shadow"
            >
              مشاهده پروژه‌ها
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass rounded-full font-semibold border border-white/20 hover:border-white/40 transition-colors"
            >
              تماس با من
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass rounded-full font-semibold border border-white/20 hover:border-white/40 transition-colors flex items-center gap-2"
            >
              <FileDown size={20} />
              دانلود رزومه
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-3 glass rounded-full hover:bg-white/10 transition-colors group"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.5 }}
        className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
