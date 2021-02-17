const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "is invalid"],
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.length < 8)
                    throw new Error("Password length should be atleast 8 characters");
                if (value.toLowerCase().includes("password"))
                    throw new Error("Your password cannot have 'password' in it");
            },
        },
        branch: {
            type: String,
            // required:true,
            trim: true,
        },

        likes: [{
            type: Schema.Types.ObjectId,
            ref: "Blog",
        }],


        blogs: [{
            type: Schema.Types.ObjectId,
            ref: "Blog",
        }],
        bookmarkBlogs: [{
            type: Schema.Types.ObjectId,
            ref: "Blog",
        }],
        recentBlogs: [{
            type: Schema.Types.ObjectId,
            ref: "Blog",
        }],

        tokens: [{
            token: {
                type: String,
                required: true,
            },
        }, ],

        socialLinks: {
            fb: {
                type: String
            },
            linkDin: {
                type: String
            },
            others: {
                type: String
            },
        },

        experience: [{
            workAt: {
                type: String,
                trim: true
            },
            description: {
                type: String
            },
            jobRole: {
                type: String
            },
            specialization: {
                type: String
            },
            duration: {
                type: String
            }
        }],

        avatar: {
            type: Buffer,
            default: ""
        },

        UserType: {
            type: Boolean
        },

        resume: {
            type: Buffer
        },


        batch: {
            type: Number,

            // required:true


        },

        phone: {
            type: Number,
        }
    },

    {
        timestamps: true,
    }
);

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({
        _id: user._id.toString()
    }, process.env.JWT_SECRET, {
        expiresIn: "30 days",
    });

    // doubt
    user.tokens = user.tokens.concat({
        token
    });
    await user.save();

    return token;
};

userSchema.methods.extractUser = function() {
    const user = this;
    const userObject = user.toObject(); // will give you just the raw object

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({
        email
    });

    if (!user) throw new Error("Unable to Login!");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Unable to Login!");

    return user;
};

// Hash the password
userSchema.pre("save", async function(next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;