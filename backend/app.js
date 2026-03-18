import express from "express";
import helmet from "helmet";
import jobListingRouter from "./routes/jobs.routes.js"
import usersListingRouter from "./routes/users.routes.js"
import companyRouter from "./routes/companies.routes.js"
import applicationRouter from "./routes/applications.routes.js"
import "dotenv/config"
import "./services/cron-task.js"
// import "./services/email-verification.js"


import cookieParser from "cookie-parser";
import authUserMiddleware from "./Middleware/isLoggedIn.js";
import rateLimit from "express-rate-limit";
import cors from "cors";
import "./services/email-verification.js"
import isAdminMIddleware from "./Middleware/isAdmin.js";
import adminRoutes from "./routes/admin.routes.js";
const app = express();
const port = process.env.PORT || 3000;




app.use(cors({origin: process.env.CLIENT_BASE_URL,  credentials: true}));
const limitUser=rateLimit({
  windowMs: 1000*60,
  limit: 100000
})

app.use(limitUser);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use("/jobs",  jobListingRouter)
// app.use("/jobs",  authUserMiddleware, jobListingRouter)
app.use("/users", usersListingRouter)
// app.use("/companies", authUserMiddleware, isAdminMIddleware,  companyRouter)
app.use("/companies", authUserMiddleware,  companyRouter)
app.use("/applications", authUserMiddleware,  applicationRouter)
app.use("/admin", authUserMiddleware,  isAdminMIddleware, adminRoutes)

app.get("/", (req, res) => {
  return res.status(201).redirect("jobs")
});

app.use((req, res)=>{
  const {url}=req;
  return res.status(404).json({message: `The Page You're looking for: ${url} doesn't exist`})
})

app.use((err, req, res, next)=>{
  if(err.message=='Unexpected field'){
    return res.status(401).json({message: "Please Enter Correct file name for upload"})
  }
  if(err){
    return res.status(500).json({message:err.message})
  }
});

app.listen(port, () => {
  console.log(`App is listening on the http://localhost:${port}`);
});
