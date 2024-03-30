import { Linking, Platform } from "react-native";

export const openUPIApp = async (amount) => {
  try {
    // upi://pay?pa=ayush.gupta.1108@oksbi&pn=ayush gupta&aid=uGICAgICXrePgKg
    let url = "";
    if (Platform.OS === "android") {
      // For Android, use the UPI URI scheme
      url = `upi://pay?pa=ayush.gupta.1108@oksbi&pn=ayushgupta&aid=uGICAgICXrePgKg&am=${amount}&cu=INR`;
    } else if (Platform.OS === "ios") {
      // For iOS, use the universal link
      url = `upi://pay?pa=ayush.gupta.1108@oksbi&pn=ayushgupta&aid=uGICAgICXrePgKg&am=${amount}&cu=INR`;
    }

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("UPI app is not installed");
    }
  } catch (error) {
    console.error("An error occurred while opening UPI app:", error);
  }
};
