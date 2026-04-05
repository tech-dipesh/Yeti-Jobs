import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/;
const phoneNumberRegex=/^\+(?:[0-9] ?){6,14}[0-9]$/
const allAvaibleEducationtype = [
  "Basic",
  "Matrix",
  "High School",
  "Undergraduation",
  "Postgraduation",
];

const userSchema = z.object({
  fname: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, { message: "Name must be at least 2 characters" }),
  lname: z
  .string({ required_error: "Name is required" })
  .trim()
    .min(2, { message: "Last Name must be a 2 characters" }),
  education: z
    // .string({required_error: "Please Add a education"})
    // .enum(allAvaibleEducationtype, {error: "Please Enter All Values such as, Basic, Matrix, High School, Undergraduation, Postgraduation"}),
    .enum(allAvaibleEducationtype, {
      error:
        "Please Only Enter a Avaible Option such as, Basic, Matrix, High School, Undergraduation, Postgraduation",
    }),
  email: z
  .string({ required_error: "Please Enter a Email" })
  .trim()
    .regex(z.regexes.email, "Please Match the Email Format Type"),
  password: z
  .string({ required_error: "Please Enter a Password" })
  .trim()
    .regex(passRegex, "Please Match the Password Format"),
});

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: "Please Enter a Email" })
    .regex(z.regexes.email, "Please Match the Email Format Type"),
  password: z
    .string({ required_error: "Please Enter a Password" })
    .regex(passRegex, "Please Match the Password Format"),
});

export const updateUserSchema = z.object({
  fname: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .optional(),
  lname: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Last Name must be a 2 characters" })
    .optional(),
  education: z
    // .string({required_error: "Please Add a education"})
    // .enum(allAvaibleEducationtype, {error: "Please Enter All Values such as, Basic, Matrix, High School, Undergraduation, Postgraduation"}),
    .enum(allAvaibleEducationtype, {
      error:
        "Please Only Enter a Avaible Option such as, Basic, Matrix, High School, Undergraduation, Postgraduation",
    })
    .optional(),
  email: z
    .string({ required_error: "Please Enter a Email" })
    .regex(z.regexes.email, "Please Match the Email Format Type")
    .optional(),
  number: z
    .string({ required_error: "Please Enter a Number" })
    .min(10, {message: "Phone Number Must be a Minimum 10 Length"})
    .max(15, {message: "Phone Number Must be a Maxmimum 15 Length"})
    .regex(phoneNumberRegex, "Phone Number Must be a a International Number.")
    .optional(),
  experience: z
    .string({ required_error: "Please Enter a Experience Years" })
    .min(0, {message: "Experience Must be a Minimum 0 Years"})
    .max(35, {message: "Experience Must be a Maxmimum 35 Years"})
    .optional(),
});

export default userSchema;
