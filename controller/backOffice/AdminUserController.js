const {User} = require("../../models");

class AdminUserController{

    static async getUsers(req, res){
        try{
            const users = await User.findAll();
            return res.status(200).json({ message: "users", users });
        }catch(err){
            console.log(err);
            return res.status(500).json({ message: "error", error: err });
        }
    }

}

module.exports = AdminUserController;