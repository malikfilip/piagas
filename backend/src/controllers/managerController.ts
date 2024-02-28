import express from 'express'
import userModel from '../models/user'
import specModel from '../models/specialization'
import reqModel from '../models/request'
import appointmentModel from '../models/appointment'
import serviceModel from '../models/service'
import { error } from 'console'


export class ManagerController{
    getUsers = (req: express.Request, res: express.Response) => {
        userModel.find({'type': {$nin : ['manager','denied']}})
            .then(x => { res.json(x) }).catch(err => { console.log(err) })
    }

    getSpecs = (req: express.Request, res: express.Response) => {specModel.find({}).then(x=>res.json(x)).catch(e=>console.log(e))}

    register = (req: express.Request, res: express.Response) => {

        userModel.findOne({ 'mail': req.body.mail }).then((x) => {
            if (x) {
                userModel.findOne({ 'username': req.body.username }).then((x) => {
                    x ? res.json({
                        'errorMail': "E-mail already taken",
                        'errorUser': "Username already taken"
                    }) : res.json({
                        'errorMail': "E-mail already taken",
                        'errorUser': ""
                    })
                }).catch(err => { console.log('Unexpected error occured.') })
            }
            else {
                userModel.findOne({ 'username': req.body.username }).then((x) => {
                    if (x) res.json({
                        'errorMail': "",
                        'errorUser': "Username already taken"
                    })
                    else {

                        let tmp = new userModel({
                            'username': req.body.username,
                            'password': req.body.password,
                            'name': req.body.name,
                            'lastname': req.body.lastname,
                            'phone': req.body.phone,
                            'mail': req.body.mail,
                            'address': req.body.address,
                            'spec': req.body.spec,
                            'room': req.body.room,
                            'licence': req.body.licence,
                            'picture': req.body.picture ? req.body.picture : 'assets/default.jpg',
                            'inbox' : [],
                            'type' : 'doctor'
                        })
                        tmp.save().then(() => res.json({
                            'errorMail': "",
                            'errorUser': ""
                        })).catch(err => console.log('Unexpected error occured.'))


                    }
                }).catch(err => { console.log('Unexpected error occured.') })
            }
        }

        ).catch(err => { console.log('Unexpected error occured.') })

    }
    delete = (req: express.Request, res: express.Response) => {
        userModel.deleteOne({'username':req.body.username}).then(()=>{res.json()}).catch(e=>console.log(e))
    }

    getReq = (req: express.Request, res: express.Response) => {
        reqModel.find({'type':'pReg','status':'active'}).then(x=>res.json(x)).catch(e=>console.log(e))
    }

    acceptReq = (req: express.Request, res: express.Response) => {
        let tmp = new userModel({
            username:req.body.username,
            password : req.body.password,
            name:req.body.name,
            lastname:req.body.lastname,
            phone: req.body.phone,
            mail : req.body.mail,
            licence : null,
            spec:null,
            room:null,
            address : req.body.address,
            picture : req.body.picture,
            type: 'patient',
            inbox : [{
                "title": "Welcome",
                "text": "Welcome to the official web-site of imaginery hospital that is know by the name of Premiere League hospital, our team wishes you all the best and we are hoping that you will be able to get through these tough times with an ease. All the best,PLH team.",
                "time": req.body.date,
                "read": false,
                "from": "PLH Team",
                "code": req.body.code
              }]
        })
        tmp.save().then(()=>{
            reqModel.updateOne({'_id':req.body.id},{'status':'inactive'}).then(()=>res.json()).catch(e=>console.log(e))
        }).catch(e=>console.log(e))
    }

    decline = (req: express.Request, res: express.Response) => {
        let tmp = new userModel({
            username:req.body.username,
            mail:req.body.mail,
            type:'denied',
            password:null,
            name:null,
            lastname:null,
            phone:null,
            licence:null,
            spec:null,
            room:null,
            address:null,
            picture:null,
            inbox : null
        })
        tmp.save().then(()=>{
            reqModel.updateOne({'_id':req.body.id},{'status':'inactive'}).then(()=>res.json()).catch(e=>console.log(e))
        }).catch(e=>console.log(e))
    }

    branch = (req: express.Request, res: express.Response) => {
        reqModel.find({'type':'newBranch','status': 'active'}).then(x=>res.json(x)).catch(e=>console.log(e))
    }

    declineBranch = (req: express.Request, res: express.Response) => {
        reqModel.updateOne({'_id':req.body.id},{'status' : 'inactive'}).then(()=>{res.json()}).catch(e=>console.log(e))
    }

    acceptBranch = (req: express.Request, res: express.Response) => {
        let branch = {
            name: req.body.name,
            duration : req.body.duration,
            price: req.body.price
        }
        specModel.updateOne({'name':req.body.spec},{$push: {'branches' : branch}}).then(()=>{
            reqModel.updateOne({'_id':req.body.id},{'status':'inactivle'}).then(()=>res.json()).catch(e=>console.log(e))
        }).catch(e=>console.log(e))
    }

    getBranchList = (req: express.Request, res: express.Response) => {
        specModel.findOne({'name':req.body.name}).then(x=>res.json(x)).catch(e=>console.log(e))
    }

    specAdd = (req: express.Request, res: express.Response) => {
        let tmp = new specModel({
            name:req.body.name,
            branches:[]
        })
        tmp.save().then(()=>{res.json()}).catch(e=>console.log(e))
    }

    branchAdd = (req: express.Request, res: express.Response) => {
        let branch = {
            name: req.body.name,
            duration : req.body.duration,
            price: req.body.price
        }
        specModel.updateOne({'name':req.body.spec},{$push: {'branches' : branch}}).then(()=>res.json()).catch(e=>console.log(e))
    }

    branchEdit = (req: express.Request, res: express.Response) => {
        specModel.updateOne({'name':req.body.spec,'branches.name':req.body.branch},
        {$set:{'branches.$.price' : req.body.price ,
        'branches.$.duration':req.body.duration}}).then(()=>{
            if(req.body.send){
                appointmentModel.find({'type':req.body.branch,'start':{$gt:req.body.today}}).then(x=>{
                    x.forEach(app=>{

                        let message = {
                            "title" : 'Price changes !',
                            "text" : "Your upcoming appointment on " + app.start +" has changed its price to " + req.body.price+'$.',
                            "time" : req.body.today,
                            "read" : false,
                            'from' : "Manager Gianni",
                            "code" : "price."+app.doctor+Date.now()
                        }
                        console.log(app.patient)
                        userModel.updateOne({'username':app.patient},{$push: {'inbox' : message}}).then(()=>{}).catch(e=>console.log(e))
                    })

                    

                }).catch(e=>console.log(e))
            }
            res.json();
        }).catch(e=>console.log(e))
    }

    branchDelete = (req: express.Request, res: express.Response) => {
        console.log(req.body.spec,req.body.branch)
        specModel.updateOne({'name':req.body.spec},{$pull:{'branches':{name:req.body.branch}}}).then(()=>{
            serviceModel.deleteMany({'type':req.body.spec}).then(()=>res.json()).catch(e=>console.log(e))
        }).catch(e=>console.log(e))
    }

    action = (req: express.Request, res: express.Response) => {
        
        let message = {
           title: "New action is on !",
           text : "We are really pleased to inform you that our new action, " + req.body.action + " is active from now on !",
           time : req.body.today,
           read:false,
           from : "PLH Team",
           code : "action"+Date.now()
        }

        
        userModel.updateMany({'type':'patient'},{$push: {'inbox' : message}}).then(()=>{res.json()}).catch(e=>console.log(e))
    }
  

}