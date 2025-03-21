const { Poll, Question, Option,Answer,Response } = require("../../Models");

class PollController {
  static async getPollOne(req, res) {
    const pollId = req.params.id;
    try {
      const poll = await Poll.findByPk(pollId, {
        include: [
          {
            model: Question,
            include: [{ model: Option }],
          },
        ],
      });
      if (!poll) {
        return res.status(404).json({ error: "Sondage non trouvé" });
      }
      return res.status(200).json({ poll });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async getPollListe(req, res) {
    try {
      // Récupérer tous les sondages avec leurs questions et options associées
      const polls = await Poll.findAll();

      const now = new Date();

      // Filtrer les sondages dont la date de création + durée n'est pas dépassée
      const activePolls = polls.filter((poll) => {
        const createdAt = new Date(poll.createdAt);
        let durationMs = 0;
        // Conversion de la durée (ENUM) en millisecondes
        switch (poll.duration) {
          case "1j":
            durationMs = 24 * 60 * 60 * 1000;
            break;
          case "2j":
            durationMs = 2 * 24 * 60 * 60 * 1000;
            break;
          case "1 semaine":
            durationMs = 7 * 24 * 60 * 60 * 1000;
            break;
          default:
            durationMs = 0;
        }
        // La date limite d'expiration du sondage
        const expirationDate = new Date(createdAt.getTime() + durationMs);
        // Le sondage est actif si la date d'expiration est ultérieure à la date actuelle
        return expirationDate > now;
      });

      return res.status(200).json({ polls: activePolls });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }


  static async submitPoll(req,res){
    try {
      const { pollId, firstName, lastName, answers } = req.body;
      console.log(req.body);
      // Créer la réponse principale
      const responseInstance = await Response.create({ pollId, firstName, lastName });
  
      // Pour chaque réponse à une question, créer une entrée dans Answer
      for (const ans of answers) {
        await Answer.create({
          responseId: responseInstance.id,
          questionId: ans.questionId,
          answer: ans.answer,
        });
      }
  
      res.status(201).json({ message: 'Réponses enregistrées', responseId: responseInstance.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la soumission du sondage' });
    }
  }


}

module.exports = PollController;
