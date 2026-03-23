import usermodel from "../models/usermodel.js";
export const getUserData = async (req,res)=>{
    try{
   const {userId} = req.body;
    const user = await usermodel.findById(userId);
    if(!user){
        return res.json({sucess: false, message:'user not found'});

    } res.json({
        success: true,
        getUserData:{
            name: user.name,
            isAccountVerified: user.isAccountVerified
        } 
    });

    } catch(error){
        res.json({sucess:false , message:
    error.message
        });
    }
}