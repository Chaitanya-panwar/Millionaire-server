import { transporter } from "../Nodemailer/mailer.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"
import dotenv from "dotenv";

dotenv.config()

export const sendVerificationEmail = async (email, verificationToken) =>{
   

    try{
        const response = await transporter.sendMail({
            from:process.env.EMAIL,
            to: email,
            subject:"Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        })

        console.log("Email sent successfully", response)
    }
    catch(error){
        console.error(`Error sending verification` , error)
        throw new Error(`Error sending verification email: ${error}` )
    }
}
export const sendVerificationEmail1 = async (email, verificationToken) =>{
   

    try{
        const response = await transporter.sendMail({
            from:process.env.EMAIL,
            to: recipient,
            subject:"Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        })

        console.log("Email sent successfully", response)
    }
    catch(error){
        console.error(`Error sending verification` , error)
        throw new Error(`Error sending verification email: ${error}` )
    }
}

export const sendWelcomeEmail = async (email,name) => {
    const recipient = [{ email}];

    try{
        const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            template_uuid: "1e4a3ba5-3ba7-41ba-98fc-a049addb375f",
            template_variables:{
                company_info_name: "Millionaire Club",
                name: name,
            }
        });
        console.log("Welcome Email sent successfully", response);
    }
    catch (error) {
       console.log('Error sending welcome email',error);

       throw new Error(`Error sending welcome email: ${error}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) =>{
    

    try{
        const response = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject:"Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
          
        })
    } catch(error){
        console.Error('Error sending password reset email', error);

        throw new Error(`Error sending password reset email: ${error}`);
    }
}

export const sendResetSuccessEmail  = async (email) =>{
   

    try{
        const response = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset successfull",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
           
        });
        console.log("Password reset email sent successfully", response);

    }
    catch(error){
        console.error(`Error sending password reset success email`, error);

        throw new Error(`Error sending password reset success email: ${error}`);
    }
}