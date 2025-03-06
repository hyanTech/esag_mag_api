
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
const BlogController = require("../controller/frontOffice/BlogController");
const UserController = require("../controller/frontOffice/UserController");
const EventAdminController = require("../controller/backOffice/EventsAdminController");
const EventController = require("../controller/frontOffice/EventController");
const router = express.Router();

router.get('/', Controller.test);
router.post('/test2', Controller.test2)

//path
router.get('/sendFile/:filename', sendFile);

/* .....................backoffice................. */
//admin Auth
router.post('/createAdmin',verifyAdminToken, AdminAuthController.CreateAdmin)
router.get('/getAdmins',verifyAdminToken, AdminAuthController.getAdmins)
router.post('/AdminLogin', AdminAuthController.AdminLogin)
router.delete('/deleteAdmin/:id',verifyAdminToken, AdminAuthController.deleteAdmin)
router.put('/updateAdmin/:id',verifyAdminToken, AdminAuthController.adminUpdate)


//actualite 
router.post('/createActualite',verifyAdminToken,upload.single('image'),resizeImage(800, 600), ActualiteAdminController.createActualite)
router.get('/getActualite',verifyAdminToken, ActualiteAdminController.getActualites)
router.delete('/deleteActualite/:id',verifyAdminToken, ActualiteAdminController.deleteActualites)
router.put('/updateActualite/:id',verifyAdminToken,upload.single('image'),resizeImage(800, 600), ActualiteAdminController.updateActualite)
router.get('/detailsActu/:id',verifyAdminToken, ActualiteAdminController.detailsActualite)


//Blog
router.get('/getBlog',verifyAdminToken, BlogAdminController.getBlogs)
router.post('/createBlog',verifyAdminToken,upload.single('image'),resizeImage(800, 600), BlogAdminController.createBlog)
router.put('/updateBlog/:id',verifyAdminToken,upload.single('image'),resizeImage(800, 600), BlogAdminController.updateBlog)
router.delete('/deleteBlog/:id',verifyAdminToken, BlogAdminController.deleteBlog)
router.get('/detailBlog/:id',verifyAdminToken, BlogAdminController.detailBlog)

//event
router.post('/createEvent',verifyAdminToken,upload.single('image'),resizeImage(800, 600), EventAdminController.createEvent)
router.get('/eventListe',verifyAdminToken, EventAdminController.getEvent)



//.........end backoffice.................


/* ............fontOffice.................*/


//user
router.post('/createUser', UserController.UserCreateSendSms)
router.post('/verifyOtp', UserController.verifyOtp)
router.post('/completeAccount/:id', UserController.completeAccount)




//actualite
router.get('/listeDernierActu', ActualiteController.dernierActu)
router.get('/detailActu/:id', ActualiteController.detailActu)
router.get('/AutreActu/:id', ActualiteController.AutreActu)
router.get('/listeActu', ActualiteController.listeActu)

//blog
router.get('/listeBlog', BlogController.listeBlog)
router.get('/dernierBlog', BlogController.dernierBlog)
router.get('/detailBlog/:id', BlogController.detailBlog)


//event
router.post('/payTicket/:id', EventController.purchaseTickets)

module.exports = router;