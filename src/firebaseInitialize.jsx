import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAY1PeMprxaWNFa9h6TTe6QpLkDZvUsDuA",
  authDomain: "calstwitterclone.firebaseapp.com",
  projectId: "calstwitterclone",
  storageBucket: "calstwitterclone.appspot.com",
  messagingSenderId: "258361784931",
  appId: "1:258361784931:web:c1ca37ab756f832b3d5656",
  measurementId: "G-FK61QYXJ6R",
  databaseURL: "https://calstwitterclone-default-rtdb.firebaseio.com/"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
const database = getDatabase(firebaseApp)
const storage = getStorage(firebaseApp)

export {firebaseApp, auth, database, storage}
