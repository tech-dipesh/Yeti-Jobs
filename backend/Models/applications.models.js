import {z} from "zod"


// user_id, job_id, status, applied_at.
// .enum(allAvaibleEducationtype, {error: "Please Enter All Values such as, Basic, Matrix, High School, Undergraduation, Postgraduation"}),
// .string({required_error: "Please Add a education"})
const allAvaibleApplicationtype=["applied", "shortlisted", "rejected", "hired",];
// cover_letter, notice_period, expected_salary, why_hire
const applicationSchema=z.object({
  // status:z.string().toLowerCase()
    // .pipe(z.enum(allAvaibleApplicationtype, {error: "Please Only Enter a Avaible Option such as, applied, rejected, hired"}))
    status: z
    .preprocess(
      (val) => (val.toLowerCase()),
      z.enum(allAvaibleApplicationtype, { error: "Please only enter applied, shortlisted, rejected, or hired" }),
    )
    .optional(),
  cover_letter:
    z.string({error: "Please Enter Cover Letter String Format"})
    .trim()
    .min(10, {message: "Cover Letter Must Be the 10 Digit Length"})
    .max(250, {message: "Cover Letter Max Can Be the Maximum 250 Charachter Leength"})
    .optional(),
    notice_period:z.coerce
    .number()
    .min(0, {message: "Notice Period Can't be Below 0 days"})
    .max(90, {message: "Maximum Notice Period Can be 90 days"})
    .optional(),
    expected_salary:
    z.coerce.number({error: "Please Enter a Salary That You Want"})
    .min(5000, {message: "Salary Can't be Below 5000"})
    .max(10000000, {message: "Salary Can't be Above 10000000"}),
    why_hire:
    z.string({error: "Please Enter a Why In String Format."})
    .trim()
    .min(10, {message: "Why Hiring Must Be the 5 Digit Length"})
    .max(250, {message: "Why Question Max Can Be the Maximum 250 Charachter Leength"})
    .optional(),
})



export const validateAllInputApplicationStatus=z.object({
    status: z
    .preprocess(
      (val) => (val.toLowerCase()),
      z.enum(allAvaibleApplicationtype, { error: "Please only enter applied, shortlisted, rejected, or hired" }),
    )
  })
export default applicationSchema;