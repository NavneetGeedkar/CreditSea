import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    amount : {
      type : String,
      required : true,
    },
    tenure : {
      type : String,
      required : true,
    },
    address: {
      type : String,
      required : true,
    },
    employementStatus: {
      type : String,
      require : true,
    },
    employementAddress : {
      type : String,
      require : true,
    },
    submissionDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type : "String",
      default : 'Pending'
    }

});

export const Form = mongoose.model('Form', formSchema);