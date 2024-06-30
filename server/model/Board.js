const mongoose=require('mongoose')

const boardSchema= new mongoose.Schema({
    members:[{
        type: String,
        required: true,
    }], 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},   
},
{timestamps: {createdAt: "createdAt", updatedAt:"updatedAt"}}
)
module.exports=mongoose.model("Board",boardSchema)