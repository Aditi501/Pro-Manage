const express=require('express');
require('dotenv').config();
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const authRoute=require('./routes/auth');
const taskRoute=require('./routes/task')
const port= process.env.PORT


const corsOptions = {
  origin:"*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Authorization','content-type','params',], }

app.use(cors(corsOptions));


app.use(express.json())

//app.use(cors())
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Database Connected"))
.catch((error)=>console.log(error))



app.get('/api/task',(req,res)=>{
    console.log("Project Task Manager working");
    res.json({
        service: "Project Task Manager Server working",
        status:"success",
        time: new Date()
    })
})



  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/task", taskRoute);

  app.use((error,req,res,next)=>{
    console.log(error)
    res.status(500).json({message:"Something went wrong"})
  })

app.listen(port, () => {
    console.log(`Backend server running at port ${port}`);
  });