let tareas = JSON.parse(localStorage.getItem("tareas")) || [
  { id: 1, titulo: "Configurar repositorio", descripcion: "Aplicar Git Flow con 5 ramas" }
];

const formTarea = document.getElementById("form-tarea");
const inputId = document.getElementById("tarea-id");
const inputTitulo = document.getElementById("titulo");
const inputDescripcion = document.getElementById("descripcion");
const btnGuardar = document.getElementById("btn-guardar");
const listaTareas = document.getElementById("lista-tareas");

function guardarEnStorage() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function renderizarTareas() {
  listaTareas.innerHTML = "";
  tareas.forEach((tarea) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${tarea.id}</td>
      <td>${tarea.titulo}</td>
      <td>${tarea.descripcion}</td>
      <td>
        <button type="button" onclick="prepararEdicion(${tarea.id})">Editar</button>
        <button type="button" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
      </td>
    `;
    listaTareas.appendChild(fila);
  });
}

function prepararEdicion(id) {
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) return;
  inputId.value = tarea.id;
  inputTitulo.value = tarea.titulo;
  inputDescripcion.value = tarea.descripcion;
  btnGuardar.textContent = "Actualizar Tarea";
}

function eliminarTarea(id) {
  tareas = tareas.filter((t) => t.id !== id);
  if (Number(inputId.value) === id) {
    inputId.value = "";
    btnGuardar.textContent = "Agregar Tarea";
    formTarea.reset();
  }
  guardarEnStorage();
  renderizarTareas();
}

formTarea.addEventListener("submit", (e) => {
  e.preventDefault();
  const idEdicion = inputId.value;
  const titulo = inputTitulo.value.trim();
  const descripcion = inputDescripcion.value.trim();

  if (idEdicion) {
    tareas = tareas.map((t) =>
      t.id === Number(idEdicion) ? { ...t, titulo, descripcion } : t
    );
    inputId.value = "";
    btnGuardar.textContent = "Agregar Tarea";
  } else {
    tareas.push({
      id: Date.now(),
      titulo,
      descripcion
    });
  }

  guardarEnStorage();
  renderizarTareas();
  formTarea.reset();
});

renderizarTareas();