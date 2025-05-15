document.addEventListener("DOMContentLoaded", () => {
  // Anima os cards dos projetos para que fiquem visíveis (botões dos projetos)
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  });
  
  // Configura o som coin.mp3 – usando o caminho correto para o arquivo
  const coinSound = new Audio("assets/sound/coin.mp3");
  coinSound.volume = 1.0;
  
  // Seleciona os links das redes sociais
  const socialLinks = document.querySelectorAll(".redes-sociais a");
  socialLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      // Reinicia e reproduz o som quando o mouse passa sobre o link
      coinSound.currentTime = 0;
      coinSound.play().catch(error => {
        console.error("Erro ao tentar reproduzir coin.mp3:", error);
      });
    });
  });
});
