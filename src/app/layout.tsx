import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import App from './app'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cat Arcology Game',
  description: 'Cat Arcology Game',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-cn">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Arcology"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
      </head>
      <body className={inter.className}>
        <App>{children}</App>
      </body>
    </html>
  )
}
