const User =require('../model/user')
const Board=require('../model/Board')

const addMembers=async(req,res,next)=>{
    try {
        const { email } = req.body;
        const userId = req.userId;
    
        if (!email) {
          return res.status(400).json({ message: "Email is required" });
        }
    
        let board = await Board.findOne({ createdBy: userId });
    
        if (!board) {
          board = new Board({ createdBy: userId, members: [email] });
          await board.save();
          return res.status(200).json({ message: "Member added successfully", board });
        }
    
        if (board.members.includes(email)) {
          return res.status(409).json({ message: "Member already exists" });
        }
    
        board.members.push(email);
        await board.save();
    
        res.status(200).json({ message: "Member added successfully", board });
    }
    catch(error)
    {
        next(error)
    }
}
const getMembers=async(req,res,next)=>{
  try {
      const userId = req.userId;
  
      const people=await Board.find();

      return res.json({people});
  }
  catch(error)
  {
      next(error)
  }
}
module.exports={addMembers,getMembers}