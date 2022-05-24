import * as express from 'express'
import userController from '../controllers/user.controllers'

export const router = express.Router()

router.post('/user', userController.createUser)
router.delete('/user', userController.deleteUser)
router.get('/user_:id', userController.getOneUser)
router.get(
  '/user/private_messages/:id&:type',
  userController.getPrivateMessages,
)
router.get('/user', userController.getUserS)
router.put('/user', userController.updateUser)
