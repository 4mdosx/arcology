import AppWrapper from '../app_wrapper'
import MaterialSymbols from '@/components/material_symbols'
import Link from 'next/link'

export default function Issue() {
  return (
    <Link href="/issue">
      <AppWrapper>
        <MaterialSymbols raw="&#xf528;"></MaterialSymbols>
      </AppWrapper>
    </Link>
  )
}
