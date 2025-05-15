// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Anima os cards dos projetos para que fiquem visíveis
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  });

  // Prepara o som coin.mp3 para ser reproduzido
  // Certifique-se de que o arquivo coin.mp3 esteja no mesmo diretório ou ajuste o caminho abaixo.
  const coinSound = new Audio("coin.mp3");

  // Seleciona todos os botões (links) das redes sociais
  const socialLinks = document.querySelectorAll(".redes-sociais a");

  // Para cada link, adiciona o evento que toca o som ao passar o mouse
  socialLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      // Recomeça o som caso ele já esteja tocando
      coinSound.currentTime = 0;
      coinSound.play().catch(error => {
        console.error("Erro ao reproduzir coin.mp3:", error);
      });
    });
  });
});
