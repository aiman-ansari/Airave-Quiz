import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCG6vwHwj8L_MCKNO8k-QwOyz1diNP4rnI",
  authDomain: "quiz-app-edd77.firebaseapp.com",
  projectId: "quiz-app-edd77",
  storageBucket: "quiz-app-edd77.appspot.com",
  messagingSenderId: "270679824759",
  appId: "1:270679824759:web:4b51fba84c8d07492f6972",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
