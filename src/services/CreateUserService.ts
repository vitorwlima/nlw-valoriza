import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'
import { hash } from 'bcryptjs'

interface IUserRequest {
  name: string
  email: string
  password: string
  admin?: boolean
}

export class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories)

    if (!email) throw new Error('Email incorrect.')

    if (!password) throw new Error('Insert a valid password.')
    if (password && password.length < 5) throw new Error('Password too short.')

    const userAlreadyExists = await usersRepository.findOne({ email })

    if (userAlreadyExists) throw new Error('User already exists.')

    const passwordHash = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    })

    await usersRepository.save(user)

    return user
  }
}
