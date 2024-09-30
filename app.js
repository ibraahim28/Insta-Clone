const firebaseConfig = {
  apiKey: "AIzaSyDm-8sDwJacDCRIShQ5YfmjWGx0MqGDrR8",
  authDomain: "insta-clone-d2d2e.firebaseapp.com",
  projectId: "insta-clone-d2d2e",
  storageBucket: "insta-clone-d2d2e.appspot.com",
  messagingSenderId: "32338974701",
  appId: "1:32338974701:web:074aeb640a4b426d59f9e4"
};

var provider = new firebase.auth.GoogleAuthProvider();

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

var userData = {}

function showLoginForm() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-tab').classList.add('active-tab');
    document.getElementById('signup-tab').classList.remove('active-tab');
}
  
function showSignupForm() {
    document.getElementById('signup-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-tab').classList.add('active-tab');
    document.getElementById('login-tab').classList.remove('active-tab');
}

// function toggleLoading(isLoading) {
//     const submitButton = document.getElementById('signup-button');
//     if (isLoading) {
//         submitButton.disabled = true;
//         submitButton.innerText = "Signing up...";
//     } else {
//         submitButton.disabled = false;
//         submitButton.innerText = "Sign up";
//     }
// }

function signup_with_email() {
    let signup_email = document.getElementById("signup-email").value;
    let signup_pass = document.getElementById("signup-password").value;
    let userName = document.getElementById("username").value;

    // toggleLoading(true);
    auth.createUserWithEmailAndPassword(signup_email, signup_pass)
    .then((userCredential) => {
        var user = userCredential.user;
        return db.collection("users").doc(user.uid).set({
            userName: userName,
            email: signup_email,
            uid: user.uid
        });
    })
    .then(() => {
        // toggleLoading(false);
        console.log("User successfully created");
    })
    .catch((error) => {
        // toggleLoading(false);
        console.log("Error", error.message);
        alert(error.message);
    });
}
