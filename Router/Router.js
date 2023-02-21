const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/UserController')
const PersonController = require('../Controllers/PersonController')
const LoginAccess = require('../Middlewares/AuthMiddleware')


router.post('/signin', UserController.GetUser)
router.post('/signup', UserController.AddUser)

router.get('/user/list', LoginAccess, PersonController.getPersonDetails)
router.post('/user/add', LoginAccess, PersonController.addPersonDetails)
router.delete('/user/delete/:id', LoginAccess, PersonController.deletePersonDetails)
router.put('/user/update/:id', LoginAccess, PersonController.updatePersonDetails)

module.exports = router;