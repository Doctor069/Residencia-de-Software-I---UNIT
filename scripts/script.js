document.addEventListener('DOMContentLoaded', function () {

    function getPathPrefix() {
        return window.location.pathname.includes('/HTML/') ? '..' : '.';
    }

    const body = document.body;
    const barraLateral = document.getElementById('lateral');

    if (!barraLateral) {
        console.error("ERRO CRÍTICO: O elemento <nav id='lateral'> não foi encontrado.");
    }

    const sidebarSalva = localStorage.getItem('sidebarStatus');
    
    if (barraLateral && sidebarSalva === 'retraida') {
        barraLateral.style.transition = 'none'; 
        barraLateral.classList.add('retraida');
        body.classList.add('sidebar-retraida');
        setTimeout(() => {
            barraLateral.style.transition = ''; 
        }, 100);
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

    function atualizarBarraDeProgresso(isLightMode) {
        const barraImg = document.querySelector('.barra-de-progresso-img');
        
        if (!barraImg) return;

        let currentSrc = barraImg.getAttribute('src');

        if (isLightMode) {
            if (currentSrc.includes('/dark/')) {
                barraImg.setAttribute('src', currentSrc.replace('/dark/', '/light/'));
            }
        } else {
            if (currentSrc.includes('/light/')) {
                barraImg.setAttribute('src', currentSrc.replace('/light/', '/dark/'));
            }
        }
    }

    if (temaSalvo === 'light') {
        body.classList.add('light-mode');
        ativarTemaClaro();
    }
    
    atualizarIconeVisualmente(temaSalvo === 'light');
    atualizarBarraDeProgresso(temaSalvo === 'light');


    const prefixo = getPathPrefix();
    const ICON_AUDIO_OFF = `${prefixo}/assets/icons/barra lateral/icon_audio_off.svg`;
    const ICON_AUDIO_ON = `${prefixo}/assets/icons/barra lateral/icon_audio_on.svg`;

    const btnLeitura = document.getElementById('modo-leitura-container');
    const iconeLeitura = document.getElementById('icone-leitura');
    let leituraAtiva = false;
    const synth = window.speechSynthesis;

    function falarTexto(texto) {
        if (synth.speaking) {
            synth.cancel();
        }

        if (texto && texto.trim() !== "") {
            const utterThis = new SpeechSynthesisUtterance(texto);
            utterThis.lang = 'pt-BR';
            utterThis.rate = 1.0;
            utterThis.pitch = 1.0;
            synth.speak(utterThis);
        }
    }

    if (btnLeitura && iconeLeitura) {
        iconeLeitura.src = ICON_AUDIO_OFF;
        
        btnLeitura.title = "Ativar modo leitura: Clique em qualquer texto para ouvir"; // Tooltip explicativo

        btnLeitura.addEventListener('click', function() {
            leituraAtiva = !leituraAtiva;
            document.body.classList.toggle('modo-leitura-ativo');

            if (leituraAtiva) {
                iconeLeitura.src = ICON_AUDIO_ON;
                iconeLeitura.style.filter = "invert(63%) sepia(61%) saturate(452%) hue-rotate(84deg) brightness(90%) contrast(88%)"; // Verde para destaque
                falarTexto("Modo de leitura ativado.");
            } else {
                iconeLeitura.src = ICON_AUDIO_OFF;
                iconeLeitura.style.filter = "none";
                synth.cancel();
            }
        });
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

        const btnTema = e.target.closest('#lateral #icone-tema') || e.target.closest('#icones-temas');
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
            atualizarBarraDeProgresso(isLightMode);
        }

        if (leituraAtiva) {
            if (e.target.closest('#modo-leitura-container')) {
                return;
            }

            const elementoClicado = e.target;
            const elementoInterativo = elementoClicado.closest('a') || elementoClicado.closest('button') || elementoClicado.closest('.opcao-bloco'); // Incluímos os cards de diagnóstico

            if (elementoInterativo) {
                e.preventDefault();
                e.stopPropagation(); 
            }

            const tagsPermitidas = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'LI', 'SPAN', 'LABEL', 'BUTTON', 'A', 'STRONG', 'B', 'DIV'];
            
            if (tagsPermitidas.includes(elementoClicado.tagName) || elementoInterativo) {
                
                let textoParaLer = "";

                if (elementoClicado.innerText && elementoClicado.innerText.trim() !== "") {
                    textoParaLer = elementoClicado.innerText;
                } 
                else if (elementoInterativo) {
                    textoParaLer = elementoInterativo.innerText || elementoInterativo.textContent;
                }
                
                if (elementoClicado.tagName === 'IMG' && elementoClicado.alt) {
                    textoParaLer = "Imagem: " + elementoClicado.alt;
                }

                if (textoParaLer) {
                    textoParaLer = textoParaLer.replace(/\n/g, ' '); 
                    falarTexto(textoParaLer);
                }
            }
            
            return false;
        }
    });

    console.log("Script carregado. Tema e Assets sincronizados.");
});