// Variáveis globais
let playlist = [];
let currentTrack = 0;
const audioPlayer = document.getElementById("audioPlayer");
const playlistElement = document.getElementById("playlist");
const startPlaybackButton = document.getElementById("startPlayback");

/** Atualiza as fontes do elemento <audio> para o URL fornecido */
function updateAudioSources(url) {
  audioPlayer.innerHTML = "";
  const sourceMP3 = document.createElement("source");
  sourceMP3.src = url;
  sourceMP3.type = "audio/mpeg";
  audioPlayer.appendChild(sourceMP3);
  // Se você tiver uma versão OGG, descomente o bloco abaixo:
  // const sourceOGG = document.createElement("source");
  // sourceOGG.src = url; // Utilize uma URL diferente se necessário
  // sourceOGG.type = "audio/ogg";
  // audioPlayer.appendChild(sourceOGG);
}

/** Carrega uma faixa pelo índice e atualiza a interface */
function loadTrack(index) {
  if (index < playlist.length) {
    const track = playlist[index];
    updateAudioSources(track.url);
    audioPlayer.load();
    updateActiveTrack(index);
  }
}

/** Atualiza o item ativo na lista da playlist */
function updateActiveTrack(index) {
  const items = playlistElement.getElementsByTagName("li");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("active");
  }
  if (items[index]) {
    items[index].classList.add("active");
  }
}

/** Inicia a reprodução da faixa selecionada */
function playTrack(index) {
  currentTrack = index;
  loadTrack(index);
  audioPlayer.play().catch(error => {
    console.error("Erro ao tentar reproduzir o áudio:", error);
  });
}

/** Popula a interface da playlist com os itens carregados */
function populatePlayer() {
  playlistElement.innerHTML = "";
  playlist.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = track.title;
    li.addEventListener("click", () => playTrack(index));
    playlistElement.appendChild(li);
  });
  loadTrack(currentTrack);
}

/** Função assíncrona para carregar e interpretar o arquivo playlist.m3u */
async function loadM3U() {
  try {
    const response = await fetch('playlist.m3u');
    if (!response.ok) throw new Error('Erro ao carregar playlist');
    const data = await response.text();
    const lines = data.split('\n').map(line => line.trim()).filter(line => line !== "");
    let newPlaylist = [];
    let currentTitle = "";
    lines.forEach(line => {
      if (line.startsWith("#EXTINF:")) {
        const commaIndex = line.indexOf(",");
        currentTitle = commaIndex !== -1 ? line.substring(commaIndex + 1).trim() : "Sem título";
      } else if (!line.startsWith("#")) {
        newPlaylist.push({ title: currentTitle || "Sem título", url: line });
        currentTitle = "";
      }
    });
    playlist = newPlaylist;
    populatePlayer();
  } catch (err) {
    console.error("Erro:", err);
    // Fallback: usa uma playlist padrão
    playlist = [
      { title: "Faixa 1", url: "audio1.mp3" },
      { title: "Faixa 2", url: "audio2.mp3" }
    ];
    populatePlayer();
  }
}

// Pré-carrega a próxima faixa para melhorar a performance
window.addEventListener('load', () => {
  audioPlayer.addEventListener('playing', () => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    const preloadAudio = new Audio();
    preloadAudio.src = playlist[nextTrack].url;
    preloadAudio.load();
  });
});

// Ao término da faixa, avançar para a próxima (loop infinito)
audioPlayer.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  playTrack(currentTrack);
});

// Inicia a reprodução após o clique (necessário para contornar bloqueios de autoplay)
startPlaybackButton.addEventListener("click", () => {
  playTrack(currentTrack);
  startPlaybackButton.style.display = "none";
});

// Carrega a playlist M3U ao iniciar
loadM3U();
