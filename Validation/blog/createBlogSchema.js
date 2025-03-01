

const { z } = require('zod');


const createBlogSchema = z.object({
    titre: z.string().min(1),
    sous_titre: z.string(),
    details: z.string().min(1).optional(),
    enabled:z.boolean().optional(),
});
module.exports = createBlogSchema;