const { Like, Blog } = require("../../Models"); // Assurez-vous que le chemin est correct
const socketModule = require("../../config/socket"); // Export de io depuis votre fichier index.js

class LikeBlogController {

    static async AddlikeBlog(req, res) {
        try {
        const { userId, blogId } = req.body;

        // Vérifier si un like existe déjà pour cette combinaison userId/blogId
        const existingLike = await Like.findOne({ where: { userId, blogId } });

        if (existingLike) {
            // Si le like existe, on le supprime (effet toggle)
            await existingLike.destroy();

            // Décrémenter le compteur de likes du blog
            await Blog.decrement("likeAccount", { by: 1, where: { id: blogId } });

            // Émettre l'événement pour notifier les clients
            socketModule.getIO().emit("removeLike", { blogId, userId });

            return res.status(200).json({ message: "Like supprimé avec succès" });
        } else {
            // Sinon, créer le like
            const like = await Like.create({ userId, blogId });

            // Incrémenter le compteur de likes du blog
            await Blog.increment("likeAccount", { by: 1, where: { id: blogId } });

            // Émettre l'événement pour notifier les clients
            socketModule.getIO().emit("newLike", { blogId, userId });

            return res
            .status(201)
            .json({ message: "Like ajouté avec succès", like });
        }
        } catch (error) {
        console.error("Erreur lors du traitement du like :", error);
        return res.status(500).json({ message: "Erreur interne du serveur" });
        }
    }

    static async verifyLike(req, res) {
        try {
            const { userId, blogId } = req.body;
            const like = await Like.findOne({ where: { userId, blogId } });
            if (like) {
                return res.status(200).json({ message: true });
            }
            return res.status(404).json({ message: false });
        } catch (error) {
            
        }
    }
}

module.exports = LikeBlogController;
