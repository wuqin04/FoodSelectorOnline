// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBVGiDHCaxeGFBBE4U12IXDYk9gJYEFY9Y",
  authDomain: "foodselectoronline.firebaseapp.com",
  databaseURL: "https://foodselectoronline-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "foodselectoronline",
  storageBucket: "foodselectoronline.firebasestorage.app",
  messagingSenderId: "384626989745",
  appId: "1:384626989745:web:f31a9a2ecf12b36925a090",
  measurementId: "G-TW7CBXBTLS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Gmail prompt & save
const userGmail = localStorage.getItem("userGmail");

if (!userGmail) {
    const gmail = prompt("Enter your Gmail address:");
    if (gmail) {
        localStorage.setItem("userGmail", gmail);
        firebase.database().ref("users").push({ email: gmail });
        alert("Your Gmail has been saved!");
    }
}
