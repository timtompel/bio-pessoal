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