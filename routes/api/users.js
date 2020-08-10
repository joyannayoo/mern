const express = require("express");
const router = express.Router();

// @route           api/users/test
// @description     tests users route
// @access          public
router.get("/test", (req, res) => res.json({ message: "users works" }));

// must export for server.js to pick route up
module.exports = router;
