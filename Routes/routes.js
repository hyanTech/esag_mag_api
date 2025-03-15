
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
const SuggestionController = require ("../controller/frontOffice/SuggestionController");
const SuggestionAdminController =require ("../controller/backOffice/SuggestionAdminController");
const AdminAgentController = require("../controller/backOffice/AdminAgentController");
const AdminUserController = require("../controller/backOffice/AdminUserController");
const AdminSondageController = require("../controller/backOffice/AdminSondageController");
const PollController = require("../controller/frontOffice/PollController");
const router = express.Router();

router.get('/', Controller.test);
router.post('/test2', Controller.test2)

//path
router.get('/sendFile/:filename', sendFile);

/* .....................backoffice................. */
//admin Auth
router.post('/createAdmin', AdminAuthController.CreateAdmin)
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
router.get('/getBlog', BlogAdminController.getBlogs)
router.post('/createBlog',verifyAdminToken,upload.single('image'),resizeImage(800, 600), BlogAdminController.createBlog)
router.put('/updateBlog/:id',verifyAdminToken,upload.single('image'),resizeImage(800, 600), BlogAdminController.updateBlog)
router.delete('/deleteBlog/:id',verifyAdminToken, BlogAdminController.deleteBlog)
router.get('/detailsBlog/:id',verifyAdminToken, BlogAdminController.detailBlog)

//event
router.post('/createEvent',verifyAdminToken,upload.single('image'),resizeImage(800, 600), EventAdminController.createEvent)
router.get('/eventListe',verifyAdminToken, EventAdminController.getEvent)
router.get('/eventListeAgent',verifyAdminToken, EventAdminController.getEventAgent)
router.delete('/deleteEvent/:id',verifyAdminToken, EventAdminController.deleteEvent)

//sugestion
router.get('/getSuggestions',verifyAdminToken, SuggestionAdminController.getSuggestions)
router.get('/detailSuggestion/:id',verifyAdminToken, SuggestionAdminController.detailSuggestion)


// user 
router.get('/getUsers',verifyAdminToken, AdminUserController.getUsers)
router.put('/updateUser/:id',verifyAdminToken, AdminUserController.UserUpdate)

//agent
router.get('/getAgents',verifyAdminToken, AdminAgentController.getAgents)
router.post('/createAgent/:eventId',verifyAdminToken, AdminAgentController.createAgent)
router.delete('/deleteAgent/:id',verifyAdminToken,AdminAgentController.deleteAgent)
router.post('/AgentConnexion',AdminAgentController.AgentConnexion)
router.post('/logoutAgent',AdminAgentController.LogoutAgent)
router.get('/checkSession',AdminAgentController.checkSession)


//poll
router.post('/createPoll',verifyAdminToken, AdminSondageController.createPoll)



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
router.post('/payTicket/:id', EventController.purchaseTickets),
router.get('/getRecentEvents', EventController.getRecentEvents)
router.get('/listeEvent', EventController.getEvent)
router.get('/getEventById/:id', EventController.getEventById)
router.get('/ticketDetail/:id', EventController.TicketDetail)

//sugestion
router.post('/createSuggestion', SuggestionController.createSuggestion)


//poll
router.get('/getPoll/:id', PollController.getPollOne)
router.get('/getPollListe', PollController.getPollListe)

//..........end fontOffice..................




module.exports = router;