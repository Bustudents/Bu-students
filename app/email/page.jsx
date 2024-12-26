"use client"
import { useEffect } from "react";
import { auth } from "../homepage/firebase/firebase.config";

const YourComponent = () => {
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // Send email after user signs in
      fetch("/api/sendemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email, // Send the signed-in user's email
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data.message))
        .catch((error) => console.error("Error sending email:", error));
    }
  }, []);

  return <div>Welcome to the Calendar!</div>;
};

export default YourComponent;
