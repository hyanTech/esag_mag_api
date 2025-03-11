const { z } = require('zod');

const baseSchema = z.object({
    nom: z.string().optional(),
    email: z.string().optional(),
    object: z.string().nonempty({ message: "L'objet de la suggestion est requis" }),
    categorie: z.string().nonempty({ message: "La catégorie de la suggestion est requise" }),
    message: z.string().nonempty({ message: "Le message de la suggestion est requis" }),
    type: z.enum(['anonyme', 'public']),
});

const createSuggestionSchema = baseSchema.refine((data) => {
    if (data.type === 'public') {
        return data.nom && data.email;
    }
    return true;
}, {
    message: "Le nom et l'email sont requis pour les suggestions publiques",
    path: ["type"] // Path of the field that failed the refinement
});

module.exports = { createSuggestionSchema };
