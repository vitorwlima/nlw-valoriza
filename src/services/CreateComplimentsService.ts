import { getCustomRepository } from 'typeorm'
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories'
import { UsersRepositories } from '../repositories/UsersRepositories'

interface IComplimentRequest {
  tag_id: string
  message: string
  user_sender: string
  user_receiver: string
}

export class CreateComplimentService {
  async execute({
    tag_id,
    message,
    user_sender,
    user_receiver,
  }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
    const userRepositories = getCustomRepository(UsersRepositories)

    if (user_sender === user_receiver)
      throw new Error('Now allowed to send a compliment to yourself.')

    const userReceiver = userRepositories.findOne(user_receiver)

    if (!userReceiver) throw new Error('User receiver does not exist.')

    if (!message) throw new Error('Insert a valid message.')

    if (!tag_id) throw new Error('Invalid tag.')

    const compliment = complimentsRepositories.create({
      tag_id,
      message,
      user_sender,
      user_receiver,
    })

    await complimentsRepositories.save(compliment)

    return compliment
  }
}
