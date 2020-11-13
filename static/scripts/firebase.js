 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBIPkxhIND8Qd5a5nRWxlFR0gn2KqIcNLU",
    authDomain: "appgang1-1a58d.firebaseapp.com",
    databaseURL: "https://appgang1-1a58d.firebaseio.com",
    projectId: "appgang1-1a58d",
    storageBucket: "appgang1-1a58d.appspot.com",
    messagingSenderId: "823292142005",
    appId: "1:823292142005:web:af80ca96fe2a6699a2f9fc",
    measurementId: "G-PGJZ5B6CWZ"

  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //constants for firebase

  const auth = firebase.auth();
  const db = firebase.firestore();

  //
  firebase.auth.Auth.Persistence.LOCAL;
