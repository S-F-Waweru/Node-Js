import express, { json } from "express";
import categoryRouter from "./Routes/categoryRoutes";
import productRouter from "./Routes/productRoutes";
import authRouter from "./Routes/authRoutes";


const app  = express()

// middleware
app.use(json())
    //routes
app.use("/categories", categoryRouter)
app.use("/products", productRouter)
app.use("/auth", authRouter)




//port 
app.listen(4000,()=>{
    console.log('Sever running .......')
})