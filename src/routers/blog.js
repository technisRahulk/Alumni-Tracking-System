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
            __dirname + `/../../public/`;

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
    try {
         let reqPath = path.join(__dirname, '../../views');
   
        const token = req.cookies.authorization;
        const finduser = await User.find({
            active: true
        }, null, {
            sort: {
                name: 1
            }
        });
        let user;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
                if (err) console.log(err);
                else user = payload;
            });
        }
        if (req.user) user =req.user; 
        console.log(user);
        const popularBlogs = await Blog.find({})
            .sort({
                views: -1,
            })
            // .limit(5)
            .populate("author");
            

user = await User.findById(req.user).populate('bookmarkBlogs')
    const bookmarks = await Promise.all(
        user.bookmarkBlogs.map(async(blog) => {
            blog.author = await User.findById(blog.author);
            return blog;
        })
    );
    user = await User.findById(req.user).populate('blogs')
            console.log(user);
        res.render(reqPath + "/blog", {
            user: user,
            found: finduser,
            popularBlogs: popularBlogs || [],
             bookmarks: bookmarks||[],
              recentactivity: user.blogs || []

        });
       // console.log(popularBlogs);
    } catch (err) {
        console.error(err);
        res.redirect("/");
    }

});

// form to create blog
router.get("/create", (req, res) => {
    let reqPath = path.join(__dirname, '../../views');
    res.render(reqPath + "/create-blog");
});



//route to save blog
router.post("/create", auth, upload.single("cover-img"), async(req, res) => {
    if (req.file) {
        var cover = `/${req.file.filename}`;
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
        //  var summary;
        //  if(blog.body.length>62)
        //      summary=blog.body.substr(0,60);
        //  else
        //     summary=blog.body; 
        // console.log(summary);
        // var tagsArray = [];
        // if (blog.tags)
        //     tagsArray = blog.tags.split(" ");
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
            // summary: summary,
            body: blog.body
                // tags: (tagsArray.length === 0) ? [] : tagsArray
        }).save();
        if (req.user.blogs) {
            req.user.blogs.push(saved);
        } else {
            req.user.blogs = [saved];
            console.log(req.user.blogs);
        }
        await req.user.save();

        res.redirect("/blog");
    } catch (e) {
        console.log(e.message);
        req.flash("error", "Something went wrong. Try again");
        res.redirect("/blog/create");
    }
});

router.get("/view/:slug", auth, async(req, res) => {

    try {
        //find the corresponding blog in db
        let slug = req.params.slug;
        if (!slug) {
            res.render("404-page");
        }


        const finduser = await User.find({
            active: true
        }, null, {
            sort: {
                name: 1
            }
        });
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
        let user = await User.findById(req.user);
        let recentArr = user.recentBlogs || [];
        recentArr.push(blog._id);
        user.recentBlogs = recentArr;
        await user.save();
        console.log(user);

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

router.get("/blogs", function(req, res) {
    console.log(req.query.search);
    if (req.query.search) {
        const rege = new RegExp(escapeRegex(req.query.search), 'gi');
        Blog.find({
            title: rege
        }, function(err, blogs) {
            if (err)
                console.log(err);
            else {

                res.json(blogs);
            }
        });
    } else {
        Blog.find({}, function(err, blogs) {
            if (err)
                console.log(err);
            else {
                console.log(blogs);
                res.json(blogs);
            }
        });
    }
});


//like a blog
router.get("/appreciate/:blog_id", auth, async(req, res) => {
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

        res.redirect('/blog');
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



router.get("/bookmark/:bookmark_id", auth, async(req, res) => {
    try {
        let user = await User.findById(req.user);
        let bookmarkArr = user.bookmarkBlogs || [];
        if (bookmarkArr.includes(req.params.bookmark_id)) {
            bookmarkArr.remove(req.params.bookmark_id);
        } else {
            bookmarkArr.push(req.params.bookmark_id);
        }
        user.bookmarkBlogs = bookmarkArr;
        await user.save();
        console.log(user);
        res.redirect('/blog');
        // res.redirect(req.get("referer"));
    } catch (error) {
        console.log(error);
        // req.flash("error", "Something went wrong. Try again");
        res.redirect("/");
    }
});

// router.get("/bookmarks", auth, async(req, res) => {
//     const finduser = await User.find({
//         active: true
//     }, null, {
//         sort: {
//             name: 1
//         }
//     });
//     const user = await User.findById(req.user).populate("bookmarkBlogs");
//     res.json(user.bookmarkBlogs);
//     const bookmarks = await Promise.all(
//         user.bookmarkBlogs.map(async(blog) => {
//             blog.author = await User.findById(blog.author);
//             return blog;
//         })
//     );

//     res.render("bookmarks", {
//         user: req.user,
//         found: finduser,
//         bookmarks: bookmarks,
//     });
//     res.send("Your Bookmarks");
// });

router.get("/recentblogs", auth, async(req, res) => {

    const user = await User.findById(req.user).populate("recentBlogs");
    res.json(user.recentBlogs);
    const bookmarks = await Promise.all(
        user.bookmarkBlogs.map(async(blog) => {
            blog.author = await User.findById(blog.author);
            return blog;
        })
    );
    res.render("bookmarks", {
        user: req.user,
        found: finduser,
        bookmarks: bookmarks,
    });
    res.send("Your Bookmarks");
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports = router;