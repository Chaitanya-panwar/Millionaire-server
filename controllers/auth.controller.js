import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
	sendPasswordResetEmail,
	sendResetSuccessEmail,
	sendVerificationEmail,
	sendWelcomeEmail,
} from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";
import { Fund } from "../models/fund.model.js";
import { Withdrawal } from "../models/withdrawal.model.js";

export const signup = async (req, res) => {
	const { email, password, name, mobile,referral,telegram,instagram,whatsapp,bankname,accountnumber,ifsccode,verifiedname,upiid,balance,myreferral,referralincome,totalbalance,dailyincome } = req.body;

	try {
		if (!email || !password || !name ||!mobile) {
			throw new Error("All fields are required");
		}

		const userAlreadyExists = await User.findOne({ email });
		console.log("userAlreadyExists", userAlreadyExists);

		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		const user = new User({
			email,
			password: hashedPassword,
			name,
			mobile,
			telegram,
			instagram,
			whatsapp,
			bankname,
			accountnumber,
			ifsccode,
			verifiedname,
			upiid,
			verificationToken,
			referral,
			balance,
			myreferral,
			referralincome,
			totalbalance,
			dailyincome,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
		});

		await user.save();

		// jwt
		generateTokenAndSetCookie(res, user._id);
		

		await sendVerificationEmail(user.email, verificationToken);

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};


export const addfund = async (req, res) => {
	const { email, amount, name, mobile,transactionid,balance,status,bankname,accountnumber,mainupi,referral } = req.body;
	try {
		const fund = new Fund({
			email,
			name,
			mobile,
			transactionid,
			amount,
			balance,
			bankname,
			accountnumber,
            mainupi,
			status,
			referral
		});
		await fund.save();
		res.status(201).json({
			success: true,
			message: "Add fund successfully",
			user: {
				...fund._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export const addwithdrawal = async (req,res) =>{
   const {email,amount,name,mobile,upiid,balance,status,bankname,accountnumber,mainupi} = req.body;
   try{
	  const withdrawal = new Withdrawal({
		  email,
		  name,
		  mobile,
		  upiid,
		  amount,
		  balance,
		  status,
		  bankname,
		  accountnumber,
		  mainupi
	  });
	  await withdrawal.save();
	  res.status(201).json({
		success: true,
		message: "Add withdrawal successfully",
			user: {
				...withdrawal._doc,
				password: undefined,
			},
	  });
   } catch (error) {
	res.status(400).json({success: false, message: error.message});
   }

}

export const getFund = async (req,res)=>{
	
	try {
        const Funds = await Fund.find();
		
        res.json(Funds);
    } catch (err) {
        res.status(500).send(err);
    }
}

export const getWithdrawal = async (req,res) =>{
	try {
		const withdrawal = await Withdrawal.find();

		res.json(withdrawal);
	} catch(err) {
		res.status(500).send(err);
	}
}

export const updateInfo = async (req,res) => {
   try{
	  const { id } = req.params
	  const user = await User.findByIdAndUpdate(
		{_id:id}, req.body, {
			new: true,
		    runValidators: true,
		}
	  );

	  if (!user) {
		return res.status(400).json({ success: false, message: "User doesn't Exist" });
	}
	  res.status(200).json(user)
   }
   catch (error){
	res.status(500).json({msg: error.message})
   }

}

export const deleteFund = async (req,res) =>{
   
	try{
		const {id} = req.params
		const fund = await Fund.findByIdAndDelete(id)
		res.status(200).json(fund)
	}  catch (error){
		res.status(500).json({msg: error.message})
	   }
	
}

export const updateFund = async (req,res) => {
	try{
	   const { id } = req.params
	   const fund = await Fund.findByIdAndUpdate(
		 {_id:id}, req.body, {
			 new: true,
			 runValidators: true,
		 }
	   );
 
	   if (!fund) {
		 return res.status(400).json({ success: false, message: "Fund doesn't Exist" });
	 }
	   res.status(200).json(fund)
	}
	catch (error){
	 res.status(500).json({msg: error.message})
	}
 
 }
export const updateWithdrawal = async (req,res) => {
	try{
	   const { id } = req.params
	   const withdrawal = await Withdrawal.findByIdAndUpdate(
		 {_id:id}, req.body, {
			 new: true,
			 runValidators: true,
		 }
	   );
 
	   if (!withdrawal) {
		 return res.status(400).json({ success: false, message: "Fund doesn't Exist" });
	 }
	   res.status(200).json(withdrawal)
	}
	catch (error){
	 res.status(500).json({msg: error.message})
	}
 
 }

export const deleteWithdrawal = async (req,res) =>{
   
	try{
		const {id} = req.params
		const withdrawal = await Withdrawal.findByIdAndDelete(id)
		res.status(200).json(withdrawal)
	}  catch (error){
		res.status(500).json({msg: error.message})
	   }
	
}
export const getInfo = async (req,res)=>{
	
	try {
        const Users = await User.find();
		
        res.json(Users);
    } catch (err) {
        res.status(500).send(err);
    }
}

export const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

	

		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");             
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};
