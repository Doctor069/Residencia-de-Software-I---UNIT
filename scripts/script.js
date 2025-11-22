document.addEventListener('DOMContentLoaded', function () {

    function getPathPrefix() {
        return window.location.pathname.includes('/HTML/') ? '..' : '.';
    }

    const body = document.body;
    const barraLateral = document.getElementById('lateral');

    const sidebarSalva = localStorage.getItem('sidebarStatus');
    if (sidebarSalva === 'retraida' && barraLateral) {
        barraLateral.classList.add('retraida');
        body.classList.add('sidebar-retraida');
    }

    const temaSalvo = localStorage.getItem('tema');
    
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

    atualizarIconeVisualmente(temaSalvo === 'light');
    if (temaSalvo === 'light') {
        body.classList.add('light-mode');
        ativarTemaClaro();
    }

    document.addEventListener('click', function (e) {
        
        const botaoToggle = e.target.closest('#superior-left button');
        if (botaoToggle && barraLateral) {
            barraLateral.classList.toggle('retraida');
            body.classList.toggle('sidebar-retraida');

            if (barraLateral.classList.contains('retraida')) {
                localStorage.setItem('sidebarStatus', 'retraida');
            } else {
                localStorage.setItem('sidebarStatus', 'expandida');
            }
        }

        const btnTema = e.target.closest('#lateral #icone-tema');
        if (btnTema) {
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
        }
    });

    console.log("Sistema inicializado: Tema e Sidebar persistentes.");
});