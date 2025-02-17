
const express = require("express");
const Controller = require("../controller/controller");
const AdminAuthController = require("../controller/AdminAuthController");
const router = express.Router();

router.get('/', Controller.test);
router.post('/test2', Controller.test2)


//admin Auth
router.post('/create', AdminAuthController.CreateAdmin)




module.exports = router;