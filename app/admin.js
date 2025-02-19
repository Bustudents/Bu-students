import admin from 'firebase-admin';

// Check if Firebase Admin is already initialized to avoid duplicate initialization
if (!admin.apps.length) {
 try {
   console.log('Initializing Firebase Admin SDK');

   const serviceAccount = {
     type: process.env.FIREBASE_ADMIN_TYPE,
     project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
     private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
     private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Fix newline characters
     client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
     client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
     auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
     token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
     auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
     client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
   };

   admin.initializeApp({
     credential: admin.credential.cert(serviceAccount),
   });

   console.log('Firebase Admin SDK initialized successfully');
 } catch (error) {
   console.error('Firebase Admin SDK initialization error:', error);
   throw error; // Re-throw the error to stop execution
 }
} else {
 console.log('Firebase Admin SDK already initialized');
}

export default admin;
