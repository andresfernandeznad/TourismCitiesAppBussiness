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

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {

    var user = firebase.auth().currentUser;
    window.location = "/main.html"

    document.getElementById("logoutbutton").style.display = "block";
    if (user != null) {
      console.log(user);
    }
  } else {
  }
});

function login() {

  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("pass").value;

  if (userEmail === "manager@gmail.com") {

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      swal("Contraseña incorrecta");
    });
  } else {
    swal("Correo incorrecto");
  }

}

function logout() {
  firebase.auth().signOut();
  document.getElementById("loginDiv").style.display = "block";
}

window.onload = function () {
  var s = Snap("#puntero");
  var i = Snap("#imagen");
  Snap.load("snap/tourismIconAni.svg", function (f) {
    circulo = f.select("#circulo");
    parteSuperior = f.select("#parteSuperior");
    parteInferior = f.select("#parteInferior");
    puntero = f.select("#puntero");
    s.append(f);
  });

  Snap.load("snap/tourismIconAni.svg", function (f) {
    circulo = f.select("#circulo");
    parteSuperior = f.select("#parteSuperior");
    parteInferior = f.select("#parteInferior");
    imagen = f.select("#puntero");
    i.append(f);
  });
}