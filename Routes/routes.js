
const express = require("express");
const Controller = require("../controller/controller");
const upload = require("../config/multerConfig");
const resizeImage = require("../middlewares/resizeImage ");
const { sendFile } = require("../functions/sendFile");
const ActualiteAdminController = require("../controller/backOffice/ActualiteAdminController");
const AdminAuthController = require("../controller/backOffice/AdminAuthController");
const verifyAdminToken = require("../middlewares/AdminAuthMiddleware");
const router = express.Router();

router.get('/', Controller.test);
router.post('/test2', Controller.test2)

//path
router.get('/sendFile/:filename', sendFile);


//admin Auth
router.post('/create', AdminAuthController.CreateAdmin)
router.post('/AdminLogin', AdminAuthController.AdminLogin)


//actualite
router.post('/createActualite',verifyAdminToken,upload.single('image'),resizeImage(800, 600), ActualiteAdminController.createActualite)
router.get('/getActualite', ActualiteAdminController.getActualites)
router.delete('/deleteActualite/:id', ActualiteAdminController.deleteActualites)
router.put('/updateActualite/:id', ActualiteAdminController.updateActualite)
router.get('/detailsActu/:id', ActualiteAdminController.detailsActualite)




module.exports = router;