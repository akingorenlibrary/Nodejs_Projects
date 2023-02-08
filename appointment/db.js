import mongoose from 'mongoose';

const dbConnection=()=>{
    mongoose.connect(process.env.DB_URL,{
        dbName:"appointment",
        useNewUrlParser:true,
        useUnifiedTopology:true
        })
        .then(result=>{
            console.log("db connect success");
        })
        .catch(err=>{
            console.log(err);
        });
    
}

export {dbConnection};