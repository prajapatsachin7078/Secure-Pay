import mongoose from 'mongoose';
import { config } from 'dotenv';
config();
export const connectDB = async()=>{

	try{
		await mongoose.connect(process.env.MONGO_URI);
		console.log("DB Connected successfully..!");
	}catch(err){
		console.log(err);
		console.log("DB couldn't connected..!");
	}
}

