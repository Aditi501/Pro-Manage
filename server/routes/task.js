const express=require('express')
const router=express.Router();
const taskController =require('../controller/task')
const verifyToken =require('../middleware/verifyToken')

router.post('/create',verifyToken,taskController.createTask);
router.get('/get/:id',taskController.getTask);
router.put('/update/:id',verifyToken,taskController.updateTask);
router.delete('/delete/:id',verifyToken,taskController.deleteTask);
router.get('/getTasks',verifyToken,taskController.getTasks);
router.get('/filter',verifyToken, taskController.filterTasks);
router.put('/status/:id',verifyToken,taskController.updateTaskStatus);
router.get('/total',verifyToken,taskController.getTaskCounts)
module.exports=router