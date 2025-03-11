const {User} = require("../../Models");
const { UpdateUserSchema } = require("../../Validation/user/UpdateUser");

class AdminUserController {

    static async getUsers(req, res) {
        try {
            const users = await User.findAll();
            return res.status(200).json({ message: "users", users });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "error", error: err });
        }
    }

    static async UserUpdate(req, res) {
        try {
            const { id } = req.params;
            const UpdateUser = UpdateUserSchema.parse(req.body);
            await User.update({ ...UpdateUser }, { where: { id } });
            return res.status(200).json({ message: "user updated successfully" });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "user not updated successfully", error });
        }

    }
}

module.exports = AdminUserController;