import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../homepage/firebase/firebase.configzzz"; // Combine imports
import { doc, setDoc } from "firebase/firestore"; // Import Firestore modular functions

export async function POST(request) {
  try {
    // Parse the request body as JSON
    const { email, password, ...additionalData } = await request.json();

    // Create a new user with email and password using Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Save additional user data to Firestore using the modular SDK
    await setDoc(doc(db, "userData", userId), {
      email,
      ...additionalData,
    });

    // Send a success response
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating user:", error);

    // Send an error response with more detailed message
    return NextResponse.json(
      {
        message: error.message || "An error occurred while creating the user.",
      },
      { status: 400 }
    );
  }
}
