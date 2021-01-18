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
            author: req.user._id,
            category: blog.category,
            cover: cover,
            summary: blog.summary,
            body: blog.body,
            tags: (tagsArray.length===0) ? [] : tagsArray
        }).save();
        if (req.user.blogs) {
            req.user.blogs.push(saved);
        } else {
            req.user.blogs = [saved];
        }
        await req.user.save();
        res.redirect("/blog");
    } catch (e) {
        console.log(e.message);
        req.flash("error", "Something went wrong. Try again");
        res.redirect("/");
    }
});

router.get("/view/:slug", async(req, res) => {
   
    try {
        //find the corresponding blog in db
        let slug = req.params.slug;
        if (!slug) {
            res.render("404-page");
        }

        // const finduser = await User.find({
        //     active: true
        // }, null, {
        //     sort: {
        //         name: 1
        //     }
        // });
        const blog = await Blog.findOneAndUpdate({
            slug,
        }, {
            $inc: {
                views: 1,
            },
        }, {
            new: true,
        }).populate("author");
        if (!blog) {
            res.render("404-page");
        }
        
        
        //  const token = req.header("Authorization").replace("Bearer ", "");
        // console.log(token);
        // // let user;
        // if (token) {
        //     const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        //     if (decodedToken)
        //         user = await User.findById(decodedToken._id);
        // }
       
        //render result page
        // res.render("", {
        //     
        //     blog: blog,
        //     
        //    
        // });
       // res.send(blog);
    } catch (e) {
        console.log(e.message);
        req.flash("error", "Something went wrong. Try again");
        res.redirect("/");
    }
});

//like a blog
router.post("/appreciate/:blog_id", auth, async(req, res) => {
    try {
        let user = req.user;
        let likesArr = user.likes || [];
        let blog = await Blog.findById(req.params.blog_id);
        if (likesArr.includes(req.params.blog_id)) {
            likesArr.remove(req.params.blog_id);
            blog.appreciateCount = blog.appreciateCount - 1;
        } else {
            likesArr.push(req.params.blog_id);
            blog.appreciateCount = blog.appreciateCount + 1;

        }
        user.likes = likesArr;
        await blog.save();
        await user.save();
         console.log(likesArr);

        //res.redirect(req.get("referer"));
    } catch (error) {
        console.log(error);
        req.flash("error", "Something went wrong. Try again");
        res.redirect("/");
    }
});
//delete a blog
router.get("/delete/:blog_id", auth, async(req, res) => {
    try {
        const user = req.user;
         
        user.blogs = user.blogs.filter(
            (blog) => !blog._id.equals(req.params.blog_id)
        );
        await user.save();
 await Blog.findByIdAndRemove(req.params.blog_id);
        res.redirect("/blog");
    } catch (error) {
        console.log(error);
       
    }
});

module.exports = router;