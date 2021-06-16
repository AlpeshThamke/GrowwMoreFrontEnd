import firebase from "firebase/app"
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDdlKmuFVrkvFF7nG60RW-2xbjlbMSX3zM",
    authDomain: "growwmoreapp.firebaseapp.com",
    projectId: "growwmoreapp",
    storageBucket: "growwmoreapp.appspot.com",
    messagingSenderId: "668076641998",
    appId: "1:668076641998:web:d341fc1059d783088aca9f"
})

export const auth = app.auth()
export default app;
