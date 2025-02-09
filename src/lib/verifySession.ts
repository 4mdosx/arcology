import { verifySession } from '@/modules/auth/service'
import { redirect } from 'next/navigation'

export default async function session () {
  const session = await verifySession()
  if (!session.isAuth) {
    redirect('/login')
  }
  return session.user
}
