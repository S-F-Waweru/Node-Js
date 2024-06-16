import jwt from 'jsonwebtoken';
import  { NextFunction, Request, Response } from "express";
import path from 'path'
import dotenv from 'dotenv'

import { Payload } from '../Models/authModel';
dotenv.config({path:path.resolve(__dirname,"../../.env")})

export interface ExtendedRequest1 extends Request{
    info? : Payload
}
export function verifyToken(req:ExtendedRequest1, res : Response, next:NextFunction){
    try {
       
        const token = req.headers['token'] as string
        
        console.log(token)

        if(!token){
        return res.status(401).json({message : "Forbidden !!"})
        }

        const decodedData = jwt.verify(token, process.env.SECRET as string)as Payload
        req.info = decodedData
        console.log(decodedData)
        
    } catch (error) {
        return res.status(500).json(error)
    }
    // request is paused whn the above code is running
    // to call the next finction
    next()
}
