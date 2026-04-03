import Notification from "../models/Notification.js";

export const createNotification = async ({
  recipient,
  type,
  message,
  meta = {},
}) => {
  const notification = await Notification.create({
    recipient,
    type,
    message,
    meta,
  });

  return notification;
};
