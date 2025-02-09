'use server'
import 'server-only'
import { SignupSchema, SignupData, LoginSchema, LoginData } from '@/modules/auth/definitions'
import { deleteSession, createSession } from '@/modules/auth/service'
import { redirect } from 'next/navigation'
import { createUser, getUserByEmail } from '@/modules/user/service'
import * as bcrypt from 'bcrypt'
import { createUserDto } from '@/modules/user/definitions'

export async function signup(formData: SignupData) {
  // Validate form fields
  const validatedFields = SignupSchema.safeParse(formData)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const user = await createUser(validatedFields.data as createUserDto)
  // Create a session
  await createSession(user.id)
  redirect('/dashboard')
}

export async function login(formData: LoginData) {
  const validatedFields = LoginSchema.safeParse(formData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const user = await getUserByEmail(validatedFields.data.email)
  if (!user) {
    return {
      errors: { email: ['User not found'] },
    }
  }
  const passwordsMatch = await bcrypt.compare(validatedFields.data.password, user.password)
  if (!passwordsMatch) {
    return {
      errors: { password: ['Password is incorrect'] },
    }
  }
  await createSession(user.id)
  redirect('/dashboard')
}

export async function logout() {
  deleteSession()
  redirect('/')
}
