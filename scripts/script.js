document.addEventListener('click', function() {
    const botaoToggle = document.querySelector('#superior-left button');
    
    const body = document.body;
    const barraLateral = document.getElementById('lateral');

    if (botaoToggle && body && barraLateral) {
        botaoToggle.addEventListener('click', function() {
            barraLateral.classList.toggle('retraida');
            
            body.classList.toggle('sidebar-retraida');
        });
    }
});

function inicializarTema() {
  const botaoTema = document.getElementById('botao-tema');
  const iconeTema = document.getElementById('icone-tema');
  const body = document.body;

  if (!botaoTema || !iconeTema) {
    console.warn("Botão ou ícone de tema não encontrado.");
    return;
  }

  botaoTema.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
      iconeTema.src = "/assets/icons/barra superior/temas/tema_escuro.svg";
      iconeTema.alt = "Ativar modo escuro";
    } else {
      iconeTema.src = "/assets/icons/barra superior/temas/tema_claro.svg";
      iconeTema.alt = "Ativar modo claro";
    }
  });

  console.log("Tema inicializado com sucesso!"); // debug opcional
}