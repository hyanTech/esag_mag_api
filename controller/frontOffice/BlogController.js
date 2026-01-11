const { Blog } = require("../../models");

class BlogController {

    static listeBlog = async (req, res) => {
        try {
            const blog = await Blog.findAll({
                where: {
                    enabled: true
                },
                order: [['createdAt', 'DESC']] // Tri par date de création décroissante
            });
            return res.status(200).json({ blog });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    static detailBlog = async (req, res) => {
        try {
            const { id } = req.params;
            const blog = await Blog.findByPk(id, { where: { enabled: true } });
            if (!blog) {
                return res.status(404).json({ message: "Blog introuvable" });
            }
            return res.status(200).json({ blog });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    static async dernierBlog(req, res){
        try{
            const dernierBlog = await Blog.findAll({
                where:{
                    enabled: true
                },
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'titre', 'sous_titre', 'imageCover', 'createdAt'],
                limit: 4
            });
           return res.status(200).json({dernierBlog})
        }catch(error){
            console.error(error);
            res.status(500).json({message: error.message})
        }
    }



}

module.exports = BlogController;