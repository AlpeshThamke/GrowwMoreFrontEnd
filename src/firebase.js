import firebase from "firebase/app"
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
})
//I have intentionally removed these values, you can add your api values provided by firebase
export const auth = app.auth()
export default app;
