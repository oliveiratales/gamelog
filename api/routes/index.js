const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const userGameRoutes = require("./userGameRoutes");

router.use("/users", userRoutes);
router.use("/games", userGameRoutes);

module.exports = router;
