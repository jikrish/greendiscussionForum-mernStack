const express = require("express");
const router = express.Router();
const { register } = require("../controllers/loginAndRegister");
router.post("/", register);

module.exports = router;
