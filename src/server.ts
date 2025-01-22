import dotenv,{ config} from "dotenv";
import cors from "cors";
dotenv.config({ path: '.env.development'});
import express, { Request, Response} from "express";
import router from "./routes/index.js";
const app = express();

app.use(express.json());
app.use(cors({
    origin:"*",
}));




//db connection--------------------------------------------

import db from "./models/index.js";
import { User } from "./models/user.model.js";

db.sequelize.sync({ alter: true})
.then((data)=>{
    console.log("All Tables are created successfully");
})
.catch((err)=>{
    console.log("----------------------- ",err);
    console.log("error in creation of tables");
})



db.sequelize.authenticate()
.then((data)=>{
    console.log("database is connected");
})
.catch((err)=>{
    console.log("[[[[[[[[[[[ ",err);
    console.log("error in database connection");
})


//server routes--------------------------------------------

app.use(router);


//server is running...
app.listen( process.env.PORT || 3000, ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
    
})
