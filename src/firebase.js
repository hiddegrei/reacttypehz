
import firebase from "firebase";


const firebaseConfig = {
   apiKey: "AIzaSyDUBI0Gu6n_tO4wK9jV6dKzulCe6zfnVO4",
  authDomain: "the-compilers.firebaseapp.com",
  projectId: "the-compilers",
  storageBucket: "the-compilers.appspot.com",
  messagingSenderId: "165833853697",
  appId: "1:165833853697:web:af0a0922ac75b02b0f6900",
  measurementId: "G-Y64Y3HMRLE"
  };


  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage = firebase.storage();


 export {db,auth,storage}

//  import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDUBI0Gu6n_tO4wK9jV6dKzulCe6zfnVO4",
//   authDomain: "the-compilers.firebaseapp.com",
//   projectId: "the-compilers",
//   storageBucket: "the-compilers.appspot.com",
//   messagingSenderId: "165833853697",
//   appId: "1:165833853697:web:af0a0922ac75b02b0f6900",
//   measurementId: "G-Y64Y3HMRLE"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth=getAuth(app)
// export {db,auth}