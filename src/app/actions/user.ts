'use server'
import 'server-only'
import db from '@/db'
import { usersTable, User } from '@/db/schema'
import { eq } from 'drizzle-orm'
import * as bcrypt from 'bcrypt'

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export type createUserDto = Omit<User, 'id'>
export async function createUser(user: createUserDto) {
  const result = await db.insert(usersTable).values({
    name: user.name,
    email: user.email,
    password: await hashPassword(user.password),
  })

  const userResult = await db.select().from(usersTable).where(eq(usersTable.id, Number(result.lastInsertRowid)))
  return userResult[0]
}
