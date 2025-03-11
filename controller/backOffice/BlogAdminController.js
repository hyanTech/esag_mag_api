const { deleteFile } = require("../../functions/deleteFile");
const { Blog } = require("../../Models");
const createBlogSchema = require("../../Validation/blog/createBlogSchema");
const updateBlog = require("../../Validation/blog/UpdateBlog");

class BlogAdminController {
  static async createBlog(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Une image est obligatoire !" });
      }

      if (!req.file.path.endsWith(".webp")) {
        return res
          .status(400)
          .json({ message: "L'image doit être au format WebP !" });
      }
      const blog = createBlogSchema.parse(req.body);
      blog.imageCover = req.file.filename;

      console.log(req.file.filename);
      await Blog.create(blog);

      return res.status(200).json({ message: "Blog created successfully" });
    } catch (error) {
      deleteFile(req.file.filename);
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getBlogs(req, res) {
    try {
      const blogs = await Blog.findAll();
      return res.status(200).json({ blogs });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async updateBlog(req, res) {
    try {
        const { id } = req.params;
        // Valider et parser les données de la requête avec Zod
        const updateData = updateBlog.parse(req.body);
    
        // Si un fichier est fourni, on met à jour le champ imageCover
        if (req.file) {
          // Récupération de l'actualité existante pour supprimer l'ancien fichier
          const blog = await Blog.findByPk(id);
          if (blog && blog.imageCover) {
            console.log('ancien fichier supprime');
            deleteFile(blog.imageCover);
          }
          updateData.imageCover = req.file.filename;
        }
    
        // Mise à jour de l'actualité avec les données fournies
        const [updatedCount, updatedRows] = await Blog.update(updateData, {
          where: { id },
          returning: true, // Assurez-vous que votre SGBD le supporte
        });
    
        if (updatedCount === 0) {
          return res.status(404).json({ message: "blog non trouvée" });
        }
    
        return res.status(200).json({
          message: "blog modifiée avec succès",
          actu: updatedRows[0],
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }
  }



  static async deleteBlog(req, res) {
    try {
        const { id } = req.params;
        const blog = await Blog.findByPk(id);
        if (!blog){
          return res.status(400).json({message:"blog introuvable"})
            
        }
  
        deleteFile(blog.imageCover)
        
        const delet = await Blog.destroy({ where: { id: id } });
  
        return res
          .status(200)
          .json({ message: "blog supprimée avec succès", delet });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
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


}

module.exports = BlogAdminController;
