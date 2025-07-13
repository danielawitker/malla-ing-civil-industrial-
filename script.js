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
  'economia': ['algebra_intro'],
  'teologia3': ['teologia2'],
  'minor1': ['algebra_intro', 'programacion', 'bases_ingenieria', 'quimica', 'taller_proyectos']
  'prob_estad': ['calculo2'],
  'electromagnetismo': ['calculo2', 'mecanica_ondas'],
  'termodinamica': ['quimica', 'calculo2', 'mecanica_ondas'],
  'estatica': ['calculo1', 'mecanica_ondas'],
  'minor2': ['minor1'],
  'etica': ['antropologia'],
  'optimizacion': ['calculo2'],
  'metodos_estad': ['prob_estad'],
  'contabilidad': ['economia'],
  'concentracion1': ['prob_estad', 'electromagnetismo', 'termodinamica', 'estatica', 'etica', 'minor2'],
  'filosofia_ciencia': ['etica'],
  'minor3': ['minor2'],
  'modelos_estoc': ['prob_estad', 'optimizacion'],
  'prog_matematica': ['prob_estad','optimizacion'],
  'bases_datos': ['programacion'],
  'simulacion': ['metodos_estad', 'modelos_estoc'],
  'microeconomia': ['economia'],
  'concentracion2': ['optimizacion', 'metodos_estad', 'contabilidad', 'concentracion1'],
  'econometria': ['metodos_estad'],
  'finanzas1': ['contabilidad'],
  'concentracion3': ['modelos_estoc', 'prog_matematica', 'bases_datos', 'microeconomia', 'concentracion2'],
  'pensamiento_diseno': ['modelos_estoc', 'prog_matematica', 'bases_datos', 'microeconomia', 'concentracion2'],
  'gestion_operaciones': ['econometria'],
  'finanzas2': ['finanzas1'],
  'diseno_eval_proyectos': ['simulacion'],
  'proyecto2': ['proyecto1']
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

// Esta es la función que se llama desde el HTML al hacer clic
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

// Al cargar la página, aplicar estilos y desbloquear ramos
window.addEventListener('DOMContentLoaded', () => {
  const aprobados = obtenerAprobados();
  aprobados.forEach(id => {
    const elem = document.getElementById(id);
    if (elem) elem.classList.add('aprobado');
  });

  actualizarDesbloqueos();
});
