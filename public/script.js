// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAZakrtb-v0Aon7r0dJoKISHP3cnp6hE8g",
    authDomain: "tourism-cities.firebaseapp.com",
    databaseURL: "https://tourism-cities.firebaseio.com",
    projectId: "tourism-cities",
    storageBucket: "tourism-cities.appspot.com",
    messagingSenderId: "634845537853"
  };
  firebase.initializeApp(config)

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    var user = firebase.auth().currentUser;
    window.location = "/main.html"
    //document.getElementById("loginDiv").style.display = "none";
    
    
    document.getElementById("logoutbutton").style.display = "block";
    if(user != null){
        console.log(user);
    }

  } else {
  }
});

function login(){

  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("pass").value;
  //admin1234 contraseña

  if (userEmail === "admin@gmail.com") {

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error : " + errorMessage);
    });
  } else {
    console.log("Usuario incorrecto");
  }

}

function logout(){
  firebase.auth().signOut();
  console.log("Aaaaa");
  document.getElementById("loginDiv").style.display = "block";
}