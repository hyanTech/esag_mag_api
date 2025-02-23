const { z } = require('zod');
const UpdateActualite = z.object({
    titre: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    sous_titre: z.string(),
    enabled:z.boolean().optional(),
});
module.exports = UpdateActualite;