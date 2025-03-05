
const { Admin } = require("../../models");
const { loginAdminSchema } = require("../../Validation/admin/AdminLogin");
const { createAdminSchema } = require("../../Validation/admin/createAdmin");
const jwt = require("jsonwebtoken");
const { UpdateAdminSchema } = require("../../Validation/admin/UpdateAdmin");

class AdminAuthController {
  static CreateAdmin = async (req, res) => {
    try {
      const admin = createAdminSchema.parse(req.body);
      //console.log(admin);
      const user = await Admin.findOne({ where: { email: admin.email } });
      if (user) {
        return res.status(400).json({ message: "User already exist" });
      }
      await Admin.create(admin);
      return res.status(200).json({ message: "Admin created successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  };

  static getAdmins = async (req, res) => {
    try {
      const admins = await Admin.findAll();
      return res.status(200).json({ admins });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  };

  static AdminLogin = async (req, res) => {
    try {
      const admin = loginAdminSchema.parse(req.body);
      //console.log(admin);
      const user = await Admin.findOne({ where: { email: admin.email } });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (user.enabled == false) {
        return res.status(400).json({ message: "User not enabled" });
      }

      if (!user.validPassword(admin.password)) {
        return res
          .status(400)
          .json({ message: "Password or user not correct" });
      }
      const token = jwt.sign(
        { id: user.id, name: user.Name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "4h" }
      );
      return res
        .status(200)
        .json({ message: "Vous etes connecté avec succès", token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  };

  static async deleteAdmin(req,res){
    try {
      const {id} = req.params
      const user = await Admin.destroy({where:{id}})
      return res.status(200).json({message:"Admin deleted successfully",user})
    } catch (error) {
      console.log(error)
      return res.status(500).json({message:"Admin not deleted successfully", error})
    }
  }

  static async adminUpdate(req,res){
    try {
      const {id} = req.params
      const updateAdmin = UpdateAdminSchema.parse(req.body)
      await Admin.update({...updateAdmin},{where:{id}})
      return res.status(200).json({message:"Admin updated successfully"})
    } catch (error) {
      console.log(error)
      return res.status(400).json({message:"Admin not updated successfully", error})
    }
  }
}

module.exports = AdminAuthController;
