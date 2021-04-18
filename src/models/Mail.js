const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mailSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		validator(value){
			if(!validator.isEmail(value))
				throw new Error('Invalid email')
		}
	},
	subject:{
		type:String,
		required:true
	},
	message:{
		type:String,
		required:true
	}
});

const Mail = new mongoose.model('Mail',mailSchema);

module.exports = Mail;