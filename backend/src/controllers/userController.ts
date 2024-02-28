import express from 'express'
import userModel from '../models/user'
import reqModel from '../models/request'


export class userController {

    login = (req: express.Request, res: express.Response) => {
        userModel.findOne({ 'username': req.body.username, 'password': req.body.password })
            .then(x => { res.json(x) }).catch(err => { console.log(err) })
    }

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

                        let tmp = new reqModel({
                            'username': req.body.username,
                            'password': req.body.password,
                            'name': req.body.name,
                            'lastname': req.body.lastname,
                            'phone': req.body.phone,
                            'mail': req.body.mail,
                            'address': req.body.address,
                            'spec': null,
                            'room': null,
                            'licence': null,
                            'picture': req.body.picture ? req.body.picture : 'assets/default.jpg',
                            status: 'active',
                            type: 'pReg'
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
    display = (req: express.Request, res: express.Response) => {
        reqModel.findOne({ 'username': req.body.username }).then(x => res.json(x)).catch(err => console.log(err));
    }

    changePassword = (req: express.Request, res: express.Response) => {
        userModel.updateOne({ 'username': req.body.username }, { $set: { 'password': req.body.password } }).then(() => { res.json() }).catch(
            err => { console.log('Unexpected error occured.') }
        )
    }

    getDoctors = (req: express.Request, res: express.Response) => {
        userModel.find({'type': 'doctor'}).then(x=> res.json(x)).catch(
            err => { console.log('Unexpected error occured.') }
        )
    }
    search = (req: express.Request, res: express.Response) => {
        userModel.find({'type':'doctor', $and: [
            {'name':{$regex:req.body.nameParam}},
            {'lastname':{$regex:req.body.lastnameParam}},
            {'spec':{$regex:req.body.specParam}}
        ]}).then(x=>res.json(x)).catch(
            err => { console.log(err) }
        )
    }


}