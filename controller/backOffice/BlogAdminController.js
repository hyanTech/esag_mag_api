

class BlogAdminController {
    static async createBlog(req, res) {
        try {
            const blog = createBlogSchema.parse(req.body);
            console.log(blog);
            const newBlog = await Blog.create(blog);
            res.json({ message: "Blog created successfully", newBlog });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = BlogAdminController;