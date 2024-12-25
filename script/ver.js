// Mock: Lista de provas e respostas
const provas = [
  {
    id: 1,
    titulo: "Prova de Matemática",
    pdfLink: "pdfs/prova-matematica.pdf",
    respostasLink: "pdfs/respostas-matematica.pdf",
  },
  {
    id: 2,
    titulo: "Prova de Português",
    pdfLink: "pdfs/prova-portugues.pdf",
    respostasLink: "pdfs/respostas-portugues.pdf",
  },
  {
    id: 3,
    titulo: "Prova de Ciências",
    pdfLink: "pdfs/prova-ciencias.pdf",
    respostasLink: "pdfs/respostas-ciencias.pdf",
  },
];

const provasContainer = document.getElementById("provasContainer");

// Renderizar provas
provas.forEach((prova) => {
  const provaDiv = document.createElement("div");
  provaDiv.classList.add("prova");

  const titulo = document.createElement("h3");
  titulo.textContent = prova.titulo;
  provaDiv.appendChild(titulo);

  const btnDownloadProva = document.createElement("button");
  btnDownloadProva.textContent = "Baixar Prova (PDF)";
  btnDownloadProva.classList.add("btn-download");
  btnDownloadProva.onclick = () => {
    window.open(prova.pdfLink, "_blank");
  };
  provaDiv.appendChild(btnDownloadProva);

  const btnDownloadRespostas = document.createElement("button");
  btnDownloadRespostas.textContent = "Baixar Respostas (PDF)";
  btnDownloadRespostas.classList.add("btn-answers");
  btnDownloadRespostas.onclick = () => {
    window.open(prova.respostasLink, "_blank");
  };
  provaDiv.appendChild(btnDownloadRespostas);

  provasContainer.appendChild(provaDiv);
});
