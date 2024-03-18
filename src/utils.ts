import csvParser from "csv-parser";
import { parse } from "date-fns";
import fs from "fs";
import Pickup, { IPickup } from "./models/Pickup";
import Delivered, { IDelivered } from "./models/Delivered";
import DeliveryException, {
  IDeliveryException,
} from "./models/DeliveryException";
import Returned, { IReturned } from "./models/Returned";
//loadCsv()
export async function loadCsvPickup() {
  const filePath = "data/Pickup.csv";
  const Model = Pickup;
  const dtformat = "dd-MM-yyyy hh:mm a";
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", async (row: any) => {
      try {
        const parsedTimeDate = parse(row["Timestamp"], dtformat, new Date());
        const data = new Model(row);
        data.Card_Id = row["Card ID"];
        data.ID = row["ID"];
        data.TimeStamp = parsedTimeDate.toString();
        data.User_contact = row["User Mobile"];
        await data.save();
      } catch (err) {
        console.log(`Error :${err}`);
      }
    })
    .on("end", () => {
      // console.log(`Operation done`);
    });
}

export async function loadCsvDelivered() {
  const filePath = "data/Delivered.csv";
  const Model = Delivered;
  const dtformat = "yyyy-MM-dd'T'HH:mm:ss'Z'";
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", async (row: any) => {
      try {
        const parsedTimeDate = parse(row["Timestamp"], dtformat, new Date());
        const data = new Model(row);
        data.Card_Id = row["Card ID"];
        data.ID = row["ID "];
        data.TimeStamp = parsedTimeDate.toString();
        data.User_contact = row["User contact"];
        data.Comment = row["Comment"];
        await data.save();
      } catch (err) {
        console.log(`Error :${err}`);
      }
    })
    .on("end", () => {
      // console.log(`Operation done`);
    });
}

export async function loadCsvDeliveryException() {
  const filePath = "data/Delivery_exceptions.csv";
  const Model = DeliveryException;
  const dtformat = "dd-MM-yyyy HH:mm";
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", async (row: any) => {
      try {
        const parsedTimeDate = parse(row["Timestamp"], dtformat, new Date());
        const data = new Model(row);
        data.Card_Id = row["Card ID"];
        data.ID = row["ID "];
        data.TimeStamp = parsedTimeDate.toDateString();
        data.User_contact = row["User contact"];
        data.Comment = row["Comment"];
        await data.save();
      } catch (err) {
        console.log(`Error :${err}`);
      }
    })
    .on("end", () => {
      // console.log(`Operation done`);
    });
}

export async function loadCsvReturned() {
  const filePath = "data/Returned.csv";
  const Model = Returned;
  const dtformat = "dd-MM-yyyy hh:mmaa";
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", async (row: any) => {
      try {
        const parsedTimeDate = parse(row["Timestamp"], dtformat, new Date());
        const data = new Model(row);
        data.Card_Id = row["Card ID"];
        data.ID = row["ID "];
        data.TimeStamp = parsedTimeDate.toString();
        data.User_contact = row["User contact"];
        await data.save();
      } catch (err) {
        console.log(`Error :${err}`);
      }
    })
    .on("end", () => {
      // console.log(`Operation done`);
    });
}

module.exports = {
  loadCsvPickup,
  loadCsvReturned,
  loadCsvDelivered,
  loadCsvDeliveryException,
};
