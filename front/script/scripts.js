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
    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
  }

  // Função para prevenir o comportamento padrão do link
  function handleLinkClick(event) {
    event.preventDefault();
  }

  // Adiciona um listener para o botão "anterior"
  if (prevButton) {
    prevButton.addEventListener("click", (event) => {
      handleLinkClick(event);
      currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      updateCarousel();
    });
  }

  // Adiciona um listener para o botão "próximo"
  if (nextButton) {
    nextButton.addEventListener("click", (event) => {
      handleLinkClick(event);
      currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      updateCarousel();
    });
  }

  // Sidebar
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelector(".toggle-btn");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (sidebar) {
        sidebar.classList.toggle("active");
      }
    });
  }

  // CEP Lookup
  const cepInput = document.getElementById("cep");
  const resultadoDiv = document.getElementById("resultado");

  if (cepInput && resultadoDiv) {
    cepInput.addEventListener("input", function () {
      const cep = cepInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos

      if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then((response) => response.json())
          .then((data) => {
            if (data.erro) {
              resultadoDiv.innerHTML = `<p>CEP não encontrado.</p>`;
              // Limpa os campos se o CEP não for encontrado
              document.getElementById("rua").value = "";
              document.getElementById("bairro").value = "";
              document.getElementById("cidade").value = "";
            } else {
              // Preenchendo os campos de endereço
              document.getElementById("rua").value = data.logradouro || "";
              document.getElementById("bairro").value = data.bairro || "";
              document.getElementById("cidade").value = data.localidade || "";
              resultadoDiv.innerHTML = `
                <p><strong>Endereço:</strong> ${data.logradouro}</p>
                <p><strong>Bairro:</strong> ${data.bairro}</p>
                <p><strong>Cidade:</strong> ${data.localidade}</p>
                <p><strong>Estado:</strong> ${data.uf}</p>
              `;
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar CEP:", error);
            resultadoDiv.innerHTML = `<p>Erro ao buscar CEP.</p>`;
            // Limpa os campos em caso de erro
            document.getElementById("rua").value = "";
            document.getElementById("bairro").value = "";
            document.getElementById("cidade").value = "";
          });
      } else {
        // Limpa os campos se o CEP não tiver 8 dígitos
        resultadoDiv.innerHTML = "";
        document.getElementById("rua").value = "";
        document.getElementById("bairro").value = "";
        document.getElementById("cidade").value = "";
      }
    });
  }
});
