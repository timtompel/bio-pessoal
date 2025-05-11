document.addEventListener("DOMContentLoaded", function() {
    const socialButtons = document.querySelectorAll(".redes-sociais a");

    socialButtons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.2)";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        });
    });
});
