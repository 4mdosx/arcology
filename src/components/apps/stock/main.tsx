import AppWrapper from '../app_wrapper'
import MaterialSymbols from '@/components/material_symbols'
import Link from 'next/link'

interface AppProps {
  style?: React.CSSProperties
}

export default function Stock({ style }: AppProps) {
  return (
    <Link href="/stock" style={style}>
      <AppWrapper>
        <MaterialSymbols raw="&#xea12;"></MaterialSymbols>
        <div className='title'>Stock</div>
      </AppWrapper>
    </Link>
  )
}
