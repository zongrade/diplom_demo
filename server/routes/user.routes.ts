import * as express from 'express'
import userController from '../controllers/user.controllers'

export const router = express.Router()

router.post('/user', userController.createUser)
router.delete('/user', userController.deleteUser)
router.get('/user:id', userController.getOneUser)
router.get('/user', userController.getUserS)
router.put('/user', userController.updateUser)
