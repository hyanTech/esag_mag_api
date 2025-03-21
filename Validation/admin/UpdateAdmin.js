// validationSchemas.js
const { z } = require('zod');

const UpdateAdminSchema = z.object({
    Name: z.string().nonempty({ message: "Le prénom est requis" }).optional(),
    lastName: z.string().nonempty({ message: "Le nom de famille est requis" }).optional(),
    email: z.string().email({ message: "L'email est invalide" }).optional(),
    enabled: z.boolean().optional(),
});

module.exports = { UpdateAdminSchema };
