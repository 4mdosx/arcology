import './app.css'
import ActionBar from '@/components/action_bar'
export default function App({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <div id="app">
      {children}
      <ActionBar />
    </div>
  )
}
