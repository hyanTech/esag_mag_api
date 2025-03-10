// validationSchemas.js
const { z } = require('zod');

const UpdateUserSchema = z.object({

    enabled: z.boolean().default(true),
    
});

module.exports = { UpdateUserSchema };
