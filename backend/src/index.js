import express from "express";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./config/db";
require("dotenv").config();
import rankingRoutes from "./routes/rankingRoutes";

const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use("/api/ranking", rankingRoutes);

app.listen({ port }, () => console.log(`Server is running on$ ${port}`));
