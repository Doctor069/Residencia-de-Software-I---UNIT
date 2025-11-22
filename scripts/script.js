document.addEventListener('DOMContentLoaded', function () {

    function getPathPrefix() {
        return window.location.pathname.includes('/HTML/') ? '..' : '.';
    }

    // --- LOGICA DA BARRA LATERAL ---
    document.addEventListener('click', function (e) {
        const botaoToggle = e.target.closest('#superior-left button');
        
        if (botaoToggle) {
            const body = document.body;
            const barraLateral = document.getElementById('lateral');
            
            if (body && barraLateral) {
                barraLateral.classList.toggle('retraida');
                body.classList.toggle('sidebar-retraida');
            }
        }
    });

    // --- LOGICA DO TEMA ---

    function ativarTemaClaro() {
        if (document.getElementById('tema-claro-css')) return;

        const prefix = getPathPrefix();
        const link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = `${prefix}/CSS/estilo_layout/light_mode.css`;
        link.id = "tema-claro-css";

        document.head.appendChild(link);
    }

    function desativarTemaClaro() {
        const link = document.getElementById('tema-claro-css');
        if (link) link.remove();
    }

    const body = document.body;
    const temaSalvo = localStorage.getItem('tema');
    
    atualizarIconeVisualmente(temaSalvo === 'light');

    if (temaSalvo === 'light') {
        body.classList.add('light-mode');
        ativarTemaClaro();
    }

    document.addEventListener('click', function (e) {
        const icone = e.target.closest('#lateral #icone-tema');
        if (!icone) return;
        
        e.preventDefault();
        body.classList.toggle('light-mode');
        
        const isLightMode = body.classList.contains('light-mode');

        if (isLightMode) {
            localStorage.setItem('tema', 'light');
            ativarTemaClaro();
        } else {
            localStorage.setItem('tema', 'dark');
            desativarTemaClaro(); 
        }

        atualizarIconeVisualmente(isLightMode);
    });

    function atualizarIconeVisualmente(isLightMode) {
        const icone = document.querySelector('#lateral #icone-tema');
        if (!icone) return;

        const prefix = getPathPrefix();
        
        if (isLightMode) {
            icone.src = `${prefix}/assets/icons/barra superior/temas/tema_escuro.svg`;
            icone.alt = "Ativar modo escuro";
        } else {
            icone.src = `${prefix}/assets/icons/barra superior/temas/tema_claro.svg`; 
            icone.alt = "Ativar modo claro";
        }
    }

    console.log("Tema e Scripts inicializados com sucesso!");
});