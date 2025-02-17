// validationSchemas.js
const { z } = require('zod');

const createAdminSchema = z.object({
    Name: z.string().nonempty({ message: "Le prénom est requis" }),
    lastName: z.string().nonempty({ message: "Le nom de famille est requis" }),
    email: z.string().email({ message: "L'email est invalide" }),
    password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
    profil: z.string().optional(),
});

module.exports = { createAdminSchema };
