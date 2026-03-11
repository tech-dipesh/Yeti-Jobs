import {z} from "zod"


// user_id, job_id, status, applied_at.
// .enum(allAvaibleEducationtype, {error: "Please Enter All Values such as, Basic, Matrix, High School, Undergraduation, Postgraduation"}),
// .string({required_error: "Please Add a education"})
const allAvaibleApplicationtype=["applied", "rejected", "hired"];

const applicationSchema=z.object({
  // status:z.string().toLowerCase()
    // .pipe(z.enum(allAvaibleApplicationtype, {error: "Please Only Enter a Avaible Option such as, applied, rejected, hired"}))
    status: z
    .preprocess(
      (val) => (val.toLowerCase()),
      z.enum(allAvaibleApplicationtype, { er: "Please only enter applied, rejected, or hired" }),
    ),
})

export default applicationSchema;