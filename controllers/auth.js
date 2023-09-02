import { fastify, prisma } from '../index.js'

const register = async (response, reply) => {
    try {
        const { email, password } = response.body

        // email is invalid check
        if (!email.includes('@')) {
            reply.code(400)
            return {
                message: 'Invalid email',
            }
        }

        // encrypt the password
        const hashedPassword = await fastify.bcrypt.hash(password)

        // create user in DB
        try {
            await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                },
            })
        } catch (e) {
            reply.code(400)
            return {
                message: 'Email already exists',
            }
        }

        // user created successfully
        reply.code(201)
        return { data: { email, password } }
    } catch (e) {
        // an error has occured
        reply.code(500)
        return {
            message: 'An Error has occured, please try again later',
        }
    }
}

export { register }
