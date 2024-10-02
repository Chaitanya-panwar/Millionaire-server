import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},

		name: {
			type: String,
			required: true,
		},

		telegram: {
			type: String,
			
		},

		instagram: {
			type: String,
			
		},

		whatsapp: {
			type: String,
			
		},

		bankname: {
			type: String,
			
		},

		accountnumber: {
			type: String,
			
		},

		ifsccode: {
			type: String,
			
		},

		verifiedname: {
			type: String,
			
		},

		upiid: {
			type: String,
			
		},

		balance:{
          type: Number,
		},
		totalbalance:{
			type:Number,
		},
		dailyincome:{
			type:Number,
		},

		mobile: {
			type: String,
			required: true,
		},

		referral: {
			type: String,
			required: true,
		},
        referralincome:{
            type: Number,
		},
		myreferral:{
            type: String,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},

		isVerified: {
			type: Boolean,
			default: false,
		},
		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);

