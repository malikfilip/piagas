import mongoose, { mongo } from "mongoose";

const sch = new mongoose.Schema({
    name: { type: String },
    branches: {type:Array}
})
export default mongoose.model('specModel',sch,'specializations');