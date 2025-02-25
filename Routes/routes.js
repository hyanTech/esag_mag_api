
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
router.get('/getActualite',verifyAdminToken, ActualiteAdminController.getActualites)
router.delete('/deleteActualite/:id',verifyAdminToken, ActualiteAdminController.deleteActualites)
router.put('/updateActualite/:id',verifyAdminToken, ActualiteAdminController.updateActualite)
router.get('/detailsActu/:id',verifyAdminToken, ActualiteAdminController.detailsActualite)




module.exports = router;