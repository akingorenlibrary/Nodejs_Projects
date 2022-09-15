import mongoose from "mongoose";

const db_connect_function=()=>{
    mongoose.connect(process.env.DB_URL,{
    dbName:"lensligth",
    useNewUrlParser:true,
    useUnifiedTopology:true

    ,})
    .then(result=>{
    console.log("db connect success.");
    })
    .catch(err=>{
    console.log(err);
    });
}

export default db_connect_function;