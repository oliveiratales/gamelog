const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const gameRoutes = require("./gameRoutes");

router.use("/users", userRoutes);
router.use("/games", gameRoutes);

module.exports = router;
