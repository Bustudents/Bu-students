import { collection, getDocs } from "firebase/firestore";
import { db } from "../homepage/firebase/firebase.config";

export const fetchAllEvents = async () => {
  try {
    const eventsRef = collection(db, "events");
    const querySnapshot = await getDocs(eventsRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate().toISOString().split("T")[0], // Ensure date is a string in `YYYY-MM-DD`
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
