import mongoose from 'mongoose';

const withdrawalSchema = new mongoose.Schema(
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
      upiid:{
        type: String,
      },
      amount:{
        type: Number,
      },
      balance:{
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
       status:{
        type: Boolean,
      },
    }
);

export const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);