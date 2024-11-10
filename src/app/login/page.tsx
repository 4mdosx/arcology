'use client'
import { signup, login } from '@/app/actions/auth'
import { useFormStatus } from 'react-dom'
import { useActionState, useState } from 'react'

function SubmitButton({ name }) {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type="submit">
      {name}
    </button>
  )
}

function SignUpForm() {
  const [state, action] = useActionState(signup, undefined)

  return (
    <form action={action}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <SubmitButton name="Sign Up" />
    </form>
  )
}

function LoginForm() {
  const [state, action] = useActionState(login, undefined)
  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && <p>{state.errors.password}</p>}
      <SubmitButton name="Login" />
    </form>
  )
}

export default function Sign() {
  const [isSignUp, setIsSignUp] = useState(true)
  return (
    <main>
      {/* // checkbox for form */}
      <input
        type="checkbox"
        id="signup"
        name="signup"
        checked={isSignUp}
        onChange={() => setIsSignUp(!isSignUp)}
      />
      <label htmlFor="signup">Sign Up</label>
      {isSignUp ? <SignUpForm /> : <LoginForm />}
    </main>
  )
}
