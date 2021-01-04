const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

router.use(bodyParser.json());
router.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// blogs page home (show one full blog along with other new and popular blogs)
// clicking any blog will redirect to view blog route (/blog/view/:slug)
router.get("/", async(req, res) => {
    res.send("Welcome to Blogs!!");
});

module.exports = router;