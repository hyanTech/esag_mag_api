const { generateUniqueProfileImage } = require("../../functions/imageGenerator");
const { sendSms } = require("../../functions/SendSms");
const {User,Otp} = require("../../Models");
const { createUserSchema } = require("../../Validation/user/UserValidate");

class UserController{

    static async UserCreateSendSms(req,res){
        const { numero } = req.body;
        if(!numero){
            return res.status(400).json({ message: "Numéro de téléphone est requis" });
        }
        try {
            const user = await User.findOne({ where: { numero: numero } });
            
            if (!user) {
              const codeOtp = Math.floor(Math.random() * 9000) + 1000
              const newUser = await User.create({
                numero: numero,
              });
              await Otp.create({
                code:codeOtp ,
                UserId: newUser.id,
              });
              
              /* const message = `Votre code de verification est ${codeOtp}`
              const smsResponse = await sendSms(numero, message);

              console.log("Réponse de l'API SMS:", smsResponse); */

              return res.status(200).json({ message: "user created", userId: newUser.id });
            }
          
            if (user) {
              // Recherche d'une entrée OTP existante pour cet utilisateur
              const otpEntry = await Otp.findOne({ where: { UserId: user.id } });
              if (otpEntry) {
                // Si une entrée existe, on la met à jour
                const codeOtp = Math.floor(Math.random() * 9000) + 1000
               /*  const message = `Votre code de verification est ${codeOtp}`
                const smsResponse = await sendSms(numero, message);
                console.log ("Réponse de l'API SMS:", smsResponse); */
                await otpEntry.update({ code: codeOtp });
              } else {
                // Sinon, on crée une nouvelle entrée OTP
                const codeOtp = Math.floor(Math.random() * 9000) + 1000
                /* const message = `Votre code de verification est ${codeOtp}`
                const smsResponse = await sendSms(numero, message); */
                await Otp.create({
                  code: codeOtp,
                  UserId: user.id,
                });
              }

              return res.status(200).json({ message: "user created", userId: user.id, });
            }
          } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "error", error: err });
          }
          
        
    }

    static async verifyOtp(req, res) {
        const { code, id } = req.body;
        if (!code || !id) {
            return res.status(400).json({ message: "Champs incomplet" });
        }
        try {
            const userOtp = await Otp.findOne({ where: { userId: id } });
    
            if (!userOtp) {
                return res.status(400).json({ message: "Utilisateur introuvable" });
            }
    
            // Vérification de l'expiration (5 min)
            const otpCreatedAt = new Date(userOtp.createdAt);
            const now = new Date();
            const diffInMinutes = (now - otpCreatedAt) / (1000 * 60);
    
            if (diffInMinutes > 5) {
                return res.status(400).json({ message: "Code expiré, veuillez renvoyez un autre OTP" });
            }
    
            if (userOtp.code !== code) {
                return res.status(400).json({ message: "Code invalide" });
            }
    
            // Mettre à jour l'utilisateur comme vérifié
            await User.update({ verified: true }, { where: { id: id } });
            await Otp.destroy({ where: { userId: id } });

            const user = await User.findOne({ where: { id: id } });
    
            return res.status(200).json({ message: "Utilisateur vérifié", userId:id, user: user });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Erreur serveur", error: err });
        }
    }
    

    static async completeAccount(req, res){
        try {
            const {id} = req.params;
            
            if (!id) {
                return res.status(400).json({ message: "L'ID est requis" });
            }

            const user = await User.findOne({ where: { id: id } });
            if (!user) {
                return res.status(400).json({ message: "Utilisateur introuvable" });
            }
            if (user.enabled) {
                return res.status(400).json({ message: "route déjà utilisée" });
            }
            if (!user.verified) {
                return res.status(400).json({ message: "Utilisateur non vérifié" });
            }
    
            const UserValidate = await createUserSchema.parseAsync(req.body);

            // Génération d'une image de profil unique
            const profile = await generateUniqueProfileImage();
            UserValidate.profile = profile;
            
            await User.update(UserValidate, {where: {id: id}});
            const updatedUser = await User.findOne({ where: { id } });
            
            return res.status(200).json({ message: "Profil mis à jour", updatedUser });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erreur serveur", error: error });
        }
    }

}

module.exports = UserController;