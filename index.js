const express = require("express");
const router = require("./Routes/routes")
const app = express();
const PORT = process.env.PORT||5100;
app.use(express.json())
app.use("/awesome",router)

module.exports = app; 

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})

