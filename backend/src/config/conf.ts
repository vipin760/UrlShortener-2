import { ConnectOptions, connect } from "mongoose";



export const dbConnect = () =>{
    try {
        connect(process.env.mongoURI!,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        } as ConnectOptions).then(()=>{
            console.log("database connected......");
        })
    } catch (error) {
        console.log("database error");
    }
}