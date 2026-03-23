import {z} from "zod"

const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passRegex=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/
const allAvaibleEducationtype=["Basic", "Matrix", "High School", "Undergraduation", "Postgraduation"];

const userSchema=z.object({
  fname: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" }),
    lname:z
    .string({ required_error: "Name is required" })
    .min(2, {message: "Last Name must be a 2 characters"}),
  education:z 
    // .string({required_error: "Please Add a education"})
    // .enum(allAvaibleEducationtype, {error: "Please Enter All Values such as, Basic, Matrix, High School, Undergraduation, Postgraduation"}),
    .enum(allAvaibleEducationtype, {error: "Please Only Enter a Avaible Option such as, Basic, Matrix, High School, Undergraduation, Postgraduation"})
    ,
  email:z
    .string({required_error: "Please Enter a Email"})
    .regex(z.regexes.email, "Please Match the Email Format Type"),
  password:z
    .string({required_error: "Please Enter a Password"})
    .regex(passRegex, "Please Match the Password Format")
})



export const updateUserSchema=z.object({
  fname: z
  .string({ error: "Name is required" })
  .min(2, { message: "Name must be at least 2 characters" })
  .optional(),
  lname:z
  .string({ error: "Name is required" })
  .min(2, {message: "Last Name must be a 2 characters"})
  .optional(),
  education:z 
    // .string({required_error: "Please Add a education"})
    // .enum(allAvaibleEducationtype, {error: "Please Enter All Values such as, Basic, Matrix, High School, Undergraduation, Postgraduation"}),
    .enum(allAvaibleEducationtype, {error: "Please Only Enter a Avaible Option such as, Basic, Matrix, High School, Undergraduation, Postgraduation"})
    .optional(),
  email:z
    .string({error: "Please Enter a Email"})
    .regex(z.regexes.email, "Please Match the Email Format Type")
    .optional(),
})


export default userSchema;