// Prerrequisitos ajustados según el PDF oficial de la malla
const prerequisitos = {
  // Año 1
  "algebra_lineal": ["algebra_intro", "programacion", "bases_ingenieria"],
  "calculo1": ["algebra_intro", "bases_ingenieria"],
  "mecanica": ["algebra_intro"],
  "economia": ["algebra_intro"],
  "biologia_micro": ["bases_ingenieria"],
  "teologia2": ["teologia1"],
  "optativo1": ["algebra_intro"], // Optativo Arte/Lit abre Minor1
  "etica": ["antropologia"],

  // Año 2
  "ecuaciones": ["algebra_lineal", "calculo1", "programacion"],
  "calculo2": ["calculo1", "programacion"],
  "mecanica_ondas": ["mecanica"],
  "minor1": ["optativo1"],
  "prob_estad": ["calculo2"],
  "electromagnetismo": ["calculo2", "mecanica_ondas"],
  "termodinamica": ["calculo2", "mecanica_ondas", "quimica"],
  "estatica": ["calculo1", "mecanica_ondas"],
  "teologia3": ["teologia2"],

  // Año 3
  "filosofia_ciencia": ["etica"],
  "minor2": ["minor1"],
  "minor3": ["minor2"],
  "optimizacion": ["calculo2"],
  "metodos_estad": ["prob_estad"],
  "contabilidad": [],
  "concentracion1": [],

  // Año 4
  "modelos_estoc": ["optimizacion", "prob_estad"],
  "prog_matematica": ["optimizacion", "prob_estad"],
  "bases_datos": ["programacion"],
  "microeconomia": ["economia"],
  "concentracion2": ["concentracion1"],
  "pensamiento_diseno": ["concentracion2"],
  "simulacion": ["modelos_estoc", "metodos_estad"],
  "econometria": ["metodos_estad"],
  "finanzas1": ["contabilidad"],

  // Año 5
  "diseno_eval_proyectos": ["simulacion"],
  "gestion_operaciones": ["econometria", "prog_matematica"],
  "finanzas2": ["finanzas1"],
  "macro": ["economia"],
  "gestion_estrategica": ["diseno_eval_proyectos"],
  "gestion_personas": ["diseno_eval_proyectos"],

  // Año 5 Sem IX
  "org_industrial": ["microeconomia"],
  "marketing": ["econometria"],
  "logistica": ["gestion_operaciones"],
  "mencion1": ["macro"],
  "electivo_esp1": ["macro"],

  // Año 5 Sem X
  "mencion2": ["org_industrial"],
  "electivo_esp2": ["org_industrial"],
  "seminario": ["org_industrial"],
  "proyecto1": ["org_industrial"],

  // Año 6
  "mencion3": ["gestion_estrategica"],
  "electivo_esp3": ["gestion_estrategica"],
  "proyecto2": ["proyecto1"]
};

// Funciones para guardar y cargar progreso en localStorage
function obtenerAprobados() {
  const data = localStorage.getItem('mallaAprobados');
  return data ? JSON.parse(data) : [];
}

function guardarAprobados(aprobados) {
  localStorage.setItem('mallaAprobados', JSON.stringify(aprobados));
}

// Actualiza qué ramos están desbloqueados o bloqueados según prerrequisitos
function actualizarDesbloqueos() {
  const aprobados = obtenerAprobados();

  for (const [destino, reqs] of Object.entries(prerequisitos)) {
    const elem = document.getElementById(destino);
    if (!elem) continue;

    let puedeDesbloquear = reqs.every(r => aprobados.includes(r));

    if (!elem.classList.contains('aprobado')) {
      if (puedeDesbloquear) elem.classList.remove('bloqueado');
      else elem.classList.add('bloqueado');
    } else {
      elem.classList.remove('bloqueado');
    }
  }
}

// Esta función se llama desde el HTML con onclick
function aprobar(id) {
  const ramo = document.getElementById(id);
  if (ramo.classList.contains('bloqueado')) return;

  ramo.classList.toggle('aprobado');

  const aprobados = obtenerAprobados();
  if (ramo.classList.contains('aprobado')) {
    if (!aprobados.includes(ramo.id)) aprobados.push(ramo.id);
  } else {
    const idx = aprobados.indexOf(ramo.id);
    if (idx > -1) aprobados.splice(idx, 1);
  }

  guardarAprobados(aprobados);
  actualizarDesbloqueos();
}

// Al cargar la página, marcar ramos aprobados y actualizar desbloqueos
window.addEventListener('DOMContentLoaded', () => {
  const aprobados = obtenerAprobados();
  aprobados.forEach(id => {
    const elem = document.getElementById(id);
    if (elem) elem.classList.add('aprobado');
  });

  actualizarDesbloqueos();
});
