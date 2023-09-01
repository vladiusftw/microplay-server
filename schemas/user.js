const registerSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
            },
        },
    },
}

export { registerSchema }
