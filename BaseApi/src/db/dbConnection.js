const mongoose=require("mongoose");
mongoose.connect(process.env.DB_URL,{
    dbName:"Proje3",
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Database is success connected.");
})
.catch(error=>{
    console.log(error);
});