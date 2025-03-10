const { z } = require('zod');

const createSuggestionSchema = z.object({
    nom: z.string().optional(),
    email: z.string().email({ message: "L'email doit être valide" }).optional(),
    object: z.string().nonempty({ message: "L'objet de la suggestion est requis" }),
    categorie: z.string().nonempty({ message: "La catégorie de la suggestion est requise" }),
    message: z.string().nonempty({ message: "Le message de la suggestion est requis" }),
    type: z.enum(['anonyme', 'public']),
  });
  


module.exports = { createSuggestionSchema };
