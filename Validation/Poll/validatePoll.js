// validations/pollValidation.js
const { z } = require("zod");

const pollSchema = z.object({
  title: z.string().nonempty("Le titre est requis"),
  description: z.string().optional(),
  duration: z.enum(["1j", "2j", "1 semaine"], { required_error: "La durée est requise" }),
  questions: z.array(z.object({
    type: z.enum(["text", "radio", "checkbox", "dropdown"]),
    text: z.string().nonempty("Le texte de la question est requis"),
    required: z.boolean().optional(),
    options: z.array(z.string()).optional()
  })).nonempty("Au moins une question est requise")
});

module.exports = { pollSchema };
