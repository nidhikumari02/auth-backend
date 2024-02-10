const express = require("express");
const router = express.Router();

const authApi = require("./authApi");
const userApi = require("./userApi");
const authJwt = require("../middlewares/authJwt");

router.use("/auth", authApi);
router.use("/user", authJwt.verifyToken , userApi);

module.exports = router;