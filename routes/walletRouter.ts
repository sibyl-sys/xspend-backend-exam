import express, {Request, Response} from "express";
import * as walletModel from "../models/wallet";
import {Wallet} from "../types/wallet";
const walletRouter = express.Router();

walletRouter.post("/create", async (req: Request, res: Response) => {
    const newWallet: Wallet = req.body;
    walletModel.create(newWallet, (err: Error, insertID: number) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }

        res.status(200).json({"insertID": insertID});
    })
});

walletRouter.get("/read/:wallet_address", async (req: Request, res: Response) => {
    walletModel.findWallet(req.params.wallet_address, (err: Error, wallet: Wallet) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }

        res.status(200).json({"balance": wallet.balance});
    })
});

walletRouter.put("/update/", async (req: Request, res: Response) => {
    const existingWallet: Wallet = req.body;
    walletModel.update(existingWallet, (err: Error, wallet: Wallet) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }

        res.status(200).send();
    })
});

walletRouter.delete("/delete/:wallet_address", async (req: Request, res: Response) => {
    walletModel.deleteWallet(req.params.wallet_address, (err: Error, wallet: Wallet) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }

        res.status(200).send();
    })
})

export {walletRouter};