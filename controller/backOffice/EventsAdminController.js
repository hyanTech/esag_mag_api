const { deleteFile } = require("../../functions/deleteFile");
const { Event, Ticket } = require("../../models");
const createEventSchema = require("../../Validation/events/ValidateEventShema");


class EventAdminController {
  static async createEvent(req, res) {
    try {
      // Vérifier la présence de l'image
      if (!req.file) {
        return res.status(400).json({ message: "L'image est obligatoire" });
      }

      // Validation des données de l'événement avec le schéma
      const eventData = await createEventSchema.parseAsync(req.body);

      // Ajout de l'image à l'objet événement
      eventData.imageCover = req.file.filename;

      // Création de l'événement en base de données
      const newEvent = await Event.create(eventData);

      // Si l'événement est payant, gérer la création des tickets associés
      if (eventData.isPaid === true) {
        if (!eventData.tickets || eventData.tickets.length === 0) {
          return res
            .status(400)
            .json({
              message:
                "Les informations de ticket sont requises pour un événement payant",
            });
        }

        const ticketsToCreate = eventData.tickets.map((ticket) => ({
          ...ticket,
          eventId: newEvent.id,
        }));

        // Création en masse des tickets (exemple avec Sequelize)
        await Ticket.bulkCreate(ticketsToCreate);
      }

      return res
        .status(200)
        .json({ message: "Événement créé avec succès", event: newEvent });
    } catch (error) {
      console.error(error);
      // Suppression du fichier image en cas d'erreur pour éviter des fichiers orphelins
      deleteFile(req.file.filename);
      return res
        .status(500)
        .json({ message: "Erreur serveur", error: error.message });
    }
  }


  

}

module.exports = EventAdminController;
