import AppWrapper from '../app_wrapper'
import MaterialSymbols from '@/components/material_symbols'
import Link from 'next/link'
export default function Find() {
  return (
    <Link href="/find">
  <AppWrapper>
    <MaterialSymbols name="explore"></MaterialSymbols>
  </AppWrapper>
    </Link>)
}