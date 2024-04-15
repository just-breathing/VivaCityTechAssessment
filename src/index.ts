import express, { Express } from "express";
import router from "./Routes/routes";
import dotenv from 'dotenv';

dotenv.config();

const PORT: number = parseInt(process.env.PORT || "5100"); 

const Server = ():Express=>{
const app: Express = express();
app.use(express.json());
app.use("/awesome", router);
return app
}
const app = Server();

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
export default Server;
