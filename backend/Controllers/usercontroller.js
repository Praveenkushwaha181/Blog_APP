import usermodel from "../Models/usermodel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


const signUp = async (req, res) => {
    try {
        let {name,email,password} = req.body;  //object
        if(!name || !email || !password){
            return res.status(400).send({status:"failed",message:"All fields are required"});
        }
        let registeredUser = await usermodel.findOne({email:email});
        if(!registeredUser){
        const hashedPassword = await bcrypt.hash(password,10);
        const createUser = await usermodel.create({ name, email, password: hashedPassword });
        return res.status(201).send({status:"OK",message:"user registered successfully" ,data:createUser})
        }else{
            return res.status(400).send({status:"failed",message:"user already exists"})
        }

    } catch (error) {
        res.status(500).send({status:"failed",error, message:error.message})
    }
}

const login = async (req,res)=>{
   try {
        const{email,password} = req.body;
        if(!email || !password){
            return res.status(400).send({status:"failed",message:"All fields are required"});
        }
        const user = await usermodel.findOne({email:email});
        if(!user){
            return res.status(400).send({status:"failed",message:"user not found"})
        }
        let hashcode = user.password;
        let check = await bcrypt.compare(password,hashcode)
        if(!check){
            return res.status(400).send({status:"failed",message:"wrong password"})
        }
        const token = jwt.sign( {userId: user._id } ,process.env.JWT_SECRET, { expiresIn: "7d" });
        if(!token){
            return res.status(400).send({status:"failed",message:"token not generated"})
        }
        return res.status(200).send({status:"OK",message:"logged in succesfully",token:token ,user:{name:user.name,email:user.email}})
   } catch (error) {
        res.status(500).send({status:"failed",error})
   }
}



export {signUp,login}