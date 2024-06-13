import { Request, Response } from "express";
import { v4 as uid } from "uuid";
import RegisterSchema from "../Helpers";
import Bcrypt from 'bcrypt'
import mssql from 'mssql'
import { sqlConfig } from "../config";
import { Payload, User } from "../Models/authModel";
import jwt from 'jsonwebtoken';

import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname,"../../.env")})

import { DBHelper } from "../DatabaseHelpers";

const dbInstance = new DBHelper();
export const registerUser = async (req: Request, res: Response) => {
    try {
        const id = uid()
        const { Name, Email, Password } = req.body
        // validate
        const { error } = RegisterSchema.validate(req.body)

        if (error) {
            res.status(400).json(error.details[0].message)
        }
        const HashedPassword = await Bcrypt.hash(Password, 10)

        // let pool = await mssql.connect(sqlConfig)

        // await pool.request()
        //     .input('Id', id)
        //     .input('Name', Name)
        //     .input('Email', Email)
        //     .input('Password', HashedPassword)
        //     .execute('addUser')

        dbInstance.exec('addUser', {Id:id, Name, Email, Password :HashedPassword})

        return res.status(201).json({ message: "User added Successfully" })
    } catch (error) {
        return res.status(500).json(error)
    }


}

export const loginUSer = async (req: Request, res: Response) => {
    try {
        // get user
        const { Email, Password } = req.body

        let pool = await mssql.connect(sqlConfig)
        let user = (await dbInstance.exec('getUser',{Email})).recordset as User[]

        if (user.length !== 0) {
            const isValid = await Bcrypt.compare(Password, user[0].Password)
            if (isValid) {
                const payload : Payload = {
                    Sub : user[0].Id,
                    Name : user[0].Name
                }

                const token  = jwt.sign(payload,process.env.SECRET as string, {expiresIn:'2h'})
                return res.status(200).json({ message: "Login Successfull!!", token})
            }
        }
        return res.status(400).json({ message: "Incorrect Credentials" })

    } catch (error) {
        return res.status(500).json(error)
    }

}