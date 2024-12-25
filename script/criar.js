let questionCount = 0;
const maxQuestions = 10;

function addQuestion() {
  if (questionCount >= maxQuestions) {
    alert("Você já adicionou o máximo de 10 questões.");
    return;
  }

  questionCount++;

  const questionContainer = document.createElement("div");
  questionContainer.className = "question-container";
  questionContainer.innerHTML = `
                <h3>Questão ${questionCount}</h3>
                <div class="form-group">
                    <label for="question-${questionCount}">Pergunta:</label>
                    <textarea id="question-${questionCount}" placeholder="Digite a pergunta aqui"></textarea>
                </div>
                <div class="form-group">
                    <label>Alternativas:</label>
                    ${[1, 2, 3, 4, 5]
                      .map(
                        (num) => `
                        <div class="alternativa">
                            <input type="radio" name="correct-${questionCount}" value="${num}">
                            <input type="text" placeholder="Alternativa ${num}">
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `;
  document.getElementById("questions-list").appendChild(questionContainer);
}

function saveProva() {
  const titulo = document.getElementById("titulo").value;
  const instrucoes = document.getElementById("instrucoes").value;
  const questions = [];

  for (let i = 1; i <= questionCount; i++) {
    const questionText = document.getElementById(`question-${i}`).value;
    const alternatives = Array.from(
      document.querySelectorAll(
        `#questions-list .question-container:nth-child(${i}) .alternativa input[type="text"]`
      )
    ).map((input) => input.value);
    const correctAnswer = document.querySelector(
      `input[name="correct-${i}"]:checked`
    )?.value;

    if (!questionText || alternatives.some((alt) => !alt) || !correctAnswer) {
      alert(`Por favor, preencha todos os campos da questão ${i}.`);
      return;
    }

    questions.push({
      question: questionText,
      alternatives,
      correct: correctAnswer,
    });
  }

  generatePDF(titulo, instrucoes, questions);
}

function generatePDF(titulo, instrucoes, questions) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 10;

  // Título e Instruções
  doc.setFontSize(16);
  doc.text(titulo, 10, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(instrucoes, 10, y);
  y += 20;

  // Questões e Alternativas
  questions.forEach((q, index) => {
    doc.setFontSize(12);
    doc.text(`Questão ${index + 1}: ${q.question}`, 10, y);
    y += 10;
    q.alternatives.forEach((alt, i) => {
      doc.text(`${String.fromCharCode(65 + i)}. ${alt}`, 10, y);
      y += 10;
    });
    y += 5;
    if (y > 270) {
      // Check for page overflow
      doc.addPage();
      y = 10;
    }
  });

  doc.save(`${titulo}.pdf`);
}
