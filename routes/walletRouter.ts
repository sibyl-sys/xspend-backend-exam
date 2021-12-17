import express, {Request, Response} from "express";
import * as walletModel from "../models/wallet";
import {Wallet} from "../types/wallet";
const walletRouter = express.Router();
const Web3 = require('web3');

walletRouter.post("/create", async (req: Request, res: Response) => {
    const newWallet: Wallet = req.body;
    if(Web3.utils.isAddress(newWallet.wallet_address)) {
        walletModel.create(newWallet, (err: Error, insertID: number) => {
            if (err) {
                return res.status(500).json({"message": err.message});
            }
    
            res.status(200).json({"insertID": insertID});
        })
    } else {
        res.status(500).json({"message": "Invalid wallet address"});
    }
});

walletRouter.get("/read/:wallet_address", async (req: Request, res: Response) => {
    if(Web3.utils.isAddress(req.params.wallet_address)) {
        walletModel.findWallet(req.params.wallet_address, (err: Error, wallet: Wallet) => {
            if (err) {
                return res.status(500).json({"message": err.message});
            }

            res.status(200).json({"balance": wallet.balance});
        })
    } else {
        res.status(500).json({"message": "Invalid wallet address"});
    }
});

walletRouter.put("/update/", async (req: Request, res: Response) => {
    const existingWallet: Wallet = req.body;
    if(Web3.utils.isAddress(existingWallet.wallet_address)) {
        walletModel.update(existingWallet, (err: Error, wallet: Wallet) => {
            if (err) {
                return res.status(500).json({"message": err.message});
            }

            res.status(200).send();
        })
    } else {
        res.status(500).json({"message": "Invalid wallet address"});
    }
});

walletRouter.delete("/delete/:wallet_address", async (req: Request, res: Response) => {
    if(Web3.utils.isAddress(req.params.wallet_address)) {
        walletModel.deleteWallet(req.params.wallet_address, (err: Error, wallet: Wallet) => {
            if (err) {
                return res.status(500).json({"message": err.message});
            }

            res.status(200).send();
        })
    } else {
        res.status(500).json({"message": "Invalid wallet address"});
    }
})

export {walletRouter};