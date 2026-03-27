import {z} from "zod"
const websitePattern=/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/[^\s]*)?$/

const companiesSchema=z.object({
    name:z
    .string({ error: "Name is required" })
    .trim()
    .min(2, {error: "Name must be a 2 characters"}),
    description:z 
    .string({error: "Please Add a Description"})
    .trim()
    .min(25, {error: "Minimum Letter Should be 25 Letter of Description"})
    .max(250, {error: "Maximum Letter Should be 250 Letter of Description"})
    ,
    website:z
    .string({error: "Please Enter a Website Name"})
    .trim()
    .regex(websitePattern, "Please Enter Correct Url Type Type"),
    location:z
    .string({error: "Please Enter a Location Name"})
    .trim()
    .min(3, {error: "Location Must be The 5 Letters.."})
    ,
    founded_year:z.coerce
    .number({error: "Please Enter a Founded Year Number"})
    .min(1900, {error: "Number Can't be Below 1900"})
    .max(2026, {error: "Founded Year Can't be Future Date."})
})


export default companiesSchema;