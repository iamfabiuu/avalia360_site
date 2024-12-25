// Função para gerar nomes aleatórios
function gerarNomeAleatorio() {
  const nomes = [
    "Ana Silva",
    "Carlos Souza",
    "Maria Oliveira",
    "João Pereira",
    "Fernanda Lima",
    "Eduardo Santos",
    "Beatriz Costa",
    "Lucas Almeida",
    "Juliana Rocha",
    "Gabriel Dias",
    "Camila Martins",
    "Renato Gomes",
    "Tatiane Alves",
    "Marcelo Carvalho",
    "Priscila Ferreira",
    "Felipe Barbosa",
    "Larissa Mendes",
    "Rafael Silva",
    "Paula Souza",
    "Mateus Costa",
    "Monique Oliveira",
    "Paulo Henrique",
    "Luciana Ribeiro",
    "Ricardo Pinto",
    "Carla Santos",
  ];
  return nomes[Math.floor(Math.random() * nomes.length)];
}

// Função para gerar uma turma com 25 alunos
function gerarTurma(curso) {
  const alunos = [];
  for (let i = 0; i < 25; i++) {
    alunos.push({
      nome: gerarNomeAleatorio(),
      matricula: Math.floor(Math.random() * 1000000),
      curso: curso,
    });
  }
  return alunos;
}

const cursos = [
  "Engenharia de Software",
  "Design Gráfico",
  "Administração de Empresas",
  "Medicina",
  "Psicologia",
  "Ciências da Computação",
  "Marketing Digital",
  "Direito",
];

const turmas = {};

// Função para gerar as turmas e preencher o seletor
function gerarTurmas() {
  cursos.forEach((curso) => {
    const alunos = gerarTurma(curso);
    turmas[curso] = alunos;
  });

  const cursoSelect = document.getElementById("cursoSelect");
  cursos.forEach((curso) => {
    const option = document.createElement("option");
    option.value = curso;
    option.textContent = curso;
    cursoSelect.appendChild(option);
  });
}

function exibirAlunos() {
  const cursoSelecionado = document.getElementById("cursoSelect").value;
  const turmaInfo = document.getElementById("turmaInfo");
  turmaInfo.innerHTML = "";

  if (cursoSelecionado) {
    const titulo = document.createElement("h2");
    titulo.innerText = `Alunos da Turma de ${cursoSelecionado}`;
    turmaInfo.appendChild(titulo);

    const tabela = document.createElement("table");
    const cabecalho = document.createElement("tr");
    cabecalho.innerHTML = "<th>Nome</th><th>Matrícula</th><th>Ações</th>";
    tabela.appendChild(cabecalho);

    turmas[cursoSelecionado].forEach((aluno) => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
                      <td>${aluno.nome}</td>
                      <td>${aluno.matricula}</td>
                      <td>
                          <div class="actions">
                              <button onclick="abrirModalEditarAluno('${aluno.matricula}')">Editar</button>
                              <button onclick="removerAluno('${aluno.matricula}')">Remover</button>
                          </div>
                      </td>
                  `;
      tabela.appendChild(linha);
    });

    turmaInfo.appendChild(tabela);
  }
}

// Função para exportar os dados da turma para um arquivo Excel
function exportarParaExcel() {
  const cursoSelecionado = document.getElementById("cursoSelect").value;
  if (!cursoSelecionado) {
    alert("Selecione uma turma para exportar!");
    return;
  }

  const alunos = turmas[cursoSelecionado];
  const ws = XLSX.utils.json_to_sheet(alunos);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, cursoSelecionado);

  // Salvar o arquivo Excel
  XLSX.writeFile(wb, `${cursoSelecionado}_turma.xlsx`);
}

// Função para ordenar os alunos por nome
function ordenarAlunos() {
  const cursoSelecionado = document.getElementById("cursoSelect").value;
  if (!cursoSelecionado) {
    alert("Selecione uma turma para ordenar!");
    return;
  }

  // Ordenar os alunos pela propriedade 'nome'
  turmas[cursoSelecionado].sort((a, b) => a.nome.localeCompare(b.nome));

  // Reexibir os alunos ordenados
  exibirAlunos();
}

// Função para abrir o modal de editar aluno
function abrirModalEditarAluno(matricula) {
  const aluno = encontrarAlunoPorMatricula(matricula);
  if (aluno) {
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("matricula").value = aluno.matricula;
    document.getElementById("modalTitle").innerText = "Editar Aluno";
    document
      .getElementById("modalButton")
      .setAttribute("onclick", `salvarAluno('${matricula}')`);
    document.getElementById("modal").style.display = "flex";
  }
}

// Função para abrir o modal de adicionar aluno
function abrirModalAdicionarAluno() {
  document.getElementById("nome").value = "";
  document.getElementById("matricula").value = "";
  document.getElementById("modalTitle").innerText = "Adicionar Aluno";
  document
    .getElementById("modalButton")
    .setAttribute("onclick", `salvarAluno()`);
  document.getElementById("modal").style.display = "flex";
}

// Função para salvar aluno
function salvarAluno(matricula) {
  const nome = document.getElementById("nome").value;
  const matriculaAluno = document.getElementById("matricula").value;
  const cursoSelecionado = document.getElementById("cursoSelect").value;

  if (nome && matriculaAluno && cursoSelecionado) {
    if (matricula) {
      const aluno = encontrarAlunoPorMatricula(matricula);
      aluno.nome = nome;
      aluno.matricula = matriculaAluno;
      alert(`Aluno com matrícula ${matricula} editado com sucesso!`);
    } else {
      turmas[cursoSelecionado].push({
        nome: nome,
        matricula: matriculaAluno,
        curso: cursoSelecionado,
      });
      alert(`Aluno ${nome} adicionado com sucesso!`);
    }

    fecharModal();
    exibirAlunos();
  } else {
    alert("Por favor, preencha todos os campos!");
  }
}

// Função para encontrar aluno por matrícula
function encontrarAlunoPorMatricula(matricula) {
  const cursoSelecionado = document.getElementById("cursoSelect").value;
  return turmas[cursoSelecionado].find((aluno) => aluno.matricula == matricula);
}

// Função para remover aluno
function removerAluno(matricula) {
  const cursoSelecionado = document.getElementById("cursoSelect").value;
  const alunoIndex = turmas[cursoSelecionado].findIndex(
    (aluno) => aluno.matricula == matricula
  );
  if (alunoIndex > -1) {
    turmas[cursoSelecionado].splice(alunoIndex, 1);
    alert(`Aluno com matrícula ${matricula} removido.`);
    exibirAlunos();
  }
}

// Função para fechar o modal
function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

// Chama a função para gerar as turmas ao carregar a página
window.onload = gerarTurmas;
