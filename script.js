// script.js

// Função para atualizar os gráficos
function atualizarGraficos(aluno) {
  const ctxRendimento = document
    .getElementById("graficoRendimento")
    .getContext("2d");
  const graficoRendimento = new Chart(ctxRendimento, {
    type: "bar",
    data: {
      labels: aluno.materias,
      datasets: [
        {
          label: "Rendimento (%)",
          data: aluno.desempenho,
          backgroundColor: ["#36a2eb", "#ff6384", "#4bc0c0", "#ffcd56"],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
    },
  });

  const ctxAulasFuturas = document
    .getElementById("graficoAulasFuturas")
    .getContext("2d");
  const graficoAulasFuturas = new Chart(ctxAulasFuturas, {
    type: "pie",
    data: {
      labels: aluno.materias,
      datasets: [
        {
          label: "Aulas Futuras",
          data: aluno.aulasFuturas,
          backgroundColor: ["#36a2eb", "#ff6384", "#4bc0c0", "#ffcd56"],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  // Gráfico de Linha: Rendimento nas matérias
  const ctxRendimentoMateria = document
    .getElementById("graficoRendimentoMateria")
    .getContext("2d");
  const graficoRendimentoMateria = new Chart(ctxRendimentoMateria, {
    type: "line",
    data: {
      labels: aluno.materias, // Matérias ao longo do eixo X
      datasets: [
        {
          label: "Rendimento ao Longo do Tempo (%)",
          data: aluno.rendimentoAoLongoTempo, // Supondo que este seja o progresso de cada aluno
          borderColor: "#FF5733",
          fill: false,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  });
}

// Função para selecionar o aluno e atualizar os gráficos
function atualizarAluno() {
  const alunoSelecionado = document.getElementById("seletor").value;

  const alunos = {
    "Roberval Júlio": {
      rendimento: 65,
      proximaAula: "Física - 14/11/2024",
      materias: ["Matemática", "Português", "História", "Ciências"],
      desempenho: [89, 60, 70, 50],
      aulasFuturas: [2, 1, 4],
      rendimentoAoLongoTempo: [100, 76, 43, 40], // Rendimento nas matérias ao longo do tempo
    },
    "Gustavo Fonseca": {
      rendimento: 92,
      proximaAula: "Química - 15/11/2024",
      materias: ["Matemática", "Português", "Química", "Biologia"],
      desempenho: [92, 88, 94, 90],
      aulasFuturas: [3, 2, 5],
      rendimentoAoLongoTempo: [85, 90, 60, 94],
    },
    "Noah Vieira": {
      rendimento: 40,
      proximaAula: "Biologia - 16/11/2024",
      materias: ["Matemática", "História", "Geografia", "Física"],
      desempenho: [60, 50, 45, 82],
      aulasFuturas: [1, 4, 2],
      rendimentoAoLongoTempo: [20, 45, 55, 77],
    },
    "Hiberon da Silva": {
      rendimento: 85,
      proximaAula: "História - 17/11/2024",
      materias: ["Matemática", "Física", "Química", "História"],
      desempenho: [85, 90, 99, 92],
      aulasFuturas: [2, 3, 1],
      rendimentoAoLongoTempo: [90, 100, 50, 90],
    },
  };

  const aluno = alunos[alunoSelecionado];

  // Atualiza informações do aluno
  document.getElementById(
    "nome-aluno"
  ).textContent = `Nome do Aluno: ${alunoSelecionado}`;
  document.getElementById(
    "rendimento-aluno"
  ).textContent = `Rendimento: ${aluno.rendimento}%`;
  document.getElementById(
    "aula-futura"
  ).textContent = `Próxima Aula: ${aluno.proximaAula}`;

  // Atualiza os gráficos
  atualizarGraficos(aluno);
}

// Inicializa com o primeiro aluno
atualizarAluno();

function mudarIdioma(idioma) {
  // Texto para Português
  const textosPT = {
    titulo: "Avalia 360 - Informações do Aluno",
    seletorLabel: "Selecionar Aluno: ",
    nomeAluno: "Nome do Aluno: João da Silva",
    rendimentoAluno: "Rendimento: 85%",
    aulaFutura: "Próxima Aula: Física - 14/11/2024",
    graficoRendimentoTitulo: "Rendimento Geral",
    graficoAulasFuturasTitulo: "Aulas Futuras",
    graficoRendimentoMateriaTitulo: "Rendimento nas Matérias",
  };

  // Texto para Espanhol
  const textosES = {
    titulo: "Avalia 360 - Información del Estudiante",
    seletorLabel: "Seleccionar Estudiante: ",
    nomeAluno: "Nombre del Estudiante: João da Silva",
    rendimentoAluno: "Rendimiento: 85%",
    aulaFutura: "Próxima Clase: Física - 14/11/2024",
    graficoRendimentoTitulo: "Rendimiento General",
    graficoAulasFuturasTitulo: "Clases Futuras",
    graficoRendimentoMateriaTitulo: "Rendimiento en las Materias",
  };

  let textos = idioma === "es" ? textosES : textosPT;

  // Atualizando os textos na página conforme o idioma selecionado
  document.getElementById("titulo").textContent = textos.titulo;
  document.getElementById("seletor-label").textContent = textos.seletorLabel;
  document.getElementById("nome-aluno").textContent = textos.nomeAluno;
  document.getElementById("rendimento-aluno").textContent =
    textos.rendimentoAluno;
  document.getElementById("aula-futura").textContent = textos.aulaFutura;
  document.getElementById("grafico-rendimento-titulo").textContent =
    textos.graficoRendimentoTitulo;
  document.getElementById("grafico-aulas-futuras-titulo").textContent =
    textos.graficoAulasFuturasTitulo;
  document.getElementById("grafico-rendimento-materia-titulo").textContent =
    textos.graficoRendimentoMateriaTitulo;
}
