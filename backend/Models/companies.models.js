import {z} from "zod"
const websitePattern=/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/[^\s]*)?$/

const companiesSchema=z.object({
    name:z
    .string({ required_error: "Name is required" })
    .min(2, {message: "Name must be a 2 characters"}),
  // description:z 
  //   .string({required_error: "Please Add a Description"}),
    website:z
    .string({required_error: "Please Enter a Website"})
    .regex(websitePattern, "Please Enter Correct Url Type Type"),
    location:z
    .string({error: "Please Enter a Location"})
    .min(5, {message: "Min Length Must be a 5 Letter."})
    ,
    founded_year:z
    .number({error: "Please Enter a Founded Year Number"})
    .min(0, {error: "Number Can't be Negative"})
    .max(2026, {error: "Founded Year Can't be Future Date."})

})


export default companiesSchema;