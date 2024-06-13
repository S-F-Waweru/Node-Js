import ejs from "ejs";
import { DBHelper } from "../DatabaseHelpers";
import { sendEmail } from "../Helper";

const dbInstance = new DBHelper()
export interface User {
    Id: string,
    Name: string,
    Password: string,
    isDeleted: number,
    isEmailSent: number,
}
export async function run() {

    try {
        let users = (await dbInstance.query("SELECT * FROM Users WHERE isEmailSent=0")).recordset as User[]
        users.forEach(user => {
            ejs.renderFile("../Templates/register.ejs", { name:user.Name }, (err, data) => {
                let messageOption = {
                    to: process.env.EMAIL,
                    from: process.env.EMAIL,
                    subject: "Welcome to DEKUT",
                    html: data
                }

                console.log(data)
                sendEmail(messageOption)
            })

            dbInstance.query(`UPDATE Users SET isEmailSent=1 WHERE Id='${user.Id}'`)
        })
     

    } catch (error) {
        console.log(error)
    }
}