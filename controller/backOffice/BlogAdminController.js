const { deleteFile } = require("../../functions/deleteFile");
const { Blog } = require("../../models");
const createBlogSchema = require("../../Validation/blog/createBlogSchema");

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




}

module.exports = BlogAdminController;
