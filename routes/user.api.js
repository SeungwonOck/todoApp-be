const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// 회원가입
router.post("/", userController.createUser)
router.post("/login", userController.loginUser)

module.exports = router;