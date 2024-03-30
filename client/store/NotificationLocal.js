import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestPermissions = async () => {
  const { granted } = await Notifications.requestPermissionsAsync();
  if (!granted) {
    console.log("Notification permissions not granted");
  }
};

export const scheduleNotificationHandler = async (title, body, date) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title || "You may have a new notification",
      body: body || "Check it out now!",
      data: {
        userName: "Amit",
      },
    },
    trigger: {
      seconds: 5, // Number of seconds from now to trigger the notification
    },
  });
};

export const receivedNotification = async () => {
  const subscription = Notifications.addNotificationReceivedListener(
    (notification) => {
      // Handle the incoming notification
      console.log(notification);
    }
  );

  return subscription;
};

export const receivedNotificationResponse = async () => {
  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      // Handle the response notification
      console.log(response);
      console.log(response.notification.request.content.data.userName);
    }
  );

  return subscription;
};
// Notifications.addNotificationReceivedListener((notification) => {
//   // Handle the incoming notification
//   console.log(notification);
// });
// Handle foreground notification clicks for Android
if (Platform.OS === "android") {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
    handleSuccess: async () => {
      // Handle notification click
      console.log("Notification clicked");
    },
  });
}
