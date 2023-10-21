import jwt from "jsonwebtoken";
import User from "../models/user";
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from "express";

dotenv.config()

export const auth = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const auth = req.headers.authorization;
        if(auth === undefined){
            return res.status(401).json({
                status: `Error`,
                message: `You are not licensed`
            })
        }
        const token = auth.split(" ")[1];
        if(!token || token === ""){
            return res.status(401).json({
                message: `Please login, Token not valid`
            })
        }
        const decoded = jwt.verify(token, `${process.env.APP_SECRET}`)
        const user:any = await User.findOne({id:decoded})

        if(user){
            next()
        }
    } catch (error) {
        return res.status(401).json({
            Error: `Unauthorised Access`
        })
    }
}