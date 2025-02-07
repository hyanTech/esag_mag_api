
const express = require("express");
const Controller = require("../controller/controller");
const router = express.Router();

router.get('/', Controller.test);

module.exports = router;