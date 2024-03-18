import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/mainRoute";
import {
  loadCsvPickup,
  loadCsvReturned,
  loadCsvDelivered,
  loadCsvDeliveryException,
} from "./utils";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL || "")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(`Error : ${err}`);
  });
loadCsvDelivered();
loadCsvDeliveryException();
loadCsvPickup();
loadCsvReturned();
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
