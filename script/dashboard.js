document.getElementById("students").addEventListener("change", function () {
  const selectedName = this.value;
  const nameDisplay = document.getElementById("studentName");

  // Atualiza o nome
  nameDisplay.textContent = `Nome completo: ${selectedName}`;
  nameDisplay.classList.add("show");

  // Exibe as seções de gráficos
  const chartsContainer = document.getElementById("chartsContainer");
  chartsContainer.classList.add("show");

  // Exibe o botão de modificar dados após a seleção do aluno
  const editButton = document.getElementById("editButton");
  editButton.style.display = "block"; // Torna o botão visível

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

  // Dados padrão
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

  // Criar gráficos
  window.gradesChartInstance = createChart(
    gradesCtx,
    "bar",
    "Notas",
    gradesData,
    "#4CAF50",
    "#388E3C"
  );
  window.performanceChartInstance = createChart(
    performanceCtx,
    "line",
    "Desempenho",
    performanceData,
    "rgba(33, 150, 243, 0.2)",
    "#2196F3"
  );
  window.deficitsChartInstance = createChart(
    deficitsCtx,
    "radar",
    "Déficits",
    deficitsData,
    "rgba(255, 99, 132, 0.2)",
    "#FF6384"
  );
}

// Função para criar gráfico
function createChart(ctx, type, label, data, bgColor, borderColor) {
  return new Chart(ctx, {
    type: type,
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
          label: label,
          data: data,
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ],
    },
  });
}

// Criando o botão de editar dados e escondendo inicialmente
const editButton = document.createElement("button");
editButton.id = "editButton";
editButton.textContent = "Modificar Dados";
editButton.style.position = "fixed";
editButton.style.top = "10px";
editButton.style.right = "10px";
editButton.style.display = "none"; // Inicialmente oculto
editButton.style.padding = "10px 20px";
editButton.style.backgroundColor = "#4CAF50";
editButton.style.color = "#fff";
editButton.style.border = "none";
editButton.style.borderRadius = "5px";
editButton.style.cursor = "pointer";
editButton.style.transition = "all 0.3s ease";
editButton.addEventListener("mouseover", function () {
  this.style.backgroundColor = "#388E3C";
});
editButton.addEventListener("mouseout", function () {
  this.style.backgroundColor = "#4CAF50";
});
document.body.appendChild(editButton);

editButton.addEventListener("click", function () {
  // Cria o fundo escuro e com blur
  const blurBackground = document.createElement("div");
  blurBackground.style.position = "fixed";
  blurBackground.style.top = "0";
  blurBackground.style.left = "0";
  blurBackground.style.width = "100%";
  blurBackground.style.height = "100%";
  blurBackground.style.background = "rgba(0, 0, 0, 0.6)";
  blurBackground.style.backdropFilter = "blur(5px)";
  blurBackground.style.zIndex = "9998";
  document.body.appendChild(blurBackground);

  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "20px";
  popup.style.background = "#333"; // Fundo escuro
  popup.style.borderRadius = "8px"; // Bordas arredondadas
  popup.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)"; // Sombra suave
  popup.style.maxWidth = "400px"; // Largura máxima para não esticar muito
  popup.style.width = "100%"; // Responsivo
  popup.style.zIndex = "9999"; // Garantir que fique acima dos outros elementos
  popup.style.fontFamily = "'Just', sans-serif"; // Fonte consistente
  popup.style.color = "#fff"; // Cor de texto
  popup.style.border = "1px solid #444"; // Bordas sutis
  popup.style.transition = "all 0.3s ease-in-out";

  popup.innerHTML = `
    <h2 style="font-size: 18px; margin-bottom: 20px; color: #fff;">Modificar Dados</h2>
    <label style="display: block; margin-bottom: 10px; color: #ccc;">Notas: 
      <input id="gradesInput" type="text" value="${window.gradesChartInstance.data.datasets[0].data.join(
        ","
      )}" 
             style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #555; border-radius: 4px; background-color: #444; color: #fff;">
    </label>
    <label style="display: block; margin-bottom: 10px; color: #ccc;">Desempenho: 
      <input id="performanceInput" type="text" value="${window.performanceChartInstance.data.datasets[0].data.join(
        ","
      )}" 
             style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #555; border-radius: 4px; background-color: #444; color: #fff;">
    </label>
    <label style="display: block; margin-bottom: 20px; color: #ccc;">Déficits: 
      <input id="deficitsInput" type="text" value="${window.deficitsChartInstance.data.datasets[0].data.join(
        ","
      )}" 
             style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #555; border-radius: 4px; background-color: #444; color: #fff;">
    </label>
    <div style="display: flex; justify-content: space-between;">
      <button id="saveChanges" style="padding: 8px 16px; background-color: #4CAF50; color: #fff; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.3s;">
        Salvar
      </button>
      <button id="closePopup" style="padding: 8px 16px; background-color: #f44336; color: #fff; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.3s;">
        Fechar
      </button>
    </div>
  `;
  document.body.appendChild(popup);

  // Estilo de hover nos botões
  document
    .getElementById("saveChanges")
    .addEventListener("mouseover", function () {
      this.style.backgroundColor = "#388E3C";
    });
  document
    .getElementById("saveChanges")
    .addEventListener("mouseout", function () {
      this.style.backgroundColor = "#4CAF50";
    });

  document
    .getElementById("closePopup")
    .addEventListener("mouseover", function () {
      this.style.backgroundColor = "#D32F2F";
    });
  document
    .getElementById("closePopup")
    .addEventListener("mouseout", function () {
      this.style.backgroundColor = "#f44336";
    });

  document.getElementById("saveChanges").addEventListener("click", function () {
    const newGrades = document
      .getElementById("gradesInput")
      .value.split(",")
      .map(Number);
    const newPerformance = document
      .getElementById("performanceInput")
      .value.split(",")
      .map(Number);
    const newDeficits = document
      .getElementById("deficitsInput")
      .value.split(",")
      .map(Number);

    window.gradesChartInstance.data.datasets[0].data = newGrades;
    window.performanceChartInstance.data.datasets[0].data = newPerformance;
    window.deficitsChartInstance.data.datasets[0].data = newDeficits;

    window.gradesChartInstance.update();
    window.performanceChartInstance.update();
    window.deficitsChartInstance.update();

    document.body.removeChild(popup);
    document.body.removeChild(blurBackground); // Remove o fundo escuro
  });

  document.getElementById("closePopup").addEventListener("click", function () {
    document.body.removeChild(popup);
    document.body.removeChild(blurBackground); // Remove o fundo escuro
  });
});
