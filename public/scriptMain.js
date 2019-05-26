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

function logout() {
  firebase.auth().signOut();
  window.location = "/index.html"
}

function exportarPDF() {
  var doc = new jsPDF();
  var activo = getChartActivo();
  if (activo === "usuariosCon") {
    data.conexionUsuarios.forEach(function (value, i) {
      doc.text(20, 10 + (i * 10),
        "Mes: " + value.mes + " " +
        "Cantidad: " + value.cantidad);
    });
    var newCanvasImg = usuariosConGraf.toDataURL("image/png", 1.0);
    doc.addImage(newCanvasImg, 'PNG', 10, 150, 180, 50)
    doc.save('UsuariosConectados.pdf');
  } else if (activo === "plataformas") {
    doc.text("Android: " + data.plataformasUtilizadas.android + "% " +
      "IOS: " + data.plataformasUtilizadas.ios + "%" +
      "Windows Phone: " + data.plataformasUtilizadas.windowsphone + "%", 20, 10);
    var newCanvasImg = plataformasUtilGraf.toDataURL("image/png", 1.0);
    doc.addImage(newCanvasImg, 'PNG', 10, 50, 180, 50)
    doc.save('PorcentajePlataformasUtilizadas.pdf');
  } else if (activo === "interaccion") {
    data.interaccionUsuarios.forEach(function (value, i) {
      doc.text(20, 10 + (i * 10),
        "Hora: " + value.hora + " " +
        "Tiempo: " + value.tiempo);
    });
    var newCanvasImg = interaccionGraf.toDataURL("image/png", 1.0);
    doc.addImage(newCanvasImg, 'PNG', 10, 100, 180, 50)
    doc.save('InteraccionUsuarios.pdf');
  } else if (activo === "retencion") {
    data.retencionUsuarios.forEach(function (value, i) {
      doc.text(20, 10 + (i * 10),
        "Mes: " + value.mes + " " +
        "Porcentaje: " + value.porcentaje);
    });
    var newCanvasImg = retencionGraf.toDataURL("image/png", 1.0);
    doc.addImage(newCanvasImg, 'PNG', 10, 150, 180, 50)
    doc.save('RetencionUsuarios.pdf');
  }
}

