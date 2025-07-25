import mongoose from "mongoose";

const  connectDB = async () => {
    mongoose.connection.on("connected",()=>{
        console.log(`MongoDB Connected`);
    })
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.error(err);
    }
}
export  default connectDB;


