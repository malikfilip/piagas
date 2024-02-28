import express from 'express'
import userModel from '../models/user'
import serviceModel from '../models/service'
import appointmentModel from '../models/appointment'
import reportModel from '../models/report'

const nodeMailer = require('nodemailer');
const path = require('path')
const fs = require('fs')



export class PatientController {
    update = (req: express.Request, res: express.Response) => {
        userModel.findOneAndUpdate({ 'username': req.body.username }, {
            $set: {
                'lastname': req.body.lastname,'name':req.body.name, 'address' : req.body.address,
                'phone': req.body.phone, 'mail': req.body.mail, 'picture': req.body.picture
            }
        }, { new: true })
            .then((x) => { res.json(x) }).catch(err => { console.log(err) })
    }
    search = (req: express.Request, res: express.Response) => {
        userModel.find({
            'type': 'doctor', $and: [
                { 'name': { $regex: req.body.nameParam } },
                { 'lastname': { $regex: req.body.lastnameParam } },
                { 'room': { $regex: req.body.roomParam } },
                { 'spec': { $regex: req.body.specParam } }
            ]
        }).then(x => res.json(x)).catch(
            err => { console.log(err) }
        )
    }
    getDoc = (req: express.Request, res: express.Response) => {
        userModel.findOne({ 'username': req.body.username }).then(x => res.json(x)).catch(err => console.log(err));
    }
    getServices = (req: express.Request, res: express.Response) => {
        serviceModel.find({ 'doctor': req.body.doc }).then(x => { res.json(x) }).catch(err => console.log(err));
    }

    checkDate = (req: express.Request, res: express.Response) => {
        appointmentModel.find({ 'doctor': req.body.doctor }).then(x => res.json(x)).catch(err => console.log(err))
    }
    schedule = (req: express.Request, res: express.Response) => {
        let tmp = new appointmentModel({
            doctor: req.body.doctor,
            patient: req.body.patient,
            type: req.body.type,
            start: req.body.start,
            end: req.body.end,
            room: req.body.room,
            notification : false,
            report : false
        })
        tmp.save().then(() => res.json()).catch(err => console.log(err))
    }

    cancelAppointment = (req: express.Request, res: express.Response) => {
        appointmentModel.deleteOne({ _id: req.body.id }).then(() => res.json()).catch(err => console.log(err))
    }
    getReports = (req: express.Request, res: express.Response) => {
        reportModel.find({ patient: req.body.username }).then((x) => { res.json(x) }).catch(err => console.log(err))
    }

    join = (req: express.Request, res: express.Response) => {
        const joinData = reportModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'doctor',
                    foreignField: 'username',
                    as: 'result'
                }


            },{
                $match:{'patient':req.body.patient}
            }

        ]).then((x) => res.json(x))

    }
    getAppointments = (req: express.Request, res: express.Response) => {
        const joinData = appointmentModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'doctor',
                    foreignField: 'username',
                    as: 'result'
            }},
            
                {
                    $match:{'patient':req.body.patient,'start':{$gt:req.body.today}}
                }
        
        ]).then((x) => res.json(x))
    }

    sendMail = (req: express.Request, res: express.Response) => {

        sendMail(req.body.data, req.body.mail, req.body.qrcode).then(()=>res.json()).catch(e=>console.log(e))
    }

    upload = (req:express.Request,res:express.Response)=>{

        const pdf = req.body.pdf
        //console.log(dataUrl)

        const saveFolderPath = path.join(__dirname,'..','..','reports')
        const fileName = `Report-${Date.now()}.pdf`;
        const filePath = path.join(saveFolderPath, fileName);
        fs.writeFileSync(filePath, pdf, 'binary');

        console.log('pdf uploaded')

       res.json({'path': fileName});
    }

    read = (req:express.Request,res:express.Response)=>{
        
        let x = req.body.message;

        console.log(x)

        userModel.findOneAndUpdate({'username':req.body.username, "inbox.code":x.code},{
            $set:{"inbox.$.read":true}
        },{ new: true }).then((x)=>{res.json(x)}).catch(e=>console.log(e))
    }

    addMessage = (req:express.Request,res:express.Response)=>{
        
        let newMessage = {
            title : req.body.title,
            text : req.body.text,
            time : req.body.time,
            read: false,
            from : req.body.from,
            code:req.body.code
        }
        appointmentModel.updateOne({'_id':req.body.appointment},{$set : {'notification':true}}).then(()=>{
            userModel.findOneAndUpdate({'username':req.body.username},{$push : {'inbox':newMessage}},{new:true}).then(x=>res.json(x));
        })
    }
   
    

   

}

async function sendMail(data,mail,qr){
     

    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure : true,
        auth:{
            user: 'plhospital.noreply@gmail.com',
            pass : 'wnoyzziyvazoucia'
        }
    })

    const info = await transporter.sendMail({
        from: 'Premiere league hospital <plhospital.noreply@gmail.com>',
        to : 'mf200298d@gmail.com', //mail for testing purposes, missing / to : mail,
        subject: 'Report',
        html : `Click on the link to see your report overview | <a href="${data}">  Report  </a> 📝 `,
        attachments: [
            {
              filename: 'qrcode_report.jpg',
              content: qr.__zone_symbol__value.split("base64,")[1],
              encoding: 'base64'
            }
          ]
    })
    console.log('E-mail has been sent !')
}

