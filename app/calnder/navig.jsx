import { collection, getDocs } from "firebase/firestore";
import { db } from "../homepage/firebase/firebase.config";

export const fetchAllEvents = async () => {
  try {
    const eventsRef = collection(db, "events");
    const querySnapshot = await getDocs(eventsRef);

    return querySnapshot.docs.map((doc) => {
      const eventData = doc.data();
      const date = eventData.date;

      // Check if date is a Timestamp and convert it to a string
      let formattedDate = "";
      if (date && date.toDate) {
        formattedDate = date.toDate().toISOString().split("T")[0]; // Ensure date is a string in `YYYY-MM-DD`
      }

      return {
        id: doc.id,
        ...eventData,
        date: formattedDate,
      };
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
