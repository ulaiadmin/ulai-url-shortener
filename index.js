import express from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import urlRoute from "./router/url.js";
const app = express();
const server = http.createServer(app);
app.use(express.json({ limit: "50mb" }));
app.use("/", urlRoute);

/* MONGOOSE SETUP */
const port = process.env.PORT;
mongoose
  .connect(`${process.env.MONGO_LOCAL_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(port, () => console.log(`Server Port: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));