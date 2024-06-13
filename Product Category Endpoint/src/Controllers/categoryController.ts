import { Request, Response } from "express";
import { Category, CategoryRequest } from "../Models/categoryModel";
import { v4 as uid } from "uuid";
import mssql from 'mssql'
import { sqlConfig } from "../config";
import { DBHelper } from "../DatabaseHelpers";

const dbInstance = new DBHelper();

export async function addCategory(req: Request, res: Response) {
    try {
        const id = uid()
        const { name } = req.body

        dbInstance.exec('addCategory' , {id, name})

        res.status(200).json({ message: "Category added Successfully" })
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function getCategories(req: Request, res: Response) {

    try { 
        let categories = (await dbInstance.exec('getCategories', {})).recordset as Category []
        res.status(200).json(categories)
    } 
    catch (error) {
        res.status(500).json(error)
    }
}

