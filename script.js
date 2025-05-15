// script.js

// Quando o DOM estiver completamente carregado...
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os elementos de projeto (cards)
  const cards = document.querySelectorAll(".card");

  // Anima os cards: torna-os visíveis e remove o deslocamento vertical
  cards.forEach(card => {
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  });

  // Prepara o som coin.mp3. Certifique-se de que o arquivo coin.mp3 esteja na mesma pasta ou ajuste o caminho.
  const coinSound = new Audio("coin.mp3");

  // Adiciona um event listener para cada card que, ao ser clicado, toca o som coin.mp3.
  cards.forEach(card => {
    card.addEventListener("click", () => {
      coinSound.play().catch(error => {
        console.error("Erro ao reproduzir coin.mp3:", error);
      });
    });
  });
});