function exportarExcel() {
  var activo = getChartActivo();
  if (activo === "usuariosCon") {
    JSONToCSVConvertor(data.conexionUsuarios, "Usuarios Conectados", true);
  } else if (activo === "plataformas") {
    JSONToCSVConvertor(data.plataformasUtilizadas, "Porcentaje plataformas utilizadas", true);
  } else if (activo === "interaccion") {
    JSONToCSVConvertor(data.interaccionUsuarios, "Interacción usuarios", true);
  } else if (activo === "retencion") {
    JSONToCSVConvertor(data.retencionUsuarios, "Retención usuarios", true);
  }
}

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
  var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

  var CSV = '';

  CSV += ReportTitle + '\r\n\n';

  //This condition will generate the Label/Header
  if (ShowLabel) {
    var row = "";
    if (ReportTitle === "Porcentaje plataformas utilizadas") {
      row += "plataforma; porcentaje \n"
      row += "Android;" + arrData.android + "\n";
      row += "IOS;" + arrData.ios + "\n";
      row += "Windows phone;" + arrData.windowsphone + "\n";
    } else {
      for (var index in arrData[0]) {
        row += index + ';';
      }
    }

    row = row.slice(0, -1);
    CSV += row + '\r\n';
  }
  console.log(arrData.length);
  //1st loop is to extract each row
  for (var i = 0; i < arrData.length; i++) {
    var row = "";
    //2nd loop will extract each column
    for (var index in arrData[i]) {
      row += '"' + arrData[i][index] + '";';
    }

    row.slice(0, row.length - 1);
    CSV += row + '\r\n';
  }

  if (CSV == '') {
    alert("Invalid data");
    return;
  }

  //Generate a file name
  var fileName = "";
  //this will remove the blank-spaces from the title and replace it with an underscore
  fileName += ReportTitle.replace(/ /g, "_");

  //Initialize file format you want csv or xls
  var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

  //this trick will generate a temp <a /> tag
  var link = document.createElement("a");
  link.href = uri;

  //set the visibility hidden so it will not effect on your web-layout
  link.style = "visibility:hidden";
  link.download = fileName + ".csv";

  //this part will append the anchor tag and remove it after automatic click
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getChartActivo() {
  if (usuariosConGraf.style.display === "block") return "usuariosCon";
  if (plataformasUtilGraf.style.display === "block") return "plataformas";
  if (interaccionGraf.style.display === "block") return "interaccion";
  if (retencionGraf.style.display === "block") return "retencion";
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    if (user != null) {
      console.log(user);
    }

  } else {
    window.location = "/index.html"
  }
});
var data;
$.getJSON("https://tourism-cities.firebaseapp.com/informacion/actividadUsuarios.json", function (result) {
  //console.log(result)
  data = result;
  var myChart = new Chart(usuariosConGraf, {
    type: 'bar',
    data: {
      labels: [data.conexionUsuarios[0].mes, data.conexionUsuarios[1].mes, data.conexionUsuarios[2].mes, data.conexionUsuarios[3].mes, data.conexionUsuarios[4].mes, data.conexionUsuarios[5].mes, data.conexionUsuarios[6].mes, data.conexionUsuarios[7].mes, data.conexionUsuarios[8].mes, data.conexionUsuarios[9].mes, data.conexionUsuarios[10].mes, data.conexionUsuarios[11].mes],
      datasets: [{
        label: 'Número de usuarios conectados',
        data: [data.conexionUsuarios[0].cantidad, data.conexionUsuarios[1].cantidad, data.conexionUsuarios[2].cantidad, data.conexionUsuarios[3].cantidad, data.conexionUsuarios[4].cantidad, data.conexionUsuarios[5].cantidad, data.conexionUsuarios[6].cantidad, data.conexionUsuarios[7].cantidad, data.conexionUsuarios[8].cantidad, data.conexionUsuarios[9].cantidad, data.conexionUsuarios[10].cantidad, data.conexionUsuarios[11].cantidad,],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  var chart2 = new Chart(plataformasUtilGraf, {
    type: 'doughnut',
    data: {
      labels: [
        "Android",
        "IOS",
        "Windows phone"
      ],
      datasets: [{
        data: [data.plataformasUtilizadas.android, data.plataformasUtilizadas.ios, data.plataformasUtilizadas.windowsphone],
        backgroundColor: [
          'rgba(0, 0, 255, 0.4)',
          'rgba(255, 0, 0, 0.4)'
        ]
      }]

    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  var chart3 = new Chart(interaccionGraf, {
    type: 'line',
    data: {
      labels: [
        data.interaccionUsuarios[0].hora, data.interaccionUsuarios[1].hora, data.interaccionUsuarios[2].hora, data.interaccionUsuarios[3].hora, data.interaccionUsuarios[4].hora, data.interaccionUsuarios[5].hora
      ],
      datasets: [{
        data: [data.interaccionUsuarios[0].tiempo, data.interaccionUsuarios[1].tiempo, data.interaccionUsuarios[2].tiempo, data.interaccionUsuarios[3].tiempo, data.interaccionUsuarios[4].tiempo, data.interaccionUsuarios[5].tiempo],
        label: "Minutos",
        borderColor: '#A8159E',
        fill: false
      }]

    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  var chart4 = new Chart(retencionGraf, {
    type: 'horizontalBar',
    data: {
      labels: [data.retencionUsuarios[0].mes, data.retencionUsuarios[1].mes, data.retencionUsuarios[2].mes, data.retencionUsuarios[3].mes, data.retencionUsuarios[4].mes, data.retencionUsuarios[5].mes, data.retencionUsuarios[6].mes, data.retencionUsuarios[7].mes, data.retencionUsuarios[8].mes, data.retencionUsuarios[9].mes, data.retencionUsuarios[10].mes, data.retencionUsuarios[11].mes],
      datasets: [
        {
          label: "Porcentaje de retención de usuarios",
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3e95cd", "#8e5ea2", "#3e95cd", "#8e5ea2", "#3e95cd", "#8e5ea2", "#3e95cd", "#8e5ea2", "#3e95cd", "#8e5ea2"],
          data: [data.retencionUsuarios[0].porcentaje, data.retencionUsuarios[1].porcentaje, data.retencionUsuarios[2].porcentaje, data.retencionUsuarios[3].porcentaje, data.retencionUsuarios[4].porcentaje, data.retencionUsuarios[5].porcentaje, data.retencionUsuarios[6].porcentaje, data.retencionUsuarios[7].porcentaje, data.retencionUsuarios[8].porcentaje, data.retencionUsuarios[9].porcentaje, data.retencionUsuarios[10].porcentaje, data.retencionUsuarios[11].porcentaje]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Porcentaje de retención de usuarios'
      }
    }
  });
})

function usuariosConectados() {
  if (usuariosConGraf.style.display === "none") {
    plataformasUtilGraf.style.display = "none";
    interaccionGraf.style.display = "none";
    retencionGraf.style.display = "none"
    usuariosConGraf.style.display = "block";
  }

}


function plataformasUtilizadas() {
  if (plataformasUtilGraf.style.display === "none") {
    usuariosConGraf.style.display = "none";
    interaccionGraf.style.display = "none";
    retencionGraf.style.display = "none"
    plataformasUtilGraf.style.display = "block";
  }
}

function interaccionEnlace() {
  if (interaccionGraf.style.display === "none") {
    usuariosConGraf.style.display = "none";
    plataformasUtilGraf.style.display = "none";
    retencionGraf.style.display = "none"
    interaccionGraf.style.display = "block";
  }
}

function retencionEnlace() {
  if (retencionGraf.style.display === "none") {
    usuariosConGraf.style.display = "none";
    plataformasUtilGraf.style.display = "none";
    interaccionGraf.style.display = "none";
    retencionGraf.style.display = "block"
  }
}

var usuariosConGraf = document.getElementById('usuariosConectados');
var plataformasUtilGraf = document.getElementById('plataformasUtilizadasGraph');
var interaccionGraf = document.getElementById("interaccionGraph");
var retencionGraf = document.getElementById("retencionGraph");

plataformasUtilGraf.style.display = "none";
interaccionGraf.style.display = "none";
retencionGraf.style.display = "none"