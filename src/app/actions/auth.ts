'use server'
import 'server-only'
import { SignupFormSchema, LoginFormSchema, FormState } from '@/lib/definitions'
import { deleteSession, createSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { createUser, createUserDto } from './user'
import { getUserByEmail } from '@/lib/dal'
import * as bcrypt from 'bcrypt'

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

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

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

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
  redirect('/signup')
}
