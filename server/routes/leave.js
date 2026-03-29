import express from 'express'
import {addLeave , getLeaves , getAllLeaves,getLeaveDetial,updateLeave} from '../Controllers/LeaveController.js'
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router()

router.post('/add', addLeave)
router.get('/:id',getLeaves)
router.get('/',getAllLeaves)
router.get('/detial/:id',getLeaveDetial)
router.put('/:id',updateLeave)
export default router