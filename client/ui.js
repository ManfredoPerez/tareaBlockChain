document.addEventListener("DOMContentLoaded", () => {
    App.init();
  });
  
  /**
   * Task form
   */
  const taskForm = document.querySelector("#taskForm");
  
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = taskForm["nombre"].value;
    const apellido = taskForm["apellido"].value;
    const carrera = taskForm["carrera"].value;
    const fecha = taskForm["fecha"].value;
    const promedio = taskForm["promedio"].value;
    App.createTask(nombre, apellido,carrera, fecha, promedio );
  });