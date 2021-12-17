import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import {walletRouter} from "./routes/walletRouter";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/wallet", walletRouter);

app.listen(process.env.PORT, () => {
    console.log("Node server started running");
});