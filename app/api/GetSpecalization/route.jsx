import admin from "../../admin"; // Ensure admin SDK is initialized correctly
import { NextResponse } from "next/server";

export async function GET(request) {
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

    // Extract user ID from token
    const userId = decodedToken.uid;
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid user ID in token" },
        { status: 400 }
      );
    }

    // Reference Firestore document
    const db = admin.firestore();
    const userDocRef = db.collection("userData").doc(userId);

    let userDoc;
    try {
      userDoc = await userDocRef.get();
    } catch (error) {
      console.error("Firestore access error:", error);

      const errorMessages = {
        "permission-denied": "Access denied. Check Firestore permissions.",
        "not-found": "User data not found in Firestore.",
        "unavailable": "Firestore service unavailable. Try again later.",
      };

      return NextResponse.json(
        { error: errorMessages[error.code] || "Firestore error" },
        { status: error.code === "not-found" ? 404 : 500 }
      );
    }

    // Check if user data exists
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "User data not found in Firestore" },
        { status: 404 }
      );
    }

    // Retrieve user data
    const userData = userDoc.data();

    return NextResponse.json({ userData }, { status: 200 });

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message || "No details available" },
      { status: 500 }
    );
  }
}
