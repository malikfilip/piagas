import mongoose, { mongo } from "mongoose";

const sch = new mongoose.Schema({
    doctor: { type: String },
    patient : {type:String},
    type: { type: String },
    start: {type:String},
    end: {type:String},
    room : {type:String},
    notification : {type:Boolean},
    report : {type:Boolean}
    
})
export default mongoose.model('appointmentModel',sch,'appointments');