const { z } = require('zod');

// Schéma pour les tickets
const ticketSchema = z.object({
  typeTicket: z.string().min(1, { message: "Le type de ticket est requis" }),
  qte: z.number().int().positive({ message: "La quantité doit être positive" }),
  available: z.number().int().positive({ message: "Le nombre disponible doit être positif" }),
  price: z.number().positive({ message: "Le prix doit être positif" }),
  saleStartDate: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      const [day, month, year] = arg.split('-');
      return new Date(`${year}-${month}-${day}`);
    }
    return arg;
  }, z.date()),
  saleEndDate: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      const [day, month, year] = arg.split('-');
      return new Date(`${year}-${month}-${day}`);
    }
    return arg;
  }, z.date())
});

// Schéma de validation principal pour l'événement
const createEventSchema = z.object({
  titre: z.string().min(1),
  sous_titre: z.string(),
  details: z.string().min(1),
  lieu: z.string().min(1),
  date: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      const [day, month, year] = arg.split('-');
      return new Date(`${year}-${month}-${day}`);
    }
    return arg;
  }, z.date()),
  isPaid: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return arg.toLowerCase() === 'true';
    }
    return arg;
  }, z.boolean()).default(false),
  // Pour le tableau de tickets, il faut d'abord parser la chaîne JSON
  tickets: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      try {
        return JSON.parse(arg);
      } catch (error) {
        return [];
      }
    }
    return arg;
  }, z.array(ticketSchema).max(4).optional())
});

module.exports = createEventSchema;
