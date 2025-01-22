import dotenv from "dotenv";
dotenv.config({ path: '.env.development' });
import express from "express";
import router from "./routes/index.js";
const app = express();
app.use(express.json());
//db connection--------------------------------------------
import db from "./models/index.js";
db.sequelize.sync({ alter: true })
    .then((data) => {
    console.log("All Tables are created successfully");
})
    .catch((err) => {
    console.log("----------------------- ", err);
    console.log("error in creation of tables");
});
db.sequelize.authenticate()
    .then((data) => {
    console.log("database is connected");
})
    .catch((err) => {
    console.log("[[[[[[[[[[[ ", err);
    console.log("error in database connection");
});
//server routes--------------------------------------------
app.use(router);
//server is running...
app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
