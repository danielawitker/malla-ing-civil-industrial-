document.addEventListener("DOMContentLoaded", () => {
  const requisitos = {
    // Año 1
    "Álgebra Lineal": ["Álgebra e Introducción al Cálculo"],
    "Cálculo I": ["Álgebra e Introducción al Cálculo"],
    "Introducción a la Mecánica": ["Álgebra e Introducción al Cálculo"],
    "Biología de los Microorganismos": ["Bases para el Estudio de la Ingeniería"],
    "Teología II": ["Teología I"],

    // Año 2
    "Cálculo II": ["Cálculo I"],
    "Ecuaciones diferenciales": ["Álgebra Lineal", "Cálculo I"],
    "Mecánica y Ondas": ["Introducción a la Mecánica"],
    "Electricidad y Magnetismo": ["Cálculo II", "Mecánica y Ondas"],
    "Termodinámica": ["Cálculo II", "Mecánica y Ondas"],
    "Estática": ["Mecánica y Ondas"],
    "Teología III": ["Teología II"],
    "Métodos Estadísticos para la Gestión": ["Probabilidades y estadísticas"],
    "Filosofía de las Ciencias": ["Ética"],

    // Año 3
    "Modelos Estocásticos": ["Optimización"],
    "Programación Matemática": ["Optimización"],
    "Simulación": ["Modelos Estocásticos"],

    // Año 4
    "Diseño y Evaluación de Proyectos Industriales": ["Simulación"],
    "Gestión de Operaciones": ["Econometría"],
    "Finanzas II": ["Finanzas I"],

    // Año 5
    "Proyecto de Título 2": ["Proyecto de Título 1"],
  };

  function actualizarEstado() {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    const estado = {};

    checkboxes.forEach((checkbox) => {
      const ramo = checkbox.id.replace("chk-", "").replace(/-/g, " ");
      estado[ramo] = checkbox.checked;
    });

    checkboxes.forEach((checkbox) => {
      const ramo = checkbox.id.replace("chk-", "").replace(/-/g, " ");
      const divCurso = checkbox.closest(".course");

      if (!requisitos[ramo]) {
        checkbox.disabled = false;
        return;
      }

      const habilitado = requisitos[ramo].every((req) => estado[req]);
      checkbox.disabled = !habilitado;

      if (!habilitado) {
        checkbox.checked = false;
      }
    });
  }

  document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
    checkbox.addEventListener("change", actualizarEstado);
  });

  actualizarEstado(); // Llamada inicial
});
