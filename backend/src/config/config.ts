import mongoose from 'mongoose';

export const config = async () => {
    try{
        const db = mongoose.connect(`mongodb+srv://martinfresh8:qwertyuiop123@cluster0.1utcipc.mongodb.net/`)
        console.log(`Mongodb connected`)
    }catch(err){
        console.log(err)
    }
}