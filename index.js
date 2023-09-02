import fastifyJwt from '@fastify/jwt'
import Fastify from 'fastify'
import fastifyBcrypt from 'fastify-bcrypt'
import fastifyEnv from '@fastify/env'
import { PrismaClient } from '@prisma/client'
import AuthRoutes from './routes/auth.js'
import UserRoutes from './routes/user.js'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import AjvErrors from 'ajv-errors'

const prisma = new PrismaClient()

const fastify = Fastify({
    logger: true,
})

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

// register Swagger
await fastify.register(fastifySwagger, {})

await fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    swagger: {
        info: {
            title: 'Volunteer Now Docs',
            description: 'Documentation for the Volunteer Now API',
            version: '0.1.0',
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here',
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'user', description: 'User related end-points' },
            { name: 'code', description: 'Code related end-points' },
        ],
    },
})

// register JWT
await fastify.register(fastifyJwt, { secret: 'test' })

// register Bycrypt
await fastify.register(fastifyBcrypt, { saltWorkFactor: 6 })

// register all routes here
await fastify.register(AuthRoutes, { prefix: '/api' })

await fastify.register(UserRoutes, { prefix: '/api' })

// Run the server!
const PORT = fastify.config.PORT
fastify.listen({ port: PORT }, (_, address) => {
    console.log(`Server is listening on ${address}`)
})
export { fastify, prisma }
