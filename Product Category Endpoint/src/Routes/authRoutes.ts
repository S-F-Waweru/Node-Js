import { Router } from "express";
import { loginUSer, registerUser } from "../Controllers/authController";

const authRouter = Router()
authRouter.post("/register", registerUser)
authRouter.post("/login", loginUSer)


export default authRouter