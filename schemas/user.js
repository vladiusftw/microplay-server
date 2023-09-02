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
                    minLength: 8,
                },
            },
        },
        response: {
            201: {
                description: 'User registered',
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        properties: {},
                    },
                },
            },
            400: {
                description: 'Bad request',
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Bad request',
                    },
                },
            },
            500: {
                description: 'An Error has occured',
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        properties: {
                            errorMsg: {
                                type: 'string',
                                example:
                                    'An Error has occured, please try again later',
                            },
                        },
                    },
                },
            },
        },
    },
}

export { registerSchema }
