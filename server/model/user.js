const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    createdTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  sharedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],

    
},
{timestamps: {createdAt: "createdAt", updatedAt:"updatedAt"}}
)
module.exports=mongoose.model("User",userSchema)