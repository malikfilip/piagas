import express from 'express'
import userModel from '../models/user'
import specModel from '../models/specialization'
import serviceModel from '../models/service'
import appointmentModel from '../models/appointment'
import reportModel from '../models/report'
import reqModel from '../models/request'

export class DoctorController {

    update = (req: express.Request, res: express.Response) => {
        userModel.findOneAndUpdate({ 'username': req.body.username }, {
            $set: {
                'name': req.body.name,
                'lastname': req.body.lastname,
                'phone': req.body.phone,
                'picture': req.body.picture,
                'spec': req.body.spec,
                'licence': req.body.licence,
                'address': req.body.address,
                'mail':req.body.mail
            }
        }, { new: true })
            .then((x) => { res.json(x) }).catch(err => { console.log(err) })
    }

    getSpec = (req: express.Request, res: express.Response) => {
        specModel.findOne({ 'name': req.body.spec }, { branches: 1 }).then(x => { res.json(x) }).catch(e => console.log(e))
    }

    getActive = (req: express.Request, res: express.Response) => {
        serviceModel.aggregate([
            {
                $match:{'doctor':req.body.doctor}
            },
            {
                $project: {
                    _id:0,
                    type: 1
                }
            }

        ]).then(x=>res.json(x)).catch(e=>console.log(e))
    }

    addService = (req: express.Request, res: express.Response) => {
        let service = new serviceModel({
            doctor:req.body.doctor,
            type:req.body.type,
            duration : req.body.duration,
            price:req.body.price
        })
        service.save().then(()=>{res.json()}).catch(e=>console.log(e))
    }

    removeService = (req: express.Request, res: express.Response) => {
        serviceModel.deleteOne({'doctor':req.body.doctor,'type':req.body.type,
    }).then(()=>{res.json()}).catch(e=>console.log(e))
    
    }

    getAppointments = (req: express.Request, res: express.Response) => {
        appointmentModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'patient',
                    foreignField: 'username',
                    as: 'result'
                }


            },{
                $match:{'doctor':req.body.doctor,start:{$gt:req.body.today},'patient': { $ne: req.body.doctor }}
                
            }

        ]).then((x) => res.json(x))
    }

    cancelAppointment = (req: express.Request, res: express.Response) => {
        appointmentModel.deleteOne({'patient' : req.body.patient, 'doctor' : req.body.doctor}).then(()=>res.json()).catch(e=>console.log(e));
    }

    getDoctor = (req: express.Request, res: express.Response) => {
        userModel.findOne({'username': req.body.doctor}).then(x=>res.json(x)).catch(e=>console.log(e))
    }

    getFinishedApp = (req: express.Request, res: express.Response) => {
        appointmentModel.find({'patient':req.body.patient,'doctor':req.body.doctor,'start':{$lt:req.body.today},'report':false}).then(x=>res.json(x)).catch(e=>console.log(e))
    }

    addReport = (req: express.Request, res: express.Response) => {
        let rep = new reportModel({
            date : req.body.date,
            patient: req.body.patient,
            doctor : req.body.doctor,
            spec : req.body.spec,
            type:req.body.type,
            diagnosis: req.body.diagnosis,
            therapy: req.body.therapy,
            control : req.body.control
        })
        rep.save().then(()=>{
            appointmentModel.findOneAndUpdate({'_id':req.body.id},{$set:{'report':true}},{new:true}).then(()=>res.json()).catch(e=>console.log(e))
        }).catch(e=>console.log(e))
    }

    addBranch = (req: express.Request, res: express.Response) => {
        let tmp = new reqModel({
            username:req.body.doctor,
            password:null,
            name : req.body.name,
            lastname:null,
            phone:null,
            mail:null,
            licence:null,
            spec: req.body.spec,
            room:null,
            type:'newBranch',
            address:null,
            picture:null,
            status:'active',
            duration : req.body.duration,
            price:req.body.price


        })
        tmp.save().then(()=>res.json()).catch(e=>console.log(e))
    }

    addBreak = (req: express.Request, res: express.Response)=>{
        let tmp = new appointmentModel({
            doctor : req.body.doctor,
            patient:req.body.doctor,
            type: 'Day free / vacation',
            start : req.body.start,
            end:req.body.end,
            room : null,
            notification : null,
            report : null

        })
        tmp.save().then(()=>res.json()).catch(e=>console.log(e))
    }
}