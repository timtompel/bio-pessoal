let sound = new Audio('https://www.myinstants.com/media/sounds/mario-coin.mp3');

// Desbloqueia o áudio na primeira interação do usuário
document.body.addEventListener('click', () => {
    sound.play().catch(() => {
        console.log('Áudio desbloqueado após interação do usuário.');
    });
}, { once: true });

// Adiciona o evento de mouseenter para os botões
document.querySelectorAll('.social').forEach(button => {
    button.addEventListener('mouseenter', () => {
        sound.currentTime = 0; // Reinicia o áudio
        sound.play();
    });
});