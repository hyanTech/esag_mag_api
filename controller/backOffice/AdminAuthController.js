
const {Admin} = require('../../models');
const { loginAdminSchema } = require('../../Validation/admin/AdminLogin');
const { createAdminSchema } = require('../../Validation/admin/createAdmin');
const jwt = require('jsonwebtoken');


class AdminAuthController {
    static CreateAdmin = async (req, res) => {
        try {
            const admin = createAdminSchema.parse(req.body);
            //console.log(admin);
            const user = await Admin.findOne({where:{email:admin.email}});
            if(user){
                return res.status(400).json({message:"User already exist"});
            }
            const newAdmin = await Admin.create(admin);
            res.json({ message: "Admin created successfully",newAdmin });
        } catch (error) {
            console.log(error);
          return  res.status(400).json({ message: error });
        }
        
    }


    static AdminLogin = async (req, res) => {
        try {
            const admin = loginAdminSchema.parse(req.body);
            //console.log(admin);
            const user = await Admin.findOne({where:{email:admin.email}});
            if(!user){
                return res.status(400).json({message:"User not found"});
            }

            if(user.enabled == false){
                return res.status(400).json({message:"User not enabled"});
            }

            if(!user.validPassword (admin.password)){
                return res.status(400).json({message:"Password or user not correct"});
            }
            const token = jwt.sign({id:user.id, name:user.Name, email:user.email}, process.env.JWT_SECRET,{expiresIn:'4h'});
            return res.status(200).json({message:"Vous etes connecté avec succès",token});
        } catch (error) {
            console.log(error);
          return  res.status(500).json({ message: error });
        }
        
    }

}

module.exports = AdminAuthController;