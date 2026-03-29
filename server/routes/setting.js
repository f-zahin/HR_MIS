import express from 'express'
import { ChangePasword } from '../Controllers/SettingController.js'
const router = express.Router()

router.put('/change-password',ChangePasword)

export default router