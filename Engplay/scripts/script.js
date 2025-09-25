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