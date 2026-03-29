import express from 'express'
import authMiddleware  from '../middleware/authMiddleware.js';
import { addDepartment ,getDepartments,getDepartment,updateDepartment,delteDepartment} from '../Controllers/departmentController.js';
const router = express.Router()

router.get('/',getDepartments)
router.get('/:id',getDepartment)
router.post('/add',addDepartment)
router.put('/:id',updateDepartment)
router.delete('/:id',delteDepartment)

export default router