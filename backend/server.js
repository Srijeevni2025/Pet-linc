const mongoose = require("mongoose");
const app = require("./app.js");
const db = process.env.DATABASE_URL.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
console.log(db);

mongoose.connect(db).then(()=>console.log("Database got connected."));




app.listen(process.env.PORT, ()=>{
    console.log("server is running on port 4000")
})


