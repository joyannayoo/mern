const express = require("express");
const router = express.Router();

// @route           api/posts/test
// @description     tests posts route
// @access          public
router.get("/test", (req, res) => res.json({ message: "posts works" }));

// must export for server.js to pick route up
module.exports = router;
