import mongoose from 'mongoose';

const fundSchema = new mongoose.Schema(
    {
      email:{
        type: String,
      },
      mobile:{
        type: String,
      },
      name:{
        type: String,
      },
      transactionid:{
        type: String,
      },
      amount:{
        type: Number,
      },
      bankname:{
        type: String,
      },
      accountnumber:{
        type: String,
      },
      mainupi:{
        type: String,
      },
      time:{
        type: Date,
        default: Date.now,
      },
      balance:{
        type: Number,
      },
      status:{
        type: Boolean,
      },
      referral:{
        type:String
      }

    }
);

export const Fund = mongoose.model("Fund", fundSchema);