
const express = require("express");
const Controller = require("../controller/controller");
const AdminController = require("../controller/AdminController");
const router = express.Router();

router.get('/', Controller.test);
router.post('/test2', Controller.test2)
router.get('/test3', AdminController.dashboard)
module.exports = router;