// --- MENU LATERAL ---
document.addEventListener('DOMContentLoaded', function () {

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

  const iconeTema = document.getElementById('icone-tema');
  if (!iconeTema) {
    console.warn("Ícone do tema não encontrado.");
    return;
  }

  // 1. Aplicar tema salvo
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'light') {
    body.classList.add('light-mode');
    iconeTema.src = "/assets/icons/barra superior/temas/tema_escuro.svg";
    iconeTema.alt = "Ativar modo escuro";
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

  // 2. Alternar tema ao clicar
  iconeTema.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.toggle('light-mode');

if (body.classList.contains('light-mode')) {

    iconeTema.src = "/assets/icons/barra superior/temas/tema_escuro.svg";
    iconeTema.alt = "Ativar modo escuro";
    localStorage.setItem('tema', 'light');

    ativarTemaClaro(); // 🔥 carrega o arquivo

} else {

    iconeTema.src = "/assets/icons/barra superior/temas/tema_claro.svg";
    iconeTema.alt = "Ativar modo claro";
    localStorage.setItem('tema', 'dark');

    desativarTemaClaro(); // ❄ remove o arquivo
}

  });

  console.log("Tema inicializado com sucesso!");
});
