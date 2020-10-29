require("dotenv").config();
const express=require("express")
const app=express();
const bodyParser=require("body-parser");
const compression = require("compression");
const cors=require("cors")
const mongoose=require("mongoose");
const PORT=process.env.PORT||4000;
const {MONGO_URL}=require("./config/key");
const Routes=require("./routes/route");
const path=require("path")
// middleware

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(compression())
app.use(cors());

// static file setup
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"../public")));

// route setup
app.use(Routes);
// mongoDB setup
mongoose.connect(MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb");
})
mongoose.connection.on("error",(err)=>{
    console.log(err,"mongodb");
})
app.listen(PORT,()=>{
    console.log("Connected to port"+PORT);
})