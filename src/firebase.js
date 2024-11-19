import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const envfile = process.env
const firebaseConfig = {
  apiKey: envfile.REACT_APP_FIRBASE_API_KEY,
  authDomain: envfile.REACT_APP_AUTHDOMAIN,
  projectId: envfile.REACT_APP_PROJECTID,
  storageBucket: envfile.REACT_APP_STORAGEBUCKET,
  messagingSenderId: envfile.REACT_APP_MESSAGINGSENDERID,
  appId: envfile.REACT_APP_APPID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
