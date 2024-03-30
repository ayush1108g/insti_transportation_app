import { Alert } from "react-native";
import RNUpiPayment from "react-native-upi-payment";

export const handlePayment = async (amount) => {
  const successCallback = (response) => {
    console.log("successCallback");
    console.log("response: ", response);
    // Handle success
  };

  const failureCallback = (response) => {
    console.log("failureCallback");

    console.log("response: ", response);
    // Handle failure
  };
  try {
    const paymentResponse = await RNUpiPayment.initializePayment(
      {
        vpa: "ayush.gupta.1108@oksbi", // Receiver's UPI ID
        amount: amount.toString(),
        payeeName: "ayush gupta", // Receiver's name
        transactionRef: "abcd-cdba-1qwe", // Transaction reference
        // Convert amount to string if needed
        // Other optional parameters...
      },
      successCallback,
      failureCallback
    );

    if (paymentResponse && paymentResponse.Status === "SUCCESS") {
      // Payment was successful
      Alert.alert("Payment Successful", "Thank you for your payment");
    } else {
      // Payment failed or response is invalid
      Alert.alert(
        "Payment Failed",
        "Oops! Something went wrong with your payment. Please try again."
      );
    }
  } catch (error) {
    // Handle payment error
    console.error("Payment Error:", error);
    Alert.alert(
      "Payment Error",
      "An error occurred while processing your payment. Please try again later."
    );
  }
};
