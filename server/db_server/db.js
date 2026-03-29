import mongoose from "mongoose";


const connectToDatabaes =async ()=>{
    try{

        await mongoose.connect(process.env.MONGODB_URL)

    }catch(e){
            console.log(e)
    }

}

export default connectToDatabaes;