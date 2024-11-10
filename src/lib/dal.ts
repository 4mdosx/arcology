'use server'
import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import db from '@/db'
import { usersTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const verifySession = async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/login')
  }

  return { isAuth: true, userId: session.userId }
}

export const getUser = cache(async () => {
  const { userId } = await verifySession()
  const user = await db.select().from(usersTable).where(eq(usersTable.id, userId as number))
  return user[0]
})

export const getUserByEmail = cache(async (email: string) => {
  const user = await db.select().from(usersTable).where(eq(usersTable.email, email))
  return user[0]
})
