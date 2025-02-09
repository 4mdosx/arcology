'use client'
import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from 'lucide-react'
import { signup } from '../actions/auth'
import { SignupSchema, SignupData } from '@/modules/auth/definitions'

// 扩展SignupSchema 添加confirmPassword
const registerSchema = SignupSchema.extend({
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)

    try {
      await signup(SignupSchema.parse(data) as SignupData)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
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
          <CardTitle className="text-3xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">注册账号 开始探索</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name">如何称呼你？</Label>
              <Input
                id="name"
                {...register('name')}
                className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1 absolute">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">一个可以接收确认信息的邮箱</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm absolute">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">不要太简短的登录口令</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <p className="text-red-500 text-sm absolute">{errors.password.message}</p>}
            </div>
            <div>
              <Label htmlFor="confirmPassword">请再重复一遍口令</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={`mt-1 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 absolute">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !isValid || !isDirty}>
              {isLoading ? 'Registering...' : '创建账号'}
            </Button>
          </form>
          <Link href="/login" className="text-sm text-center w-full hover:underline text-blue-500 inline-block mt-4">已经有账号了？去登录</Link>
        </CardContent>
      </Card>
    </div>
  )
}
