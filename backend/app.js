import express from "express";
import {Client} from "pg"
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
import dns from "dns/promises"
import rateLimit from "express-rate-limit";
import cors from "cors";
import "./services/email-verification.js"
import generateRandomNumber from "./utils/generateRandom6DigitNumber.js";
import { userLoggedOutcontroller } from "./controllers/users.controller.js";
import validateCorrectUid from "./Middleware/validateCorrectUid.js";
const app = express();
const port = 3000;




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

app.get("/", (req, res) => {
  res.status(201).json({ message: "Homepage" });
});

app.use((req, res)=>{
  const {url}=req;
  return res.status(404).json({message: `The Page You're looking for: ${url} doesn't exist`})
})

app.use((err, req, res, next)=>{
  (err)
  if(err.message=='Unexpected field'){
    return res.status(401).json({message: "Please Enter Correct file name for upload"})
  }
  if(err){
    (err)
    return res.status(500).json({message:err.message})
  }
});

app.listen(port, () => {
  (`App is listening on the ${port}`);
});
