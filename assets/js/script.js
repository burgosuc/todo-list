//Variables
let totalResultado = document.querySelector("#total-resultado");
let totalRealizadas = document.querySelector("#total-realizadas");
let botonAgregar = document.querySelector("#buttonAgregar");
let tablaTotales = document.querySelector("#tablaTotales");
let tablaRealizadas = document.querySelector("#tablaRealizadas");
let tablaVaciaTareas = document.querySelector("#mensaje-vacio-tareas");
let tablaVaciaRealizadas = document.querySelector("#mensaje-vacio-realizadas");

//Variable para el contador
let contadorTotalTareas = 0;

//Array con tareas iniciales
let tareasIniciales = [
  {
    id: 1,
    nombre: "Asistir a la clase el lunes",
  },
  {
    id: 2,
    nombre: "Leer la guia de estudio",
  },
  {
    id: 3,
    nombre: "Practicar los ejercicios de la guia de estudio",
  },
];

//Array de realizadas
let tareasRealizadas = [
  {
    id: 1,
    nombre: "Realizar el desafio 5",
  },
];

//Agregar tareas nuevas
botonAgregar.addEventListener("click", function () {
  let valorInput = document.querySelector("#textCajaAgregar");
  if (valorInput.value == "") {
    alert("Debe escribir la tarea, para agregarla 'Agregar'");
  } else {
    let tareaNueva = {
      id: tareasIniciales.length + 1,
      nombre: valorInput.value,
    };

    tareasIniciales.push(tareaNueva);
    refrescar();
    valorInput.value = "";
  }
});
function refrescar() {
  refrescarTareas();
  refrescarRealizadas();
}

// checkbox para marcar tareas realizadas
function conteoTareasRealizadas(v) {
  let textoNombre = v.previousSibling.innerHTML;
  if ((v.value.checked = true)) {
    var tareaNuevacheckbox = {
      id: tareasRealizadas.length + 1,
      nombre: textoNombre,
    };
  }
  tareasRealizadas.push(tareaNuevacheckbox);
  eliminarTarea();
  refrescar();
}

// check para restaurar la tarea
function restaurarTarea(v) {
  let textoNombre = v.previousSibling.innerHTML;
  if ((v.value.checked = true)) {
    var retornarTareaNuevacheckbox = {
      id: tareasIniciales.length + 1,
      nombre: textoNombre,
    };
  }
  tareasIniciales.push(retornarTareaNuevacheckbox);
  eliminarRealizada();
  refrescar();
}

//Eliminar tarea
function eliminarTarea(id) {
  const index = tareasIniciales.findIndex((ele) => ele.id == id);
  tareasIniciales.splice(index, 1);
  refrescarTareas();
  if (tareasIniciales.length === 0) {
    tablaVaciaTareas.style.display = "block";
  }
}

//Eliminar tareas realizada
function eliminarRealizada(id) {
  const index = tareasRealizadas.findIndex((ele) => ele.id == id);
  tareasRealizadas.splice(index, 1);
  refrescarRealizadas();
  if (tareasRealizadas.length === 0) {
    tablaVaciaRealizadas.style.display = "block";
  }
}

//Función de refresh de tareas
function refrescarTareas() {
  //Inicio de tabla Vacia
  tablaTotales.innerHTML = "";

  //Creación de primeras partes de la tabla de tareas
  let filaInicial = document.createElement("tr");
  let celda1Inicial = document.createElement("th");
  let celda2Inicial = document.createElement("th");

  //Imprimir texto destacado de la tabla de tareas
  celda1Inicial.innerHTML = "ID";
  celda2Inicial.innerHTML = "Tarea";

  //appendChild tareas
  tablaTotales.appendChild(filaInicial);
  filaInicial.appendChild(celda1Inicial);
  filaInicial.appendChild(celda2Inicial);

  //Ciclo for para recorrer el arreglo e imprimir tareas
  for (let x of tareasIniciales) {
    let fila = document.createElement("tr");
    let celda1 = document.createElement("td");
    let celda2 = document.createElement("td");
    let check = document.createElement("input");

    check.setAttribute("type", "checkbox");
    check.setAttribute("onchange", "conteoTareasRealizadas(this)");

    let cruz = document.createElement("button");

    cruz.innerHTML = "&#10060;";
    cruz.setAttribute("onclick", "eliminarTarea(this," + x.id + ")");
    cruz.setAttribute("class", "btn btn-without-border");

    celda1.innerHTML = x.id;
    celda2.innerHTML = x.nombre;

    tablaTotales.appendChild(fila);
    fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(check);
    fila.appendChild(cruz);
  }
  totalResultado.innerHTML =
    "Total: " + (tareasIniciales.length + tareasRealizadas.length);
}

function refrescarRealizadas() {
  //Inicio de tareas realizadas en blanco
  tablaRealizadas.innerHTML = "";

  //Creación de primeras partes de la tabla de realizadas
  let filaRealizadas = document.createElement("tr");
  let celda1Realizadas = document.createElement("th");
  let celda2Realizadas = document.createElement("th");

  //Imprimir texto destacado de la tabla de tareas realizadas
  celda1Realizadas.innerHTML = "ID";
  celda2Realizadas.innerHTML = "Tarea";

  //appendChild tareas realizadas
  tablaRealizadas.appendChild(filaRealizadas);
  filaRealizadas.appendChild(celda1Realizadas);
  filaRealizadas.appendChild(celda2Realizadas);

  //Ciclo for para recorrer array e imprimir tareas realizadas
  for (let x of tareasRealizadas) {
    let fila = document.createElement("tr");
    let celda1 = document.createElement("td");
    celda1.setAttribute("class", "text-decoration-line-through");
    let celda2 = document.createElement("td");
    celda2.setAttribute("class", "text-decoration-line-through");

    let ticket = document.createElement("button");
    ticket.innerHTML = "&#8634;";
    ticket.setAttribute("onclick", "restaurarTarea(this," + x.id + ")");
    ticket.setAttribute("class", "btn btn-without-border");

    let cruz = document.createElement("button");
    cruz.innerHTML = "&#10060;";
    cruz.setAttribute("onclick", "eliminarRealizada(this," + x.id + ")");
    cruz.setAttribute("class", "btn btn-without-border");

    celda1.innerHTML = x.id;
    celda2.innerHTML = x.nombre;

    tablaRealizadas.appendChild(fila);
    fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(ticket);
    fila.appendChild(cruz);
  }

  totalRealizadas.innerHTML = "Realizadas: " + tareasRealizadas.length;
}

//Función para iniciar pantalla
window.addEventListener("load", function () {
  refrescar();
});
