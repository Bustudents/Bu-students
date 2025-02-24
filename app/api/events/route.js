import admin from "../../admin"; // Ensure this path is correct
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - Missing or invalid token" },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (error) {
      console.error("Token verification failed:", error);
      const errorMessages = {
        "auth/id-token-expired": "Token expired. Please log in again.",
        "auth/id-token-invalid": "Invalid token. Please provide a valid token.",
        "auth/argument-error": "Invalid token format. Check your token structure.",
      };
      return NextResponse.json(
        { error: errorMessages[error.code] || "Authentication failed" },
        { status: 403 }
      );
    }

    // After verifying the token, fetch events from Firestore using Admin SDK
    const db = admin.firestore();
    const eventsSnapshot = await db.collection("calnder").get();
    const events = [];
    eventsSnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    return NextResponse.json({ success: true, events }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in GET:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message || "No details available" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Extract the Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - Missing or invalid token" },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (error) {
      console.error("Token verification failed:", error);
      const errorMessages = {
        "auth/id-token-expired": "Token expired. Please log in again.",
        "auth/id-token-invalid": "Invalid token. Please provide a valid token.",
        "auth/argument-error": "Invalid token format. Check your token structure.",
      };
      return NextResponse.json(
        { error: errorMessages[error.code] || "Authentication failed" },
        { status: 403 }
      );
    }

    // Parse the event data from the request body
    const { title, date, Specialization, type } = await request.json();

    // Use the Admin SDK's Firestore to add a new event
    const db = admin.firestore();
    const eventData = { title, date, Specialization, type };
    const docRef = await db.collection("calnder").add(eventData);

    return NextResponse.json({ success: true, eventId: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
