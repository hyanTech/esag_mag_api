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
      const updateAct = UpdateActualite.parse(req.body);
      const actu = await Actualite.update(updateAct, { where: { id: id } });
      return res
        .status(200)
        .json({ message: "Actualité modifiée avec succès", actu });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async deleteActualites(req, res) {
    try {
      const { id } = req.params;
      const delet = await Actualite.destroy({ where: { id: id } });

      return res
        .status(200)
        .json({ message: "Actualité supprimée avec succès", delet });
    } catch (error) {
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
