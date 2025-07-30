import mongoose from "mongoose";

const startupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String, 
    required: true,
  },
  founder: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true});

const Startup = mongoose.model("Startup", startupSchema);
export default Startup;