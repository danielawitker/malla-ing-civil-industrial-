// Prerrequisitos de cada ramo (ramos que deben estar aprobados para desbloquear este)
const prerequisitos = {
  'algebra_lineal': ['algebra_intro'],
  'calculo1': ['algebra_intro'],
  'mecanica': ['algebra_intro'],
  'biologia_micro': ['bases_ingenieria'],
  'teologia2': ['teologia1'],
  'ecuaciones': ['algebra_lineal', 'calculo1'],
  'calculo2': ['calculo1'],
  'mecanica_ondas': ['mecanica'],
  'prob_estad': ['calculo2'],
  'electromagnetismo': ['calculo2', 'mecanica_ondas'],
  'termodinamica': ['calculo2', 'mecanica_ondas'],
  'estatica': ['mecanica_ondas'],
  'filosofia_ciencia': ['etica'],
  'optimizacion': [],
  'modelos_estoc': ['optimizacion'],
  'prog_matematica': ['optimizacion'],
  'simulacion': ['modelos_estoc'],
  'gestion_operaciones': ['econometria'],
  'finanzas2': ['finanzas1'],
  'diseno_eval_proyectos': ['simulacion'],
  'proyecto2': ['proyecto1'],
  'seminario': []
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

// Maneja el clic para aprobar o desaprobar un ramo (solo si no está bloqueado)
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

// Al cargar la página, asignar eventos, cargar progreso y actualizar desbloqueos
window.addEventListener('DOMContentLoaded', () => {
  const todosRamos = document.querySelectorAll('.ramo');

  const aprobados = obtenerAprobados();
  todosRamos.forEach(ramo => {
    if (aprobados.includes(ramo.id)) {
      ramo.classList.add('aprobado');
    }
  });

  todosRamos.forEach(ramo => {
    ramo.addEventListener('click', () => aprobar(ramo.id));
  });

  actualizarDesbloqueos();
});
