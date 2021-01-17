const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require("../models/blog");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const slugify = require("slugify");

const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");


router.use(bodyParser.json());
router.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
//MULTER SETUP FOR COVER PICTURE
const storage = multer.diskStorage({
     destination: function(req, file, cb) {

       
        const newDestination =
           __dirname + `/../../public/upload/cover/`;
        
        cb(null, newDestination);
    },
    filename: function(req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000,
    },
    fileFilter: (req, file, cb) => {
        //allowed extension
        const filetypes = /jpeg|jpg|png|gif/;
        //check extension
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        //check mimetype
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb("Error: Image only !", false);
        }
    },
});


// blogs page home (show one full blog along with other new and popular blogs)
// clicking any blog will redirect to view blog route (/blog/view/:slug)
router.get("/",auth,async(req, res) => {
    res.send("Welcome to Blogs!!");
});

// form to create blog
router.get("/create", (req, res) => {
});



//route to save blog
router.post("/create",auth,upload.single("cover"), async(req, res) => {
    if (req.file) {
        var cover = `/upload/cover/${req.file.filename}`;
    } else {
        var cover =
            "https://cdn-images-1.medium.com/max/800/1*fDv4ftmFy4VkJmMR7VQmEA.png";
    }
    try {
        const blog = req.body;
        // console.log(blog)
        if (!blog) {
            req.flash("Something went wrong");
            res.redirect("/");
        }
        var tagsArray = [];
        if(blog.tags)
            tagsArray = blog.tags.split(" ");
        const saved = await new Blog({
            title: blog.title,
            slug: (
                slugify(blog.title) +
                "-" +
                Math.random().toString(36).substr(2, 8)
            ).toLowerCase(),
            author: req.user.userId,
            category: blog.category,
            cover: cover,
            summary: blog.summary,
            body: blog.body,
            tags: (tagsArray.length===0) ? [] : tagsArray
        }).save();
        if (req.dbUser.blogs) {
            req.dbUser.blogs.push(saved);
        } else {
            req.dbUser.blogs = [saved];
        }
        await req.dbUser.save();
        res.redirect("/blog");
    } catch (e) {
        console.log(e.message);
        req.flash("error", "Something went wrong. Try again");
        res.redirect("/");
    }
});






module.exports = router;