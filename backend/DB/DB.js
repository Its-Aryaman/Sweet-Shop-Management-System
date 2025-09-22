import mongoose from "mongoose";

const connectDb = async() =>{
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://${process.env.DbUserName}:${process.env.DbPassword}@cluster0.bb2jtyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

        console.log(`Db Connected! \n ${connectionInstance.connection.host}`);
        
    } catch (error) {
            console.log(error);
            process.exit(1);
        
    }
}

export default connectDb;