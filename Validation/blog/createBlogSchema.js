

const { z } = require('zod');


const createBlogSchema = z.object({
    titre: z.string().min(1),
    sous_titre: z.string(),
    details: z.string().min(1),
    enabled:z.coerce.boolean().optional(),
});
module.exports = createBlogSchema;