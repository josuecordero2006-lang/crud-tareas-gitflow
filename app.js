let tareas = JSON.parse(localStorage.getItem("tareas")) || [
  { id: 1, titulo: "Configurar repositorio", descripcion: "Aplicar Git Flow con 5 ramas" }
];

const formTarea = document.getElementById("form-tarea");
const inputTitulo = document.getElementById("titulo");
const inputDescripcion = document.getElementById("descripcion");
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

formTarea.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = inputTitulo.value.trim();
  const descripcion = inputDescripcion.value.trim();

  const nuevaTarea = {
    id: Date.now(),
    titulo,
    descripcion
  };

  tareas.push(nuevaTarea);
  guardarEnStorage();
  renderizarTareas();
  formTarea.reset();
});

renderizarTareas();