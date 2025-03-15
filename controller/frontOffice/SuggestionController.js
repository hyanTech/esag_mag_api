const { Suggestion } = require('../../Models');
const {createSuggestionSchema} = require ("../../Validation/Suggestion/SuggestionsValidate");


class SuggestionController {
  static async createSuggestion(req, res) {
    try {
      // Valider les données entrantes
        console.log("Requête reçue :", req.body)
      const validationResult = createSuggestionSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ errors: validationResult.error.errors });
      }

      // Créer une nouvelle suggestion dans la base de données
      const newSuggestion = await Suggestion.create(validationResult.data);

      return res.status(200).json({newSuggestion});
    } catch (error) {
      console.error('Erreur lors de la création de la suggestion:', error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }
}

module.exports = SuggestionController;
