import mongoose from "mongoose";

const HeroModel = new mongoose.Schema({
    image : Array
})
const Hero = mongoose.model("Hero" , HeroModel)
export default Hero;