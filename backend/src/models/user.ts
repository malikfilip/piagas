import mongoose, { mongo } from "mongoose";

const sch = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    name: { type: String },
    lastname: { type: String },
    phone: { type: String },
    mail: { type: String },
    licence: { type: String },
    spec: { type: String },
    room: { type: String },
    type: { type: String },
    address: { type: String },
    picture : {type: Object},
    inbox : {type : Array}
})
export default mongoose.model('userModel',sch,'users');