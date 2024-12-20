
// server.js
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../homepage/firebase/firebase.config";

export const fetchEvents = async (month, year) => {
  try {
    const startDate = new Date(year, month, 1); // First day of the month
    const endDate = new Date(year, month + 1, 0, 23, 59, 59); // Last day of the month

    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("date", ">=", startDate), where("date", "<=", endDate));
    const querySnapshot = await getDocs(q);

    const events = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate().toISOString().split("T")[0], // Ensure date is a string in `YYYY-MM-DD`
    }));
    return events;
  } catch (error) {
    console.error("Error fetching events: ", error);
    return [];
  }
};
