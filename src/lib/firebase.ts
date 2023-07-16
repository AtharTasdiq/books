import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAfdweU8IEW-WG3ub_cYJ0oPXcmUoUdk6o",
  authDomain: "go-go-ride.firebaseapp.com",
  projectId: "go-go-ride",
  storageBucket: "go-go-ride.appspot.com",
  messagingSenderId: "503155554118",
  appId: "1:503155554118:web:e31759bf62c893de9e9747"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
