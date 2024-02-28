import mongoose, { mongo } from "mongoose";

const sch = new mongoose.Schema({
    doctor: { type: String },
    type: { type: String },
    duration : {type: Number},
    price : {type: Number}
})
export default mongoose.model('serviceModel',sch,'services');