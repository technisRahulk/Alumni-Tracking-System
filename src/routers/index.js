const router=require("express").Router();
const userRouter=require("./user");
const profileRouter=require("./profile");
const blogRouter=require("./blog");

// blog routers
router.use("/blog",blogRouter);

// user routers
router.use(userRouter);

//  user profile routers
router.use(profileRouter);

module.exports=router;
