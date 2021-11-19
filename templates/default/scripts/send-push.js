/**
 * Script that sends a test push via Firebase.
 *
 * Only used for testing and development.
 *
 * Usage from project root:
 *
 * node scripts/send-push.js [device token]
 */
const FCM = require("fcm-node");

// Put your server key here
const serverKey =
  "AAAADTtaSQY:APA91bGKcpICfV5r5vf4p5UDhNnjbRjgo2A008c5sM3odRcoufiCqsEwXgezPhBEH8GtGfEuYZdRaxS9-Y_g3bm67lQddkFomyTCA9Y1gJ4jTuC-m4GpZjOI_0n_fT94oVzCgwvKTOf3";

const fcm = new FCM(serverKey);

const deviceToken = process.argv[2];

if (!deviceToken) {
  console.log("You need to set device token");
  console.log("Example: node scripts/send-push.js AAAA7tyuhj...7yhuhj");
  return process.exit(1);
}

const message = {
  //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  to: deviceToken,
  //collapse_key: "your_collapse_key",

  notification: {
    title: "Title of your push notification",
    body: "Body of your push notification",
  },

  //data: {
  //you can send only notification or only data(or include both)
  //  my_key: "my value",
  //  my_another_key: "my another value",
  //},
};

fcm.send(message, function (err, response) {
  if (err) {
    console.log("Something has gone wrong!");
  } else {
    console.log("Successfully sent with response: ", response);
  }
});
