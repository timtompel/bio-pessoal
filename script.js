document.addEventListener("DOMContentLoaded", () => {
  // 1. Anima os cards dos projetos para que fiquem visíveis
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  });

  // 2. Configura o som coin.mp3 para as redes sociais
  // Certifique-se de que o arquivo coin.mp3 está em assets/sound/coin.mp3
  const coinSound = new Audio("assets/sound/coin.mp3");
  coinSound.volume = 1.0;
  
  const socialLinks = document.querySelectorAll(".redes-sociais a");
  socialLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      coinSound.currentTime = 0; // Reinicia o som
      coinSound.play().catch(error => {
        console.error("Erro ao tentar reproduzir coin.mp3:", error);
      });
    });
  });

  // 3. Configura o player moderno para reproduzir faixa1.mp3
  // Estes elementos devem existir no HTML para que a funcionalidade seja ativada.
  const audio = document.getElementById("audio");
  const playPause = document.getElementById("playPause");
  const progressContainer = document.getElementById("progressContainer");
  const progress = document.getElementById("progress");
  const currentTimeElem = document.getElementById("currentTime");
  const durationElem = document.getElementById("duration");

  // Verifica se o player está presente na página
  if (audio && playPause && progressContainer && progress && currentTimeElem && durationElem) {
    // Função para formatar o tempo em minutos e segundos
    function formatTime(time) {
      const minutes = Math.floor(time / 60) || 0;
      const seconds = Math.floor(time % 60) || 0;
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    // Atualiza a duração total assim que os metadados forem carregados
    audio.addEventListener("loadedmetadata", () => {
      durationElem.textContent = formatTime(audio.duration);
    });

    // Atualiza a barra de progresso e o tempo atual durante a reprodução
    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percent + "%";
        currentTimeElem.textContent = formatTime(audio.currentTime);
      }
    });

    // Botão de play/pause: alterna entre reproduzir e pausar
    playPause.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playPause.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        audio.pause();
        playPause.innerHTML = '<i class="fas fa-play"></i>';
      }
    });

    // Permite que o usuário avance na faixa ao clicar na barra de progresso
    progressContainer.addEventListener("click", function(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      if (audio.duration) {
        audio.currentTime = (clickX / width) * audio.duration;
      }
    });
  }
});
