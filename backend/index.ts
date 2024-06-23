import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cityRoutes from "./routes";
const cors = require("cors");
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use("/api", cityRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
