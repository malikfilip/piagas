import express from 'express'
import { userController } from '../controllers/userController'
import { PatientController } from '../controllers/patientController';

const userRouter = express.Router();



userRouter.route('/login').post(
    (req,res)=> new userController().login(req,res)
)
userRouter.route('/register').post(
    (req,res)=> new userController().register(req,res)
)
userRouter.route('/display').post(
    (req,res)=> new userController().display(req,res)
)
userRouter.route('/change').post(
    (req,res)=>{new userController().changePassword(req,res)}
)
userRouter.route('/doctors').get(
    (req,res)=>new userController().getDoctors(req,res)
)
userRouter.route('/search').post(
    (req,res)=>new userController().search(req,res)
)



export default userRouter;