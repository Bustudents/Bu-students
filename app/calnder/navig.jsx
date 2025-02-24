import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../homepage/firebase/firebase.config";

export const fetchAllEvents = async (token) => {
  try {
    if (!token) {
      console.error("❌ Authentication token is missing");
      return [];
    }

    console.log("📡 Sending token:", token); // Debugging

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Fetch user specialization
    const userResponse = await fetch("/api/GetSpecalization", {
      method: "GET",
      headers: headers,
    });

    if (!userResponse.ok) {
      throw new Error(
        `❌ Failed to fetch user data: ${userResponse.status} - ${userResponse.statusText}`
      );
    }

    const userData = await userResponse.json();
    console.log("✅ User Data:", userData); // Debugging

    const specialization = userData?.userData?.specialization;

    if (!specialization) {
      throw new Error("❌ User specialization not found");
    }

    // Fetch Firestore events
    const eventsRef = collection(db, "calnder");
    const q = query(
      eventsRef,
      where("Specialization", "array-contains-any", [specialization, "common"])
    );

    const querySnapshot = await getDocs(q);
    console.log("✅ querySnapshot:", querySnapshot); // Debugging

    return querySnapshot.docs.map((doc) => {
      const eventData = doc.data();
      
      let formattedDate = "";
      if (eventData.date && typeof eventData.date === "string") {
        formattedDate = eventData.date.split("T")[0]; // Extract YYYY-MM-DD
      }

      return { id: doc.id, ...eventData, date: formattedDate };
    });
  } catch (error) {
    console.error("🔥 Error fetching filtered events:", error.message);
    return [];
  }
};
