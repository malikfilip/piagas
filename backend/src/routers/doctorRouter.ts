import express from 'express'
import { DoctorController } from '../controllers/doctorController'

const doctorRouter = express.Router();

doctorRouter.route('/update').post(
    (req,res)=> new DoctorController().update(req,res)
)
doctorRouter.route('/spec').post(
    (req,res)=> new DoctorController().getSpec(req,res)
)
doctorRouter.route('/active').post(
    (req,res) => new DoctorController().getActive(req,res)
)
doctorRouter.route('/addService').post(
    (req,res) => new DoctorController().addService(req,res)
)
doctorRouter.route('/removeService').post(
    (req,res) => new DoctorController().removeService(req,res)
)
doctorRouter.route('/appointments').post(
    (req,res)=> new DoctorController().getAppointments(req,res)
)
doctorRouter.route('/cancel').post(
    (req,res)=> new DoctorController().cancelAppointment(req,res)
)
doctorRouter.route('/doctor').post(
    (req,res)=> new DoctorController().getDoctor(req,res)
)
doctorRouter.route('/finished').post(
    (req,res)=> new DoctorController().getFinishedApp(req,res)
)
doctorRouter.route('/report').post(
    (req,res)=> new DoctorController().addReport(req,res)
)
doctorRouter.route('/break').post(
    (req,res)=> new DoctorController().addBreak(req,res)
)
doctorRouter.route('/branch').post(
    (req,res)=> new DoctorController().addBranch(req,res)
)


export default doctorRouter;