const requisitos = {
    "Álgebra Lineal": ["Álgebra e Introducción al Cálculo"],
    "Cálculo I": ["Álgebra e Introducción al Cálculo"],
    "Introducción a la Mecánica": ["Álgebra e Introducción al Cálculo"],
    "Biología de los Microorganismos": ["Bases para el Estudio de la Ingeniería"],
    "Teología II": ["Teología I"],
    "Ecuaciones diferenciales": ["Álgebra Lineal", "Cálculo I"],
    "Cálculo II": ["Cálculo I"],
    "Mecánica y Ondas": ["Introducción a la Mecánica"],
    "Teología III": ["Teología II"],
    "Probabilidades y estadísticas": ["Cálculo II"],
    "Electricidad y Magnetismo": ["Cálculo II", "Mecánica y Ondas"],
    "Termodinámica": ["Cálculo II", "Mecánica y Ondas"],
    "Estática": ["Mecánica y Ondas"],
    "Filosofía de las Ciencias": ["Ética"],
    "Modelos Estocásticos": ["Optimización"],
    "Programación Matemática": ["Optimización"],
    "Simulación": ["Modelos Estocásticos"],
    "Diseño y Evaluación de Proyectos Industriales": ["Simulación"],
    "Gestión de Operaciones": ["Econometría"],
    "Finanzas II": ["Finanzas I"],
    "Proyecto de Título 2": ["Proyecto de Título 1"]
};

function updateCheckboxes() {
    for (const [ramo, reqs] of Object.entries(requisitos)) {
        const checkbox = document.getElementById(ramo);
        if (!checkbox) continue;
        const habilitado = reqs.every(r => {
            const reqCheckbox = document.getElementById(r);
            return reqCheckbox && reqCheckbox.checked;
        });
        checkbox.disabled = !habilitado;
    }
}

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateCheckboxes);
});

window.onload = updateCheckboxes;
