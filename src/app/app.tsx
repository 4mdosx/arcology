'use client'
import './app.css'

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div id="app">{children}</div>
}
