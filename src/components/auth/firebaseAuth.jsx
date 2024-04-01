import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY1PeMprxaWNFa9h6TTe6QpLkDZvUsDuA",
  authDomain: "calstwitterclone.firebaseapp.com",
  projectId: "calstwitterclone",
  storageBucket: "calstwitterclone.appspot.com",
  messagingSenderId: "258361784931",
  appId: "1:258361784931:web:c1ca37ab756f832b3d5656",
  measurementId: "G-FK61QYXJ6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
export default async function signUp(email, password){
    const signUpResult = await createUserWithEmailAndPassword(auth, email, password)
    console.log(signUpResult)
    // signUpResult.then(
    //     (userCredential) => {
    //         console.log('signed up')
    //         const user = userCredential.user
    //         console.log('user: ', user)
    //     }
    // )
    // .catch((error) => {
    //     console.log(error)
    // })
}