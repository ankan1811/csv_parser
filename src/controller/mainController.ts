import { Request, Response } from "express";
import Pickup, { IPickup } from "../models/Pickup";
import Delivered, { IDelivered } from "../models/Delivered";
import DeliveryException, {
  IDeliveryException,
} from "../models/DeliveryException";
import Returned, { IReturned } from "../models/Returned";
export const getStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_phone, card_id } = req.query;
    if (user_phone === null && card_id === null) {
      res.status(401).json({
        error: "Invalid input",
      });
      return;
    }
    let cardStatus = {};
    let ncard_id;
    if (user_phone) {
      let phone = user_phone.toString();
      if (phone.length > 9) {
        phone = phone.toString().substring(phone.length - 9, phone.length);
      }
      const pickedUp = await Pickup.findOne({
        User_contact: phone,
      });
      ncard_id = pickedUp?.Card_Id;
      const deliveryExcept = await DeliveryException.findOne({
        Card_Id: ncard_id,
      });
      const returned = await Returned.findOne({
        Card_Id: ncard_id,
      });
      const delivered = await Delivered.findOne({
        Card_Id: ncard_id,
      });
      cardStatus = getCardStatus(pickedUp, delivered, deliveryExcept, returned);
    }
    if (card_id) {
      const delivered = await Delivered.findOne({
        Card_Id: card_id,
      });
      const deliveryExcept = await DeliveryException.findOne({
        Card_Id: card_id,
      });
      const returned = await Returned.findOne({
        Card_Id: card_id,
      });
      const pickup = await Pickup.findOne({
        Card_Id: card_id,
      });
      cardStatus = getCardStatus(pickup, delivered, deliveryExcept, returned);
    }

    res.status(200).json(cardStatus);
  } catch (error) {
    console.log(`Error:${error}`);
  }
};

function getCardStatus(
  pickup: IPickup | null,
  delivered: IDelivered | null,
  deliveryExcept: IDeliveryException | null,
  returned: IReturned | null
) {
  let cardStatus = {};
  if (!pickup) {
    cardStatus = { status: "Card not found" };
  } else {
    const pickupTime = pickup.TimeStamp;
    if (delivered) {
      const deliveredTime = delivered.TimeStamp;
      cardStatus = {
        status: "Card delivered",
        info: delivered,
        deliveredTime,
        pickupTime,
      };
    } else {
      if (returned) {
        const returnTime = returned.TimeStamp;
        cardStatus = {
          status: "Returned",
          info: returned,
          pickupTime,
          returnTime,
        };
      } else {
        const exceptionTime = deliveryExcept!.TimeStamp;
        cardStatus = {
          status: "Delivery exception",
          info: deliveryExcept,
          pickupTime,
          exceptionTime,
        };
      }
    }
  }
  return cardStatus;
}
