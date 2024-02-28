import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/loginRouter';
import patientRouter from './routers/patientRouter';
import doctorRouter from './routers/doctorRouter';
import managerRouter from './routers/managerRouter';


const app = express();

const path = require('path');
const bodyParser = require('body-parser')

app.use('/reports', express.static(path.join(__dirname, '..', 'reports')));

app.use(bodyParser({limit: '1mb'}));



app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/hospital');
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Welcome to Premiere league hospital data base :)")
})



const mainRouter = express.Router();
mainRouter.use('/user',userRouter);
mainRouter.use('/patient',patientRouter);
mainRouter.use('/doctor',doctorRouter);
mainRouter.use('/manager',managerRouter)


app.use('/', mainRouter);
app.listen(4000, () => console.log(`Express server running on port 4000`));