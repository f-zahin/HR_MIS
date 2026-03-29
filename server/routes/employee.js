import express from 'express';
import { AddEmployee ,getEmployees,upload,getEmployee,UpdateEmploye,fetchEmployeesByDepId} from '../Controllers/EmployeeController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router()


router.post('/add',upload.single('image'),AddEmployee)
router.get('/',getEmployees)
router.get('/:id',getEmployee)
router.put('/:id',UpdateEmploye)
router.get('/department/:id',fetchEmployeesByDepId)
export default router