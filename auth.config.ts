import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import github from 'next-auth/providers/github'
import { LoginSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import google from 'next-auth/providers/google'

export default {
  providers: [
    google,
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)
          if (!user || !user.password) return null

          const passwordMatch = await bcrypt.compare(password, user.password)

          if (passwordMatch) {
            return user
          }
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
