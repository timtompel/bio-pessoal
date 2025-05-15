document.addEventListener("DOMContentLoaded", function() {
    // Configuração do som
    let sound = new Audio('./assets/sound/coin.mp3');

    // Desbloqueia o áudio na primeira interação
    document.body.addEventListener('click', () => {
        sound.play().catch(error => console.error('Erro ao reproduzir o som:', error));
    }, { once: true });

    // Animação ao carregar os cards
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 200);
    });

    // Interação com botões das redes sociais
    const socialButtons = document.querySelectorAll(".redes-sociais a");
    socialButtons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            sound.currentTime = 0;
            sound.play().catch(error => console.error('Erro ao reproduzir som no mouseenter:', error));
            button.style.transform = "scale(1.2)";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        });
    });

    // Verificação de ícones carregados corretamente
    setTimeout(() => {
        socialButtons.forEach(button => {
            if (!button.innerHTML.trim()) {
                console.warn(`Ícone não carregado: ${button.href}`);
            }
        });
    }, 500);
});
