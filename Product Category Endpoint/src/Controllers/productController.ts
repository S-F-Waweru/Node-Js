import { Request, Response } from "express";
import { v4 as uid } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../config";
import { DBHelper } from "../DatabaseHelpers";
import { name } from "ejs";

const dbInstance = new DBHelper();

export async function addproduct(req: Request, res: Response) {
  try {
    const id = uid();
    // get req body
    const { name, description, price, catid } = req.body;
    //     // make connectio
    //    let  pool = await mssql.connect(sqlConfig)

    //     pool.request()
    //     .input('id', id)
    //     .input('name', name)
    //     .input('description', description)
    //     .input('price', price)
    //     .input('catid', catid)
    //     .execute('addProduct')
    dbInstance.exec("addProduct", { id, name, price, catid });

    res.status(201).json({ message: "Product Added successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    console.log("We are here");
    // let  pool = await mssql.connect(sqlConfig)
    // const products =(await pool.request().execute('getProducts')) .recordset as Product[]
    let products = (await dbInstance.exec("getProducts", {}))
      .recordset as Product[];
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getProduct(req: Request<{ id: string }>, res: Response) {
  try {
    let pool = await mssql.connect(sqlConfig);
    let product = (await dbInstance.exec("getProducts", { id: req.params.id }))
      .recordset[0] as Product;

    if (product && product.id) {
      res.status(200).json(product);
    }
    res.status(404).json({ message: "product not found" });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getCategoryProducts(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    let products = (
      await dbInstance.exec('getCategoryProducts', { catid: req.params.id })
    ).recordset as Product[];
    if (products.length > 0) {
      res.status(200).json(products);
    }
    res.status(404).json({ message: "product not found" });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function updateProduct(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    // let pool = await mssql.connect(sqlConfig)
    const { name, description, price, catid } = req.body;

    // await pool.request()
    // .input('id', req.params.id)
    // .input('name', name)
    // .input('description', description)
    // .input('price', price)
    // .input('catid', catid)
    // .execute('updateProduct')

    dbInstance.exec("updateProduct", {
      id: req.params.id,
      name,
      description,
      price,
      catid,
    });
    res.status(200).json({ message: "Product Updated Successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function deleteProduct(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    await dbInstance.exec("deleteProduct", { id: req.params.id });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
}
