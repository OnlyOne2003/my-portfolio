import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'یگانه موسوی | توسعه‌دهنده فرانت‌اند',
  description: 'توسعه‌دهنده فرانت‌اند متخصص در React، React Native، Next.js و تکنولوژی‌های مدرن وب. ساخت رابط‌های کاربری زیبا و ریسپانسیو.',
  keywords: ['Frontend Developer', 'React', 'React Native', 'Next.js', 'JavaScript', 'TypeScript', 'توسعه‌دهنده فرانت‌اند'],
  authors: [{ name: 'Yeganeh Mousavi' }],
  openGraph: {
    title: 'یگانه موسوی | توسعه‌دهنده فرانت‌اند',
    description: 'توسعه‌دهنده فرانت‌اند متخصص در React و تکنولوژی‌های مدرن وب',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  )
}