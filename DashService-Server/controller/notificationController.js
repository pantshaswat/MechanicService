const Notification = require("../models/notificationModel");
const ObjectId = require("mongoose").Types.ObjectId;
const userModel = require("../models/userModel");

//post notification for all
async function notifyAllUsers(req, res) {
  const body = req.body;
  if (!body.message) {
    return res.status(400).send("Notification message required");
  }
  try {
    // Create a new notification
    const notification = await Notification.create({
      message: body.message,
      notificationType: body.notificationType,
      metaData: body.metaData,
    });

    // Find all users
    const users = await userModel.find({});
    if (!users || users.length === 0) {
      return res.status(404).send("No users found");
    }

    // Update each user to add the new notification to their notifications array
    await Promise.all(users.map(async (user) => {
      user.notifications.push(notification._id);
      await user.save();
    }));

    return res.status(201).send("Notification sent to all users");
  } catch (error) {
    return res.status(500).send(`Error adding notification: ${error.message}`);
  }
}


async function postNotification(req, res) {
  const receiverUserId = req.params._id;
  const body = req.body;
  if (!body.message) {
    return res.status(400).send("Notification message required");
  }

  try {
    const user = await userModel.findOne({ _id: new ObjectId(receiverUserId) });
    if (!user) {
      return res.status(404).send("User not Found");
    }
  } catch (e) {
    return res.status(400).send("Invalid user");
  }

  try {
    const notification = await Notification.create({
     
      message: body.message,
      isRead: false,
      notificationType: body.notificationType,
      metaData: body.metaData,
    });
    await userModel.updateOne({notifications: notification._id});

    return res.status(201).send(notification);
  } catch (e) {
    return res.status(500).send(`Error adding notification ${e}`);
  }
}

async function getAllNotification(req, res) {
  const allNotification = await Notification.find({});
  if (!allNotification) {
    return res.status(404).send("No notification found");
  }
  return res.status(201).send(allNotification);
}

async function getUserNotification(req, res) {
  const userId = req.params._id;
  try {
    const user = await userModel.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).send("User not Found");
    }
  } catch (e) {
    return res.status(400).send("Invalid user");
  }
  try {
    const notifications = await userModel.findOne({ _id: new ObjectId(userId) }).populate('notifications');
    
    if (!notifications) {
      return res.status(404).send("NO notification found");
    }
    return res.status(201).send(notifications);
  } catch (e) {
    return res.status(404).send(`Error finding notification ${e.message}`);
  }
}

module.exports = {
  postNotification,
  getAllNotification,
  getUserNotification,
  notifyAllUsers,
};
