import { z } from "zod";
import { AVAIBLE_EDUCATION_TYPE, PASSWORD_REGEX, PHONE_NUMBER_REGEX } from "../utils/data.js";
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
    .enum(AVAIBLE_EDUCATION_TYPE, { error: "Please Only Enter a Avaible Option such as, Basic, Matrix, High School, Undergraduation, Postgraduation",}),
  email: z
  .string({ required_error: "Please Enter a Email" })
  .trim()
    .regex(z.regexes.email, "Please Match the Email Format Type"),
  password: z
  .string({ required_error: "Please Enter a Password" })
  .min(7, {message: "Password Must be between 7 and 15 characters long."})
  .max(15, {message: "Password Must be between 7 and 15 characters long."})
  .trim()
    .regex(PASSWORD_REGEX, "Please Match the Password Format"),
});

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: "Please Enter a Email" })
    .regex(z.regexes.email, "Please Match the Email Format Type"),
  password: z
    .string({ required_error: "Please Enter a Password" })
    .regex(PASSWORD_REGEX, "Please Match the Password Format"),
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
    .enum(AVAIBLE_EDUCATION_TYPE, { error: "Please Only Enter a Avaible Option such as, Basic, Matrix, High School, Undergraduation, Postgraduation", })
    .optional(),
  email: z
    .string({ required_error: "Please Enter a Email" })
    .regex(z.regexes.email, "Please Match the Email Format Type")
    .optional(),
  number: z
    .string({ required_error: "Please Enter a Number" })
    .min(10, {message: "Phone Number Must be a Minimum 10 Length"})
    .max(15, {message: "Phone Number Must be a Maxmimum 15 Length"})
    .regex(PHONE_NUMBER_REGEX, "Phone Number Must be a a International Number.")
    .optional(),
  experience: z
    .string({ required_error: "Please Enter a Experience Years" })
    .min(0, {message: "Experience Must be a Minimum 0 Years"})
    .max(35, {message: "Experience Must be a Maxmimum 35 Years"})
    .optional(),
});

export const EducationUserSchema=z.object({
  degree: z
    .string({ error: "Degree is required" })
    .min(5, { message: "Degree must be at least 2 characters" }),
  university_name: z
    .string({ error: "Univesity name is required" })
    .min(8, { message: "Univesity name must be at least 2 characters" }),
  start_date: z
    .number({ error: "Please Enter a Starting Education Year" })
    .min(1940, {message: "Education Starting Year Can't be below 1940"})
    .max(2026, {message: "Education Starting Year Can't be above 2030"})
  ,
  end_date: z
    .number({ error: "Please Enter a Ending Education Year" })
    .min(1944, {message: "Education Ending Year Can't be below 1940"})
    .max(2031, {message: "Education Ending Year Can't be above 2030"})
  ,
  grade: z
    .number({ error: "Please Enter a Grade" })
    .min(0, {message: "Grade Can't be below 0"})
    .max(100, {message: "Grade Can't be above 100"})
  ,
}).refine((data) => data.start_date < data.end_date, {
  message: "Start Date can't be higher than ending date",
  path: ["start_date"], 
})
.refine((data) => data.end_date - data.start_date <= 6, {
  message: "End year cannot be more than 6 years after the start year",
  path: ["end_date"], 
})

export default userSchema;
