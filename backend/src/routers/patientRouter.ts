import express from 'express'
import { PatientController } from '../controllers/patientController';

const patientRouter = express.Router();




patientRouter.route('/update').post(
    (req,res)=> new PatientController().update(req,res)
)
patientRouter.route('/search').post(
    (req,res)=> new PatientController().search(req,res)
)
patientRouter.route('/doctor').post(
    (req,res)=> new PatientController().getDoc(req,res)
)
patientRouter.route('/service').post(
    (req,res)=>new PatientController().getServices(req,res)
)
patientRouter.route('/check').post(
    (req,res)=>new PatientController().checkDate(req,res)
)
patientRouter.route('/schedule').post(
    (req,res)=>new PatientController().schedule(req,res)
)
patientRouter.route('/appointments').post(
    (req,res)=>new PatientController().getAppointments(req,res)
)
patientRouter.route('/cancel').post(
    (req,res) => new PatientController().cancelAppointment(req,res)
)
patientRouter.route('/reports').post(
    (req,res) => new PatientController().getReports(req,res)
)
patientRouter.route('/join').post(
    (req,res)=> new PatientController().join(req,res)
)
patientRouter.route('/mail').post(
    (req,res)=> {
        new PatientController().sendMail(req,res)
    }
)
patientRouter.route('/upload').post(
    (req,res)=>new PatientController().upload(req,res)
)
patientRouter.route('/read').post(
    (req,res)=>new PatientController().read(req,res)
)
patientRouter.route('/add').post(
    (req,res)=>new PatientController().addMessage(req,res)
)




export default patientRouter;