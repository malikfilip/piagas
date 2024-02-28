import express from 'express'
import { ManagerController } from '../controllers/managerController'


const managerRouter = express.Router();

managerRouter.route('/users').get(
    (req,res)=> new ManagerController().getUsers(req,res)
)
managerRouter.route('/spec').get(
    (req,res)=> new ManagerController().getSpecs(req,res)
)
managerRouter.route('/register').post(
    (req,res)=> new ManagerController().register(req,res)
)
managerRouter.route('/delete').post(
    (req,res)=> new ManagerController().delete(req,res)
)
managerRouter.route('/req').get(
    (req,res)=> new ManagerController().getReq(req,res)
)
managerRouter.route('/accept').post(
    (req,res)=> new ManagerController().acceptReq(req,res)
)
managerRouter.route('/decline').post(
    (req,res)=> new ManagerController().decline(req,res)
)

managerRouter.route('/branch').get(
    (req,res)=> new ManagerController().branch(req,res)
)
managerRouter.route('/declineBranch').post(
    (req,res)=> new ManagerController().declineBranch(req,res)
)

managerRouter.route('/acceptBranch').post(
    (req,res)=> new ManagerController().acceptBranch(req,res)
)

managerRouter.route('/branchList').post(
    (req,res)=> new ManagerController().getBranchList(req,res)
)
managerRouter.route('/specAdd').post(
    (req,res)=> new ManagerController().specAdd(req,res)
)
managerRouter.route('/branchAdd').post(
    (req,res)=> new ManagerController().branchAdd(req,res)
)

managerRouter.route('/branchEdit').post(
    (req,res)=> new ManagerController().branchEdit(req,res)
)

managerRouter.route('/branchDelete').post(
    (req,res)=> new ManagerController().branchDelete(req,res)
)
managerRouter.route('/action').post(
    (req,res)=> new ManagerController().action(req,res)
)



export default managerRouter;
