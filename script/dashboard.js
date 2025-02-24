document.getElementById("students").addEventListener("change", function () {
  const selectedName = this.value;
  const nameDisplay = document.getElementById("studentName");

  // Atualiza o nome
  nameDisplay.textContent = `Nome completo: ${selectedName}`;
  nameDisplay.classList.add("show");

  // Exibe as seções de gráficos
  const chartsContainer = document.getElementById("chartsContainer");
  chartsContainer.classList.add("show");

  // Atualiza os gráficos
  updateCharts(selectedName);
});

// Função para atualizar os gráficos com base no aluno
function updateCharts(studentName) {
  const gradesChart = document.getElementById("gradesChart");
  const performanceChart = document.getElementById("performanceChart");
  const deficitsChart = document.getElementById("deficitsChart");

  const gradesCtx = gradesChart.getContext("2d");
  const performanceCtx = performanceChart.getContext("2d");
  const deficitsCtx = deficitsChart.getContext("2d");

  // Definindo dados de exemplo para os gráficos
  let gradesData = [70, 80, 90, 85, 95];
  let performanceData = [60, 70, 80, 75, 85];
  let deficitsData = [20, 30, 40, 35, 25];

  // Se o aluno for João Silva, por exemplo, altere os dados
  if (studentName === "João Silva") {
    gradesData = [75, 85, 90, 80, 92];
    performanceData = [65, 75, 85, 77, 88];
    deficitsData = [18, 25, 35, 30, 20];
  } else if (studentName === "Maria Oliveira") {
    gradesData = [80, 90, 85, 88, 90];
    performanceData = [70, 80, 85, 80, 90];
    deficitsData = [15, 22, 28, 25, 18];
  } else if (studentName === "Carlos Souza") {
    gradesData = [65, 75, 80, 70, 85];
    performanceData = [60, 70, 75, 70, 78];
    deficitsData = [25, 35, 40, 38, 28];
  }

  // Verifique se os gráficos já foram inicializados, se sim, destrua-os antes de criar novamente
  if (window.gradesChartInstance) window.gradesChartInstance.destroy();
  if (window.performanceChartInstance)
    window.performanceChartInstance.destroy();
  if (window.deficitsChartInstance) window.deficitsChartInstance.destroy();

  // Gráfico de Notas
  window.gradesChartInstance = new Chart(gradesCtx, {
    type: "bar",
    data: {
      labels: [
        "1º Trimestre",
        "2º Trimestre",
        "3º Trimestre",
        "4º Trimestre",
        "5º Trimestre",
      ],
      datasets: [
        {
          label: "Notas",
          data: gradesData,
          backgroundColor: "#4CAF50",
          borderColor: "#388E3C",
          borderWidth: 1,
        },
      ],
    },
  });

  // Gráfico de Desempenho
  window.performanceChartInstance = new Chart(performanceCtx, {
    type: "line",
    data: {
      labels: [
        "1º Trimestre",
        "2º Trimestre",
        "3º Trimestre",
        "4º Trimestre",
        "5º Trimestre",
      ],
      datasets: [
        {
          label: "Desempenho",
          data: performanceData,
          backgroundColor: "rgba(33, 150, 243, 0.2)",
          borderColor: "#2196F3",
          borderWidth: 2,
        },
      ],
    },
  });

  // Gráfico de Áreas de Déficits
  window.deficitsChartInstance = new Chart(deficitsCtx, {
    type: "radar",
    data: {
      labels: ["Matemática", "Português", "Ciências", "História", "Geografia"],
      datasets: [
        {
          label: "Déficits",
          data: deficitsData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "#FF6384",
          borderWidth: 2,
        },
      ],
    },
  });
}

document.getElementById(
  "gradesChart",
  "performanceChart",
  "deficitsChart"
).height = 300; // Altere para a altura que deseja

const connectToDatabase = require("./database");
connectToDatabase();
