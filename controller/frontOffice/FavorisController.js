const { Favoris,Event,Actualite } = require("../../Models"); 




class FavorisController {

    static async addEventFavoris(req, res) {
      try {
        const { userId, eventId } = req.body;
  
        // Validation des champs requis
        if (!userId || !eventId) {
          return res.status(400).json({ message: 'userId et eventId sont requis' });
        }
  
        // Vérifier l'existence du favori
        const existingFavoris = await Favoris.findOne({
          where: {
            userId,
            eventId,
            actuId: null // S'assurer qu'il s'agit bien d'un favori d'événement
          }
        });
  
        if (existingFavoris) {
          // Supprimer le favori existant
          await existingFavoris.destroy();
  
          return res.status(200).json({ message: false });
        } else {
          // Créer un nouveau favori
           await Favoris.create({
            userId,
            eventId,
            actuId: null // Explicitement null pour les événements
          });
  
          return res.status(200).json({ 
            message: true, 
          });
        }
      } catch (error) {
        console.error('Erreur dans addEventFavoris:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
    }

    static async verifyEventFavoris(req, res) {
        try {
            const { userId, eventId } = req.body;
            const favoris = await Favoris.findOne({ where: { userId, eventId } });
            if (favoris) {
                return res.status(200).json({ message: true });
            }
            return res.status(404).json({ message: false });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erreur interne du serveur" });
        }
    }

    static async verifyActuFavoris(req, res) {
      try {
          const { userId, actuId } = req.body;
          const favoris = await Favoris.findOne({ where: { userId, actuId } });
          if (favoris) {
              return res.status(200).json({ message: true });
          }
          return res.status(404).json({ message: false });
      } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "Erreur interne du serveur" });
      }
  }


    static async addActuFavoris(req, res) {
      try {
        const { userId, actuId } = req.body;
  
        // Validation des champs requis
        if (!userId || !actuId) {
          return res.status(400).json({ message: 'userId et actuId sont requis' });
        }
  
        // Vérifier l'existence du favori
        const existingFavoris = await Favoris.findOne({
          where: {
            userId,
            eventId:null,
            actuId // S'assurer qu'il s'agit bien d'un favori d'événement
          }
        });
  
        if (existingFavoris) {
          // Supprimer le favori existant
          await existingFavoris.destroy();
  
          return res.status(200).json({ message: false });
        } else {
          // Créer un nouveau favori
           await Favoris.create({
            userId,
            eventId:null,
            actuId // Explicitement null pour les événements
          });
  
          return res.status(200).json({ 
            message: true, 
          });
        }
      } catch (error) {
        console.error('Erreur dans addEventFavoris:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur', error:error.message });
      }
    }


    static async listeFavoris(req,res){
       try {
        const {userId} = req.params;
        const favorisEvent = await Favoris.findAll({
          where: {
            userId,
            actuId: null
          },
          include:[{
            model: Event,
            attributes: ['id', 'titre', 'date', 'lieu', 'sous_titre', 'imageCover']
           }]
        });

        const favorisActu = await Favoris.findAll({
          where: {
            userId,
            eventId: null
          },
          include:[{
            model: Actualite,
            attributes: ['id', 'titre', 'sous_titre', 'imageCover', 'createdAt']
           }]
        });

        return res.status(200).json({ favorisActu, favorisEvent });
        
       } catch (error) {
        return res.status(500).json({ message: error.message });
       }
    }




  }
  
  module.exports = FavorisController;