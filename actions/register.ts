'use server'

import { RegisterSchema } from '@/schemas'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { getUserByEmail } from '@/data/user'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, name } = values

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  // TODO: token email verification

  return { success: 'User Created!' }
}
