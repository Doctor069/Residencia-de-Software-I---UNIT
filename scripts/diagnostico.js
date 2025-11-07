document.addEventListener('DOMContentLoaded', function() {

    const blocosOpcoes = document.querySelectorAll('.opcao-bloco');
    const checkTermos = document.getElementById('termos-check');
    const checkPerda = document.getElementById('perda-check');
    const btnConfirmar = document.getElementById('confirmar-perdas-btn');
    const linkConfirmar = document.getElementById('link-confirmar-perdas');

    if (blocosOpcoes.length && checkTermos && checkPerda && btnConfirmar && linkConfirmar) {
        
        const imgNaoMarcado = "../assets/icons/icones para Pagina - Diagnostico/icon - check box --- nao marcado.svg";
        const imgMarcado = "../assets/icons/icones para Pagina - Diagnostico/icon - check box --- marcado.svg";

        checkTermos.dataset.checked = 'false';
        checkPerda.dataset.checked = 'false';

        btnConfirmar.disabled = true;

        blocosOpcoes.forEach(blocoOpcao => {
            blocoOpcao.addEventListener('click', function() {
                // Remove selecionado de todos
                blocosOpcoes.forEach(b => b.classList.remove('selecionado'));

                // Adiciona selecionado só no clicado
                blocoOpcao.classList.add('selecionado');
            });
        });

        checkTermos.addEventListener('click', function() {
            const img = checkTermos.querySelector('img');
            const isChecked = checkTermos.dataset.checked === 'true';
            checkTermos.dataset.checked = isChecked ? 'false' : 'true';

            img.src = !isChecked ? imgMarcado : imgNaoMarcado;
            
            verificarEstadoBotao();
        });

        checkPerda.addEventListener('click', function() {
            const img = checkPerda.querySelector('img');
            const isChecked = checkPerda.dataset.checked === 'true';
            checkPerda.dataset.checked = isChecked ? 'false' : 'true';
            
            img.src = !isChecked ? imgMarcado : imgNaoMarcado;

            verificarEstadoBotao();
        });

        function verificarEstadoBotao() {
            const termosMarcado = checkTermos.dataset.checked === 'true';
            const perdaMarcado = checkPerda.dataset.checked === 'true';

            btnConfirmar.disabled = !(termosMarcado && perdaMarcado);
        }
        
        linkConfirmar.addEventListener('click', function(event) {
            if (btnConfirmar.disabled) {
                event.preventDefault();
            }
        });
    }

});
