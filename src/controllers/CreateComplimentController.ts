import { Request, Response } from 'express'
import { CreateComplimentService } from '../services/CreateComplimentsService'

export class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, message, user_receiver } = request.body
    const { user_id } = request

    const createComplimentService = new CreateComplimentService()
    const compliment = await createComplimentService.execute({
      tag_id,
      message,
      user_sender: user_id,
      user_receiver,
    })

    return response.json(compliment)
  }
}
