// --- MENU LATERAL ---
document.addEventListener('click', function () {

  // Toggle da barra lateral
  const botaoToggle = document.querySelector('#superior-left button');
  const body = document.body;
  const barraLateral = document.getElementById('lateral');

  if (botaoToggle && body && barraLateral) {
    botaoToggle.addEventListener('click', function () {
      barraLateral.classList.toggle('retraida');
      body.classList.toggle('sidebar-retraida');
    });
  }

function ativarTemaClaro() {
    const link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "/CSS/estilo_layout/light_mode.css";
    link.id = "tema-claro-css";

    document.head.appendChild(link);
}

function desativarTemaClaro() {
    const link = document.getElementById('tema-claro-css');
    if (link) link.remove();
}

  // 1. Aplicar tema salvo ao carregar
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'light') {
    body.classList.add('light-mode');
    ativarTemaClaro();
  }

  // 2. Alternar tema ao clicar
  document.addEventListener('click', function (e) {
    const icone = e.target.closest('#lateral #icone-tema');
    if (!icone) return;
    e.preventDefault();
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {

        icone.src = "/assets/icons/barra superior/temas/tema_escuro.svg";
        icone.alt = "Ativar modo escuro";
        localStorage.setItem('tema', 'light');

        ativarTemaClaro();

    } else {

        icone.src = "/assets/icons/barra superior/temas/tema_claro.svg";
        icone.alt = "Ativar modo claro";
        localStorage.setItem('tema', 'dark');

        desativarTemaClaro(); 
    }

  });

  console.log("Tema inicializado com sucesso!");
});
