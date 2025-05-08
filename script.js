// Configuração de som para cliques e interações
let sound = new Audio('./dados/sound/coin.mp3'); // Caminho correto para o som

// Desbloqueia o áudio na primeira interação do usuário
document.body.addEventListener('click', () => {
    console.log('Tentando reproduzir o som...');
    sound.play().catch(error => {
        console.error('Erro ao tentar reproduzir o som:', error);
    });
}, { once: true });

// Adiciona o evento de mouseenter para os botões
document.querySelectorAll('.social').forEach(button => {
    button.addEventListener('mouseenter', () => {
        console.log('Mouse entrou no botão:', button);
        sound.currentTime = 0; // Reinicia o áudio
        sound.play().catch(error => {
            console.error('Erro ao tentar reproduzir o som no mouseenter:', error);
        });
    });
});

// Animação ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = "1"; // Torna visível
            card.style.transform = "translateY(0)"; // Move para a posição original
        }, index * 200); // Atraso de 200ms entre as animações das cartas
    });
});
