// 1. Atualizar a Barra de Progresso
function updateProgressBar(progress) {
  const progressBar = document.querySelector(".progress-bar div");
  progressBar.style.width = `${progress}%`;
}

// Exemplo de uso da barra de progresso
updateProgressBar(70); // Ajuste conforme o progresso

// 2. Interatividade do Botão de Desafio
const challengeButton = document.querySelector(".btn"); // Botão de desafio

challengeButton.addEventListener("click", function () {
  challengeButton.innerHTML = "Desafio Aceito!"; // Muda o texto do botão
  challengeButton.style.backgroundColor = "#28a745"; // Troca a cor do botão para verde
  challengeButton.setAttribute("disabled", "true"); // Desabilita o botão após o clique
});

// 3. Notificações em Tempo Real
function showNotification(message) {
  const notificationContainer = document.querySelector(".notifications");

  // Cria o elemento de notificação
  const notification = document.createElement("div");
  notification.classList.add("notification-item");
  notification.innerText = message;

  // Adiciona ao container
  notificationContainer.appendChild(notification);

  // Remove a notificação após 3 segundos
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Exemplo de como chamar a notificação
showNotification("Você completou um novo desafio!");

// 4. Calendário de Estudos
const addEventButton = document.querySelector(".add-event-btn"); // Botão para adicionar evento
const calendarContainer = document.querySelector(".calendar-container");

addEventButton.addEventListener("click", function () {
  const eventDate = prompt("Digite a data do evento (formato: dd/mm/yyyy):");
  const eventDescription = prompt("Descreva o evento:");

  // Cria o item do evento
  const eventItem = document.createElement("div");
  eventItem.classList.add("calendar-event");
  eventItem.innerHTML = `<strong>${eventDate}</strong>: ${eventDescription}`;

  // Adiciona o evento ao calendário
  calendarContainer.appendChild(eventItem);
});

// 5. Perfil Personalizado do Aluno
const editProfileButton = document.querySelector(".edit-profile-btn"); // Botão de editar perfil
const profileName = document.querySelector(".profile-name"); // Nome do perfil

editProfileButton.addEventListener("click", function () {
  const newName = prompt("Digite seu novo nome:");
  if (newName) {
    profileName.innerText = newName; // Atualiza o nome do perfil
  }
});

// 6. Modo de Estudo Personalizado
const studyModeButtons = document.querySelectorAll(".study-mode button"); // Botões de modo de estudo

studyModeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const mode = this.innerText;

    alert(`Modo de estudo ${mode} ativado!`);

    // Pode adicionar mais funcionalidades aqui, como alterar o fundo ou o estilo do conteúdo
  });
});
