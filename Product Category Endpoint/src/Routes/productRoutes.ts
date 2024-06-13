import { Router } from "express";
import { addproduct, deleteProduct, getCategoryProducts, getProduct, getProducts, updateProduct } from "../Controllers/productController";
import { verifyToken } from "../Middleware";


const productRouter = Router()
productRouter.post("", addproduct)
productRouter.get("",verifyToken, getProducts)
productRouter.get("/:id", getProduct)
productRouter.get("/category/:id", verifyToken,getCategoryProducts)
productRouter.put("/:id", updateProduct)
productRouter.delete("/:id", deleteProduct)


export default productRouter


