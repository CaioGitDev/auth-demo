import { RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { CardWrapper } from '@/components/auth/card-wrapper'
import { useState, useTransition } from 'react'
import { register } from '@/actions/register'

export function RegisterForm() {
  const [registerError, setError] = useState<string | undefined>('')
  const [registerSuccess, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  const handleOnSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      register(values).then((response) => {
        setError(response.error)
        setSuccess(response.success)
      })
    })
  }

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Caio Rosa"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="dev.caiorosa@gmail.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password field             */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="********"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormSuccess message={registerSuccess} />
            <FormError message={registerError} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Register
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}
