import { registerSchema } from '../schemas/user.js'
import { register } from '../controllers/auth.js'

export default async function routes(fastify) {
    fastify.post('/register', { ...registerSchema }, register)
}
