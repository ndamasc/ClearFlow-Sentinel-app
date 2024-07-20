import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyBfo80E3UuaXzFiWthF07QVcGrqLD7cwr8",
    authDomain: "sist-react.firebaseapp.com",
    databaseURL: "https://sist-react-default-rtdb.firebaseio.com",
    projectId: "sist-react",
    storageBucket: "sist-react.appspot.com",
    messagingSenderId: "174893528876",
    appId: "1:174893528876:web:d504fb1ca637bd46ca9e89",
};

const firebase_app = initializeApp(firebaseConfig);
const firebase_auth = getAuth(firebase_app);