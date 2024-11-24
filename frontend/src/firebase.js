// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCnt29W75LYM1VrCPAR4Ql_eCn26P-61s8",
    authDomain: "video-classifier-e9120.firebaseapp.com",
    projectId: "video-classifier-e9120",
    storageBucket: "video-classifier-e9120.firebasestorage.app",
    messagingSenderId: "90565039981",
    appId: "1:90565039981:web:b24e954dce5b0412f62c64",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const authService = {
  signup: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  },

  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }
};