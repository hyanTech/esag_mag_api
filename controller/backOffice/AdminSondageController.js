const {Poll, Question, Option} = require("../../Models");
const { ZodError } = require("zod");
const { pollSchema } = require("../../Validation/Poll/validatePoll");

class AdminSondageController {
    static createPoll = async (req, res) => {
        try {
            // Valider les données de la requête
            const data = pollSchema.parse(req.body);
        
            // Créer le sondage
            const poll = await Poll.create({
              title: data.title,
              description: data.description,
              duration: data.duration,
            });
        
            // Créer chaque question et leurs options si nécessaire
            for (const questionData of data.questions) {
              const question = await Question.create({
                pollId: poll.id,
                type: questionData.type,
                text: questionData.text,
                required: questionData.required || false,
              });
        
              // Pour les types de questions nécessitant des options
              if (["radio", "checkbox", "dropdown"].includes(questionData.type) && questionData.options) {
                for (const optionText of questionData.options) {
                  await Option.create({
                    questionId: question.id,
                    text: optionText,
                  });
                }
              }
            }
        
            res.status(201).json({ message: "Sondage créé avec succès", poll });
          } catch (error) {
            if (error instanceof ZodError) {
              // Erreurs de validation Zod
              res.status(400).json({ errors: error.errors });
            } else {
              console.error(error);
              res.status(500).json({ error: "Erreur lors de la création du sondage" });
            }
          }
    }

    


}

module.exports = AdminSondageController;