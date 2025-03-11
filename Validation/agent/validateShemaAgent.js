

const { z } = require('zod');


const createAgentSchema = z.object({
    name: z.string().min(1),
    codeAgent: z.string().min(6).max(6),
});
module.exports = createAgentSchema;