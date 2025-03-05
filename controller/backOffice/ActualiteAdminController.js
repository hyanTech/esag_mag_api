const createActualite = require("../../Validation/AcatualiteValidate");
const UpdateActualite = require("../../Validation/UpadateActualite");
const { deleteFile } = require("../../functions/deleteFile");
const { BASE_URL } = require("../../functions/fileUrl");
const { Actualite } = require("../../models");

class ActualiteAdminController {
  static async createActualite(req, res) {
    try {
      // Vérifier si un fichier a été uploadé
      if (!req.file) {
        return res.status(400).json({ message: "Une image est obligatoire !" });
      }

      // Vérifier si l'image est bien en WebP
      if (!req.file.path.endsWith(".webp")) {
        return res
          .status(400)
          .json({ message: "L'image doit être au format WebP !" });
      }

      // Récupérer les données du formulaire
      const actual = createActualite.parse(req.body);

      // Ajouter le chemin de l'image WebP aux données
      actual.imageCover = req.file.filename;

      // Créer l'actualité dans la base de données
      await Actualite.create(actual);

      return res.status(200).json({ message: "Actualite cree avec succes" });
    } catch (error) {
      console.error(error);
      deleteFile(req.file.filename); // Supprimer le fichier

      res.status(500).json({ message: error.message });
    }
  }

  static async getActualites(req, res) {
    try {
      const actu = await Actualite.findAll();

      return res.status(200).json({ actualites: actu });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async updateActualite(req, res) {
    try {
      const { id } = req.params;
      // Valider et parser les données de la requête avec Zod
      const updateData = UpdateActualite.parse(req.body);
  
      // Si un fichier est fourni, on met à jour le champ imageCover
      if (req.file) {
        // Récupération de l'actualité existante pour supprimer l'ancien fichier
        const actu = await Actualite.findByPk(id);
        if (actu && actu.imageCover) {
          console.log('ancien fichier supprime');
          deleteFile(actu.imageCover);
        }
        updateData.imageCover = req.file.filename;
      }

      console.log('image non trouve')
  
      // Mise à jour de l'actualité avec les données fournies
      const [updatedCount, updatedRows] = await Actualite.update(updateData, {
        where: { id },
        returning: true, // Assurez-vous que votre SGBD le supporte
      });
  
      if (updatedCount === 0) {
        return res.status(404).json({ message: "Actualité non trouvée" });
      }
  
      return res.status(200).json({
        message: "Actualité modifiée avec succès",
        actu: updatedRows[0],
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  

  static async deleteActualites(req, res) {
    try {
      const { id } = req.params;
      const Actu = await Actualite.findByPk(id);
      if (!Actu){
        return res.status(400).json({message:"Actualite introuvable"})
          
      }

      deleteFile(Actu.imageCover)
      
      const delet = await Actualite.destroy({ where: { id: id } });

      return res
        .status(200)
        .json({ message: "Actualité supprimée avec succès", delet });
    } catch (error) {
      console
      res.status(500).json({ message: error });
    }
  }

  static async detailsActualite(req, res) {
    try {
      const { id } = req.params;
      const actu = await Actualite.findByPk(id);
      if (!actu) {
        return res.status(404).json({ message: "Actualité introuvable" });
      }
      const userData = {
        ...actu.toJSON(),
        imageUrl: actu.imageCover ? `${BASE_URL(req)}${actu.imageCover}` : null,
      };
      return res.status(200).json({ actualite: userData });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  
}

module.exports = ActualiteAdminController;
