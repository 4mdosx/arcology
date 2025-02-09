'use client'
import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"
import { login } from '@/app/actions/auth'
import { LoginSchema, LoginData } from '@/modules/auth/definitions'

const loginSchema = LoginSchema

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = async (data: LoginData) => {
    setIsLoading(true)

    try {
      await login(data)
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description:
          error instanceof Error ? error.message : 'Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-4">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Back to Journey
          </CardTitle>
          <CardDescription className="text-center">
            继续你的冒险
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="email">邮箱地址</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm absolute">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password">登录口令</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm absolute">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !isValid || !isDirty}
            >
              {isLoading ? 'Loading...' : '登录'}
            </Button>
          </form>
          <Link
            href="/signup"
            className="text-sm text-center w-full hover:underline text-blue-500 inline-block mt-4"
          >
            还没有账号？去注册
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
