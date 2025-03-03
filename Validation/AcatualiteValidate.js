const { z } = require('zod');
const createActualite = z.object({
    titre: z.string().min(1),
    sous_titre: z.string(),
    description: z.string().min(1),
    enabled:z.coerce.boolean().optional(),
});
module.exports = createActualite;