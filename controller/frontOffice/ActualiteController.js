const {Actualite} = require('../../models')
const { Op } = require("sequelize");

class ActualiteController{

    static listeActu = async (req, res) => {
        try {
          const actu = await Actualite.findAll({
            where: {
              enabled: true
            },
            order: [['createdAt', 'DESC']] // Tri par date de création décroissante
          });
          return res.status(200).json({ actu });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: error.message });
        }
      }
      


    static async dernierActu(req, res){
        try{
            const dernierActu = await Actualite.findAll({
                where:{
                    enabled: true
                },
                order: [['createdAt', 'DESC']],
                limit: 4
            });
           return res.status(200).json({dernierActu})
        }catch(error){
            console.error(error);
            res.status(500).json({message: error.message})
        }
    }

    static async detailActu(req, res){
        try {
            const {id} = req.params
            const actu = await Actualite.findByPk(id, { where: { enabled: true } });
            return res.status(200).json({actu})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message})
        }
    }

    static async AutreActu(req, res) {
        try {
          const { id } = req.params;
      
          // Récupérer l'article de référence
          const actu = await Actualite.findByPk(id, { where: { enabled: true } });
          if (!actu) {
            return res.status(404).json({ error: "Article non trouvé" });
          }
      
          // Récupérer la date de création de l'article et calculer les bornes
          const createdAt = new Date(actu.createdAt);
          
          // Définir la borne inférieure : début de la veille (j - 1 à 00:00:00)
          const startDate = new Date(createdAt);
          startDate.setDate(startDate.getDate() - 1);
          startDate.setHours(0, 0, 0, 0);
      
          // Définir la borne supérieure : fin du lendemain (j + 1 à 23:59:59)
          const endDate = new Date(createdAt);
          endDate.setDate(endDate.getDate() + 1);
          endDate.setHours(23, 59, 59, 999);
      
          // Rechercher les autres articles (enabled = true et id différent)
          // dont la date de création est comprise entre startDate et endDate
          const autresActualites = await Actualite.findAll({
            where: {
              enabled: true,
              id: { [Op.ne]: id },
              createdAt: {
                [Op.between]: [startDate, endDate],
              },
            },
            limit: 4,
            order: [["createdAt", "DESC"]],
          });
      
          return res.status(200).json({autresActualites});
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Erreur serveur" });
        }
      }
}

module.exports = ActualiteController;