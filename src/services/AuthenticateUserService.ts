import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest {
  email: string
  password: string
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({ email })

    if (!user) throw new Error('Email is incorrect.')

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new Error('Password is incorrect')

    const token = sign(
      {
        email,
      },
      process.env.ENCRYPT,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    )

    return token
  }
}
