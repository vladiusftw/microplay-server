import Autoload from '@fastify/autoload'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fastifyJwt from '@fastify/jwt'
import Fastify from 'fastify'
import fastifyBcrypt from 'fastify-bcrypt'
import fastifyEnv from '@fastify/env'

const fastify = Fastify({
    logger: true,
})

const _fileName = fileURLToPath(import.meta.url)
const _dirname = dirname(_fileName)

// register env
await fastify.register(fastifyEnv, {
    schema: {
        type: 'object',
        properties: {
            PORT: {
                type: 'number',
                default: 3000,
            },
        },
    },
    dotenv: true,
    data: process.env,
})

// register JWT
await fastify.register(fastifyJwt, { secret: 'test' })

// register Bycrypt
await fastify.register(fastifyBcrypt, { saltWorkFactor: 6 })

// register all routes here
await fastify.register(Autoload, {
    dir: join(_dirname, 'routes'),
    options: {
        prefix: '/api',
    },
})

// Run the server!
const PORT = fastify.config.PORT
fastify.listen({ port: PORT }, (_, address) => {
    console.log(`Server is listening on ${address}`)
})
export default fastify
