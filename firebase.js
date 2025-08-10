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
    document.getElementById("gmail-modal").classList.add("show");

    document.getElementById("save-gmail").addEventListener("click", () => {
        const gmail = document.getElementById("gmail-input").value.trim();
        if (gmail && gmail.includes("@gmail.com")) {
            localStorage.setItem("userGmail", gmail);
            firebase.database().ref("users").push({ email: gmail });
            alert("You are free to use the food selector now!");
            document.getElementById("gmail-modal").classList.remove("show");
        }
        else {
            alert("Please enter a valid Gmail Address!")
        }
    });
}
