const express = require("express");
const { postSearch } = require("../controllers/search.controller");

const router = express.Router();

// POST /api/search
router.post("/search", postSearch);

module.exports = router;