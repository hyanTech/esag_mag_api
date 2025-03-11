const { Suggestion } = require('../../Models');

class SuggestionAdminController {
  static async getSuggestions(req, res) {
    try {
      // Récupérer toutes les suggestions de la base de données
      const suggestions = await Suggestion.findAll();

      return res.status(200).json(suggestions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  static async detailSuggestion(req, res) {     
    try {
      const { id } = req.params;
      const suggestion = await Suggestion.findByPk(id);
      if (!suggestion) {
        return res.status(404).json({ message: 'Suggestion introuvable' });
      }
      return res.status(200).json(suggestion);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

}

module.exports = SuggestionAdminController;
