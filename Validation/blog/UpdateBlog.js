const { z } = require('zod');
const updateBlog = z.object({
    titre: z.string().min(1).optional(),
    sous_titre: z.string().optional(),
    details: z.string().min(1).optional(),
    enabled:z.boolean().optional()
});
module.exports = updateBlog;