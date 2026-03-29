
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import connectToDatabaes from './db_server/db.js';
import departmentRoute  from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRoutes from './routes/salary.js';
import LeaveRouter  from './routes/leave.js';
import SettingRouter  from './routes/setting.js';
import dotenv from "dotenv";
dotenv.config();

connectToDatabaes()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))
app.use('/api/auth',authRouter)
app.use('/api/department',departmentRoute)
app.use('/api/employee',employeeRouter)
app.use('/api/salary',salaryRoutes)
app.use('/api/leave',LeaveRouter)
app.use('/api/setting',SettingRouter)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})