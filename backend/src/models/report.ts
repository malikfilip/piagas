import mongoose, { mongo } from "mongoose";

const sch = new mongoose.Schema({
    date : { type: String },
    doctor: { type: String },
    patient : {type:String},
    spec : { type: String },
    type: { type: String },
    diagnosis : { type: String },
    therapy : { type: String },
    control : { type: String }
    
})
export default mongoose.model('reportModel',sch,'reports');