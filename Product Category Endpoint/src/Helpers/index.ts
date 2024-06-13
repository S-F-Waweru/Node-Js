import Joi, { expression } from "joi";

const RegisterSchema = Joi.object({
    Name : Joi.string().required(),
    Email : Joi.string().required().email().messages({
         'string.email' : "please Enter a valid Email",
         
    }
       
    ),
    Password : Joi.string().required().pattern(
        new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
)
})

export default RegisterSchema