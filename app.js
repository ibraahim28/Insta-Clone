const firebaseConfig = {
  apiKey: "AIzaSyDm-8sDwJacDCRIShQ5YfmjWGx0MqGDrR8",
  authDomain: "insta-clone-d2d2e.firebaseapp.com",
  projectId: "insta-clone-d2d2e",
  storageBucket: "insta-clone-d2d2e.appspot.com",
  messagingSenderId: "32338974701",
  appId: "1:32338974701:web:074aeb640a4b426d59f9e4",
};

var provider = new firebase.auth.GoogleAuthProvider();

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

var userData = {};

function showLoginForm() {
  document.getElementById("login-form").classList.remove("hidden");
  document.getElementById("signup-form").classList.add("hidden");
  document.getElementById("login-tab").classList.add("active-tab");
  document.getElementById("signup-tab").classList.remove("active-tab");
}

function showSignupForm() {
  document.getElementById("signup-form").classList.remove("hidden");
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("signup-tab").classList.add("active-tab");
  document.getElementById("login-tab").classList.remove("active-tab");
}

function signup_with_email() {
  const signup_email = document.getElementById("signup-email").value;
  const signup_pass = document.getElementById("signup-password").value;
  const userName = document.getElementById("username").value;
  let userProfileURL = document.getElementById("profile_pic").value;
  console.log("User profile url ==>> ", userProfileURL);

  if (userProfileURL) {
    userData.profile_url = userProfileURL;
  } else {
    userData.profile_url = "default";
  }
  console.log("Checking profile url", userData);

  console.log("Creating user");
  auth
    .createUserWithEmailAndPassword(signup_email, signup_pass)
    .then((userCredential) => {
      var user = userCredential.user;
      db.collection("users")
        .add({
          userName: userName,
          email: signup_email,
          uid: user.uid,
          profile_url: userData.profile_url,
        })
        .then(() => {
          console.log("User successfully created");
          login_with_email(signup_email, signup_pass);
        })
        .catch((e) => console.log(e));
    })
    .catch((error) => {
      console.log("Error", error.message);
      alert(error.message);
    });
}

function login_with_email(email, password) {
  if (email || password) {
    const login_email = email;
    const login_pass = password;
    auth
      .signInWithEmailAndPassword(login_email, login_pass)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user.uid);
        localStorage.setItem("user_id", user.uid);
        getMyData(user.uid);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
      });
  } else {
    const login_email = document.getElementById("login-email").value;
    const login_pass = document.getElementById("login-password").value;
    auth
      .signInWithEmailAndPassword(login_email, login_pass)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("UID ", user.uid);
        localStorage.setItem("user_id", user.uid);
        getMyData(user.uid);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
      });
  }
  // auth
  //   .signInWithEmailAndPassword(login_email, login_pass)
  //   .then((userCredential) => {
  //     // Signed in
  //     var user = userCredential.user;
  //     console.log(user.uid);
  //     localStorage.setItem("user_id", user.uid);
  //     getMyData(user.uid);
  //     // ...
  //   })
  //   .catch((error) => {
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //   });
}

function getMyData(uid) {
  let acc_profile = document.getElementById("profile_picture");

  console.log("Getting data from database");
  db.collection("users")
    .where("uid", "==", uid)
    .get()
    .then((data) => {
      data.forEach((element) => {
        Object.assign(userData, element.data());
        console.log("After assigning ==>> ", userData);

        if (userData.profile_url === "default") {
          console.log("User did not provide profile, using default ", userData);
          acc_profile.src = "./img/icons/profile.svg";
        } else {
          console.log("user provided img url ", userData.profile_url);
          acc_profile.src = userData.profile_url;
        }
      });
      const form_div = document.getElementById("form_div");
      const acc_wrapper = document.getElementById("acc_section");

      form_div.classList.add("hidden");
      acc_wrapper.classList.remove("hidden");

      const acc_name = document.getElementById("account_name");
      const acc_email = document.getElementById("account_email");

      acc_name.innerHTML = userData.userName;
      acc_email.innerHTML = userData.email;
      // if (profile) {
      //   console.log("Profile exists", profile);
      //   acc_profile.src = profile;
      //   console.log(acc_profile.src);
      // }
    })
    .catch((e) => {
      console.log(e);
    });
}

function onReload() {
  const user_id = localStorage.getItem("user_id");
  if (user_id) {
    getMyData(user_id);
  } else {
    const form_div = document.getElementById("form_div");
    const acc_wrapper = document.getElementById("acc_section");

    form_div.classList.remove("hidden");
    acc_wrapper.classList.add("hidden");
  }
}

function logout() {
  localStorage.removeItem("user_id");
  window.location.reload();
}

function openModal() {
  if (userData.uid) {
    const modal = document.getElementById("post-modal");
    const overlay = document.getElementById("overlay");

    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
  } else {
    alert("Please Login before creating a post");
  }
}

function closeModal() {
  const modal = document.getElementById("post-modal");
  const overlay = document.getElementById("overlay");

  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
onReload();
