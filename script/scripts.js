document.addEventListener("DOMContentLoaded", () => {
  // Seleciona os botões de controle e o contêiner interno do carrossel
  const prevButton = document.querySelector(".carousel-control.prev");
  const nextButton = document.querySelector(".carousel-control.next");
  const carouselInner = document.querySelector(".carousel-inner");
  const items = document.querySelectorAll(".carousel-item");

  // Define o índice do item atualmente visível
  let currentIndex = 0;

  // Função para atualizar o carrossel com base no índice atual
  function updateCarousel() {
    // Calcula o deslocamento necessário para mostrar o item atual
    const offset = -currentIndex * 100;
    // Aplica a transformação CSS para mover o contêiner para a posição correta
    carouselInner.style.transform = `translateX(${offset}%)`;
  }

  // Função para prevenir o comportamento padrão do link
  function handleLinkClick(event) {
    // Impede o navegador de rolar para o topo da página ao clicar no link
    event.preventDefault();
  }

  // Adiciona um listener para o botão "anterior"
  prevButton.addEventListener("click", (event) => {
    // Previne o comportamento padrão do link
    handleLinkClick(event);
    // Atualiza o índice para o item anterior
    currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    // Atualiza a exibição do carrossel
    updateCarousel();
  });

  // Adiciona um listener para o botão "próximo"
  nextButton.addEventListener("click", (event) => {
    // Previne o comportamento padrão do link
    handleLinkClick(event);
    // Atualiza o índice para o próximo item
    currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    // Atualiza a exibição do carrossel
    updateCarousel();
  });
});
