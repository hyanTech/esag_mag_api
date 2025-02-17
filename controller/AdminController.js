
const {Admin} = require('../models')


class AdminController {
    static dashboard = async (req, res) => {
        const adminlist = await Admin.findAll()
        res.json({ message: "Admin dashboard",adminlist });
    }

}

module.exports = AdminController;