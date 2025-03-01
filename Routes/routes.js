
const express = require("express");
const Controller = require("../controller/controller");
const upload = require("../config/multerConfig");
const resizeImage = require("../middlewares/resizeImage ");
const { sendFile } = require("../functions/sendFile");
const ActualiteAdminController = require("../controller/backOffice/ActualiteAdminController");
const AdminAuthController = require("../controller/backOffice/AdminAuthController");
const verifyAdminToken = require("../middlewares/AdminAuthMiddleware");
const ActualiteController = require("../controller/frontOffice/ActualiteController");
const BlogAdminController = require("../controller/backOffice/BlogAdminController");
const router = express.Router();

router.get('/', Controller.test);
router.post('/test2', Controller.test2)

//path
router.get('/sendFile/:filename', sendFile);

/* .....................backoffice................. */
//admin Auth
router.post('/create', AdminAuthController.CreateAdmin)
router.post('/AdminLogin', AdminAuthController.AdminLogin)


//actualite 
router.post('/createActualite',verifyAdminToken,upload.single('image'),resizeImage(800, 600), ActualiteAdminController.createActualite)
router.get('/getActualite',verifyAdminToken, ActualiteAdminController.getActualites)
router.delete('/deleteActualite/:id',verifyAdminToken, ActualiteAdminController.deleteActualites)
router.put('/updateActualite/:id',verifyAdminToken,upload.single('image'),resizeImage(800, 600), ActualiteAdminController.updateActualite)
router.get('/detailsActu/:id',verifyAdminToken, ActualiteAdminController.detailsActualite)


//Blog
router.post('/createBlog',verifyAdminToken,upload.single('image'),resizeImage(800, 600), BlogAdminController.createBlog)





//.........end backoffice.................


/* ............fontOffice.................*/
router.get('/listeDernierActu', ActualiteController.dernierActu)
router.get('/detailActu/:id', ActualiteController.detailActu)
router.get('/AutreActu/:id', ActualiteController.AutreActu)
router.get('/listeActu', ActualiteController.listeActu)




module.exports = router;