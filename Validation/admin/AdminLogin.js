// validationSchemas.js
const { z } = require('zod');

const loginAdminSchema = z.object({
    email: z.string().email({ message: "L'email est invalide" }),
    password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

module.exports = { loginAdminSchema };
