const { z } = require('zod');
const UpdateActualite = z.object({
    titre: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    sous_titre: z.string().optional(),
    enabled:z.boolean().optional(),
    description_mobile:z.string().min(1).optional(),
});
module.exports = UpdateActualite;