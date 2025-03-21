const { Comment,User } = require("../../Models"); // Assurez-vous que le chemin est correct
const socketModule = require("../../config/socket");

class CommentBlogController{
    static async addComment(req, res) {
        try {
          const { userId, blogId, content } = req.body;
          
          // Création du commentaire dans la base de données
          const newComment = await Comment.create({ userId, blogId, content });
          
          // Émission de l'événement 'newComment' pour informer les clients connectés
          const fullComment = await Comment.findOne({
            where: { id: newComment.id },
            include: [{
              model: User,
              attributes: ['id', 'nom', 'prenom', 'profile']
            }]
          });
          
          // Émission de l'événement 'newComment' pour informer les clients connectés
          socketModule.getIO().emit('newComment', fullComment);
          
          // Réponse au client
          res.status(201).json(fullComment);
        } catch (error) {
          console.error("Erreur lors de la création du commentaire :", error);
          res.status(500).json({ message: 'Erreur lors de la création du commentaire', error });
        }
      }

    static async getComments(req,res){
        try {
            const { blogId } = req.params;
            const comments = await Comment.findAll({
                where: {
                    blogId
                },
                include: [{
                    model: User,
                    attributes: ['id', 'nom', 'prenom', 'profile']
                }]
            });
            return res.status(200).json({ comments });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = CommentBlogController;