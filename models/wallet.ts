import {Wallet} from "../types/wallet";
import {db} from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (wallet: Wallet, callback: Function) => {
    const queryString = "INSERT INTO Wallet (wallet_address, balance) VALUES (?, ?)"
  
    db.query(
      queryString,
      [wallet.wallet_address, wallet.balance],
      (err, result) => {
        if (err) {callback(err)};
  
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
  };

  export const findWallet = (wallet_address: string, callback: Function) => {
    const queryString = "SELECT * FROM Wallet WHERE wallet_address=?"

    db.query(queryString, wallet_address, (err, result) => {
        if(err) {callback(err)}

        const row = (<RowDataPacket> result)[0];
        const wallet: Wallet = {
            wallet_address: row.wallet_address,
            balance: row.balance
        }
        callback(null, wallet);
    })
  }