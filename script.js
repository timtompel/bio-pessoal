document.addEventListener("DOMContentLoaded", () => {
  // Seleciona os elementos de social e define o som com o caminho correto
  const coinSound = new Audio("assets/sound/coin.mp3");
  
  // Opcional: ajuste o volume se necessário
  coinSound.volume = 1.0;

  // Seleciona todos os links dentro da seção de redes sociais
  const socialLinks = document.querySelectorAll(".redes-sociais a");

  // Adiciona um listener de "mouseenter" a cada link para reproduzir o som
  socialLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      coinSound.currentTime = 0; // Reinicia o som
      coinSound.play().catch(error => {
        console.error("Erro ao tentar reproduzir coin.mp3:", error);
      });
    });
  });
});
