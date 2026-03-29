import express from 'express'
import { AddSalary, getSalary } from '../Controllers/SalaryController.js'
const router = express.Router()

router.post('/add',AddSalary)
router.get('/:id',getSalary)

export default router