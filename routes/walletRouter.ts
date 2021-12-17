import express, {Request, Response} from "express";
import * as walletModel from "../models/wallet";
import {Wallet} from "../types/wallet";
const walletRouter = express.Router();

walletRouter.post("/wallet/create", async (req: Request, res: Response) => {
    const newWallet: Wallet = req.body;
    walletModel.create(newWallet, (err: Error, insertID: number) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }

        res.status(200).json({"insertID": insertID});
    })
});

export {walletRouter};