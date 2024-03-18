import mongoose, { Schema } from "mongoose";

export interface IDeliveryException {
  // ID ,Card ID,User contact,Timestamp,Comment
  ID: string;
  Card_Id: string;
  User_contact: string;
  TimeStamp: string;
  Comment: string;
}

const deliveryExceptionSchema: Schema = new Schema({
  ID: { type: Schema.Types.String, required: true },
  Card_Id: { type: Schema.Types.String, required: true },
  User_contact: { type: Schema.Types.String },
  TimeStamp: { type: Schema.Types.String },
  Comment: { type: Schema.Types.String },
});

export default mongoose.model<IDeliveryException>(
  "DeliveryException",
  deliveryExceptionSchema
);
