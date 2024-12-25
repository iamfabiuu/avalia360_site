// Mock: Provas e Respostas
const provas = {
  1: {
    titulo: "Prova de Matemática",
    questoes: [
      {
        pergunta: "Quanto é 2 + 2?",
        alternativas: ["1", "2", "3", "4", "5"],
        correta: 3,
      },
      {
        pergunta: "Quanto é 5 x 3?",
        alternativas: ["8", "15", "10", "5", "12"],
        correta: 1,
      },
    ],
  },
  2: {
    titulo: "Prova de Português",
    questoes: [
      {
        pergunta:
          "Qual a conjugação correta do verbo 'amar' na 1ª pessoa do singular no presente?",
        alternativas: ["Amo", "Amar", "Amei", "Amarei", "Amando"],
        correta: 0,
      },
    ],
  },
};

const selectProva = document.getElementById("selectProva");
const questoesContainer = document.getElementById("questoes");
const correcaoContainer = document.getElementById("correcaoContainer");
const resultadoDiv = document.getElementById("resultado");
const calcularNotaBtn = document.getElementById("calcularNota");

// Populate select
Object.keys(provas).forEach((id) => {
  const option = document.createElement("option");
  option.value = id;
  option.textContent = provas[id].titulo;
  selectProva.appendChild(option);
});

// Quando selecionar uma prova
selectProva.addEventListener("change", () => {
  const provaId = selectProva.value;

  if (!provaId) {
    correcaoContainer.style.display = "none";
    return;
  }

  const prova = provas[provaId];

  // Renderizar questões
  questoesContainer.innerHTML = "";
  prova.questoes.forEach((questao, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = `Q${index + 1}: ${questao.pergunta}`;
    questionDiv.appendChild(questionTitle);

    const alternativesList = document.createElement("ul");
    alternativesList.classList.add("alternatives");

    questao.alternativas.forEach((alt, altIndex) => {
      const listItem = document.createElement("li");

      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = `questao-${index}`;
      radioInput.value = altIndex;

      listItem.appendChild(radioInput);
      listItem.appendChild(document.createTextNode(alt));
      alternativesList.appendChild(listItem);
    });

    questionDiv.appendChild(alternativesList);
    questoesContainer.appendChild(questionDiv);
  });

  correcaoContainer.style.display = "block";
});

// Calcular nota
calcularNotaBtn.addEventListener("click", () => {
  const provaId = selectProva.value;
  const prova = provas[provaId];

  let acertos = 0;

  prova.questoes.forEach((questao, index) => {
    const selected = document.querySelector(
      `input[name="questao-${index}"]:checked`
    );

    if (selected && parseInt(selected.value) === questao.correta) {
      acertos++;
    }
  });

  const nota = ((acertos / prova.questoes.length) * 10).toFixed(2);
  resultadoDiv.textContent = `Nota do aluno: ${nota}`;
});
