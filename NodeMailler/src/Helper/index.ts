import nodemailer from 'nodemailer'
import path from 'path'
import dotenv from 'dotenv'
import ejs from 'ejs'
dotenv.config({path:path.resolve(__dirname,"../../.env")})



//CONFIGURATION Object
let config = {
    host :'smtp.gmail.com',
    service:'gmail',
    port:587,
    auth :{
        user : process.env.EMAIL,
        pass : process.env.PASS
    }
}

// / Transporter
function createTransporter(config:any){
    return nodemailer.createTransport(config)
}

// '' send email function
export  async function sendEmail(messageOption:any){
    let transporter = createTransporter(config)
    await transporter.verify()
    transporter.sendMail(messageOption,(err , info) =>{
        if(err){
            console.log(err)
        }
        console.log(info)
    })
}

// let messageOption  = {
//     to :process.env.EMAIL,
//     from:process.env.EMAIL,
//     subject:"TESTING",
//     html:"<h1>Hello THERE</h1>",  // the body
// }
// sendEmail(messageOption)

// // // ejs
// ejs.renderFile("../../Templates/register.ejs",{name : 'Samuel'}, (err, data)=>{
//     let messageOption  = {
//         to :process.env.EMAIL,
//         from:process.env.EMAIL,
//         subject:"TESTING",
//         html:data
//     }

//     console.log(data)
//     sendEmail(messageOption)
// })