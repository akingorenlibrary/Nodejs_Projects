import mongoose from "mongoose"

const dbConnection=()=>{
    mongoose.connect(process.env.DB_URL,{
        dbName:"appointment",
        useNewUrlParser:true,
        useUnifiedTopology:true

    })
    .then(()=>{
        console.log("Database succeded connect.")
    })
    .catch(err=>{
        console.log(err)
    })
}

export {dbConnection}