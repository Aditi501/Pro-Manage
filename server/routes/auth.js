const express=require('express')
const router=express.Router();
const authController =require('../controller/user')
const verifyToken =require('../middleware/verifyToken')
const boardController =require('../controller/Board')

router.post('/register',authController.registerUser)
router.post('/login',authController.loginUser)
router.post('/logout',authController.logoutUser)
router.patch('/update',verifyToken,authController.updateUser)
router.post('/addMember',verifyToken,boardController.addMembers);
router.get('/getMember',verifyToken,boardController.getMembers)

module.exports=router