import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/homepage/firebase/firebase.config";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const specialization = searchParams.get("specialization");

    const eventsRef = collection(db, "events");
    let q;

    if (specialization) {
      // Fetch events for the specialization OR common events
      q = query(eventsRef, where("Specialization", "array-contains-any", [specialization, "common"]));
    } else {
      // Fetch ALL events if no specialization is provided
      q = query(eventsRef);
    }

    const querySnapshot = await getDocs(q);

    const events = querySnapshot.docs.map((doc) => {
      const eventData = doc.data();
      let formattedDate = "";

      // Format date if it exists
      if (eventData.date && typeof eventData.date.toDate === "function") {
        formattedDate = eventData.date.toDate().toISOString().split("T")[0];
      }

      return { id: doc.id, ...eventData, date: formattedDate };
    });

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("🔥 Error fetching events:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}