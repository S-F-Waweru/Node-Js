import { Router } from "express";
import { addCategory, getCategories } from "../Controllers/categoryController";

const categoryRouter = Router()
categoryRouter.post("", addCategory)
categoryRouter.get("", getCategories)

export default categoryRouter