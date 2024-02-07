import { initializeApp } from "firebase/app";
import { 
   getAuth, 
   createUserWithEmailAndPassword, 
   signInWithEmailAndPassword, 
   signInWithPopup,
   GoogleAuthProvider 
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const API_KEY = import.meta.env.VITE_API_KEY_FIREBASE;
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET;
const MESSAGE_ING_SENDER_ID = import.meta.env.VITE_MESSAGE_ING_SENDER_ID;
const APP_ID = import.meta.env.VITE_APP_ID;
const MEASUREMENT_ID = import.meta.env.VITE_MEASUREMENT_ID;

const firebaseConfig = {
   apiKey: API_KEY,
   authDomain: AUTH_DOMAIN,
   projectId: PROJECT_ID,
   storageBucket: STORAGE_BUCKET,
   messagingSenderId: MESSAGE_ING_SENDER_ID,
   appId: APP_ID,
   measurementId: MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const userSignUp = async (userData) => {
   try {
      const { email, password } = userData;
      if(!email || !password) throw Error("Faltan campos que completar")
      const userCreate = await createUserWithEmailAndPassword(auth, email, password)
      return userCreate
   } catch (error) {
      return error.code
   }
}

export const userSignIn = async (userData) => {
   try {
      const { email, password } = userData;
      if(!email || !password) throw Error("Faltan campos que completar")
      const response = await signInWithEmailAndPassword(auth, email, password)
      return response;
   }catch (error) {
      return error.code;
   }
}

export const signInGoogle = async () => {
   return await signInWithPopup(auth, provider)
}