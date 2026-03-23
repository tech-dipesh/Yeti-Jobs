import {z} from "zod"

const allAvaibleJobType=["Onsite", "Remote", "Hybrid"];

const listingSchema=z.object({
  title: z
    .string({ error: "Title is Required" })
    .min(2, { message: "Title must be at least 2 characters" })
    .max(25, {message: "Title can't be more than 25 characters."}),
    description:z
    .string({ error: "Description is Required" })
    .min(25, {message: "Description Must be at least 25 characters"}),
  job_type:z
    .enum(allAvaibleJobType, {error: "Please Only Enter a Avaible Option such as, Onsite, Remote, Hybrid"}),
  experience_years:z.coerce.
    number({error: "PLease Enter a experience_years"})
    .min(0, "Experience Years Can't be the negative Value.")
    .max(50, "Upper Limit Reach Experience Years"),
  salary:z.coerce
    .number({message: "Please Enter a Salary for the Job Listing"})
    .min(2500, "Salary can't be less than 2500")
    .max(2500000, "Salary can't be more than 25000000"),
  skills:z
    .array(
      z.string(),{error: "Please Enter Skills"}),
  location:z.coerce
      .string({error: "Please Enter  a Location"})
      .min(3,{message: "Location Must be the 3 Leters."})
})


export default listingSchema;