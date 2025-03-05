// validationSchemas.js
const { z } = require('zod');

const createUserSchema = z.object({
    nom: z.string().nonempty({ message: "Le nom est requis" }),
    prenom: z.string().nonempty({ message: "Le prenom est requis" }),
    appartenance: z.string(),
    enabled: z.boolean().default(true),
    
});

module.exports = { createUserSchema };
