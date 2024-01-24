import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

export const app = initializeApp({
  apiKey: 'AIzaSyAo_-kDTxolBxtRZshgDqHbHI0L-3OJ_Co',
  authDomain: 'test-todo-7b8ff.firebaseapp.com',
  projectId: 'test-todo-7b8ff',
  storageBucket: 'test-todo-7b8ff.appspot.com',
  messagingSenderId: '41743400669',
  appId: '1:41743400669:web:a4d26ce00bb3794848a534',
});

export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
