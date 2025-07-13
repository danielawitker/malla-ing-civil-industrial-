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

  const estado = {}; // Guarda si ramo está aprobado

  function actualizarEstado() {
    document.querySelectorAll(".course").forEach((curso) => {
      const nombre = curso.id;
      const reqs = requisitos[nombre] || [];
      const desbloqueado = reqs.every((r) => estado[r]);
      
      if (estado[nombre]) {
        curso.classList.add("approved");
        curso.classList.remove("locked");
      } else if (!desbloqueado) {
        curso.classList.add("locked");
        curso.classList.remove("approved");
      } else {
        curso.classList.remove("approved");
        curso.classList.remove("locked");
      }
    });
  }

  document.querySelectorAll(".course").forEach((curso) => {
    curso.addEventListener("click", () => {
      const nombre = curso.id;
      const reqs = requisitos[nombre] || [];
      const desbloqueado = reqs.every((r) => estado[r]) || reqs.length === 0;
      if (!desbloqueado) return;
      estado[nombre] = !estado[nombre]; // alternar aprobado
      actualizarEstado();
    });
  });

  // Inicializa el estado
  actualizarEstado();
});
