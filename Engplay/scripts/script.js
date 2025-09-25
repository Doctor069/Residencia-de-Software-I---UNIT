/* ===== RETRAIR A BARRA LATERAL ===== */
document.addEventListener('DOMContentLoaded', function() {
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

/* ===== PÁGINA DE CANCELAMENTO (PÁGINA 3) ===== */
document.addEventListener('DOMContentLoaded', function() {

    const blocoOpcao = document.querySelector('.opcao-bloco');
    const checkTermos = document.getElementById('termos-check');
    const checkPerda = document.getElementById('perda-check');
    const btnConfirmar = document.getElementById('confirmar-perdas-btn');
    const linkConfirmar = document.getElementById('link-confirmar-perdas');

    if (blocoOpcao && checkTermos && checkPerda && btnConfirmar && linkConfirmar) {
        
        const imgNaoMarcado = "/Engplay/assets/icones para pagina 3/icon - check box --- nao marcado.png";
        const imgMarcado = "/Engplay/assets/icones para pagina 3/icon - check box --- marcado.png";

        checkTermos.dataset.checked = 'false';
        checkPerda.dataset.checked = 'false';

        // 1. Desabilita o botão "Estou ciente" por padrão
        btnConfirmar.disabled = true;

        // 2. Adiciona o evento de clique para o bloco de opção
        blocoOpcao.addEventListener('click', function() {
            blocoOpcao.classList.toggle('selecionado');
        });

        // 3. Adiciona o evento de clique para o checkbox de TERMOS
        checkTermos.addEventListener('click', function() {
            const img = checkTermos.querySelector('img');
            const isChecked = checkTermos.dataset.checked === 'true';
            checkTermos.dataset.checked = isChecked ? 'false' : 'true';

            img.src = !isChecked ? imgMarcado : imgNaoMarcado;
            
            verificarEstadoBotao();
        });

        // 4. Adiciona o evento de clique para o checkbox de PERDA
        checkPerda.addEventListener('click', function() {
            const img = checkPerda.querySelector('img');
            const isChecked = checkPerda.dataset.checked === 'true';
            checkPerda.dataset.checked = isChecked ? 'false' : 'true';
            
            img.src = !isChecked ? imgMarcado : imgNaoMarcado;

            verificarEstadoBotao();
        });

        // 5. Função que verifica se os dois checkboxes estão marcados
        function verificarEstadoBotao() {
            const termosMarcado = checkTermos.dataset.checked === 'true';
            const perdaMarcado = checkPerda.dataset.checked === 'true';

            if (termosMarcado && perdaMarcado) {
                btnConfirmar.disabled = false;
            } else {
                btnConfirmar.disabled = true;
            }
        }
        
        // 6. Impede que o link funcione se o botão estiver desabilitado
        linkConfirmar.addEventListener('click', function(event) {
            if (btnConfirmar.disabled) {
                event.preventDefault();
            }
        });
    }

});