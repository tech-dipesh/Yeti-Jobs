import express from "express";
import helmet from "helmet";
import jobListingRouter from "./routes/jobs.routes.js"
import usersListingRouter from "./routes/users.routes.js"
import companyRouter from "./routes/companies.routes.js"
import applicationRouter from "./routes/applications.routes.js"
import "dotenv/config"
import "./services/cron-task.js"
import cookieParser from "cookie-parser";
import authUserMiddleware from "./Middleware/isLoggedIn.js";
import rateLimit from "express-rate-limit";
import cors from "cors";
import "./services/email-verification.js"
import isAdminMIddleware from "./Middleware/isAdmin.js";
import adminRoutes from "./routes/admin.routes.js";
import { serve, setup } from "swagger-ui-express";
import YAML from "yamljs";
const swaggerInYAML=YAML.load("./swagger.yaml")
const app = express();




app.use(cors({origin: process.env.CLIENT_BASE_URL,  credentials: true}));
const limitUser=rateLimit({
  windowMs: 1000*60,
  limit: 200
})

app.use(limitUser);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/swagger",serve, setup(swaggerInYAML));
app.use("/api/v1/jobs",  jobListingRouter)
app.use("/api/v1/users", usersListingRouter)
app.use("/api/v1/companies", authUserMiddleware, companyRouter)
app.use("/api/v1/applications", authUserMiddleware,  applicationRouter)
app.use("/api/v1/admin", authUserMiddleware,  isAdminMIddleware, adminRoutes)

app.get("/", (req, res) => {
  return res.status(201).redirect("/api/v1/jobs")
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

export default app;