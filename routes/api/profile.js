const express = require("express");
const router = express.Router();

// @route           api/profile/test
// @description     tests profile route
// @access          public
router.get("/test", (req, res) => res.json({ message: "profile works" }));

// must export for server.js to pick route up
module.exports = router;
