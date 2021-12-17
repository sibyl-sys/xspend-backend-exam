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
        if(row) {
            const wallet: Wallet = {
                wallet_address: row.wallet_address,
                balance: row.balance
            }
            callback(null, wallet);
        }
    })
  }

  export const update = (wallet: Wallet, callback: Function) => {
    const queryString = `UPDATE Wallet SET balance=? WHERE wallet_address=?`;

    db.query(
      queryString,
      [wallet.balance, wallet.wallet_address],
      (err, result) => {
        if (err) {callback(err)}
        callback(null);
      }
    );
  }

  export const deleteWallet = (wallet_address: string, callback: Function) => {
    const queryString = "DELETE FROM Wallet WHERE wallet_address=?"

    db.query(queryString, wallet_address, (err, result) => {
        if (err) {callback(err)}
        callback(null);
    })
  }