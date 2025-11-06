document.addEventListener("DOMContentLoaded", function() {

    const pathEstrelaVazia = "../assets/icons/icons para Pagina - Avaliação do Curso/icon_estrela_vazia.svg";
    const pathEstrelaCheia = "../assets/icons/icons para Pagina - Avaliação do Curso/icon_estrela_cheia.svg";

    const todosGruposDeEstrelas = document.querySelectorAll(".avaliacao-estrelas");

    todosGruposDeEstrelas.forEach(grupo => {
        
        const estrelas = grupo.querySelectorAll("img.estrela-vazia");
        
        grupo.dataset.rating = -1;

        estrelas.forEach((estrela, index) => {
            
            estrela.addEventListener("click", function() {
                grupo.dataset.rating = index;
                atualizarAparenciaDasEstrelas(grupo, index);
            });

            estrela.addEventListener("mouseover", function() {
                atualizarAparenciaDasEstrelas(grupo, index);
            });
        });

        grupo.addEventListener("mouseleave", function() {
            const ratingClicado = parseInt(grupo.dataset.rating, 10);
            atualizarAparenciaDasEstrelas(grupo, ratingClicado);
        });
    });

    function atualizarAparenciaDasEstrelas(grupo, notaIndex) {
        const estrelasDoGrupo = grupo.querySelectorAll("img.estrela-vazia");

        estrelasDoGrupo.forEach((estrela, index) => {
            if (index <= notaIndex) {
                estrela.src = pathEstrelaCheia;
                estrela.alt = `${index + 1} de 5 estrelas`;
            } else {
                estrela.src = pathEstrelaVazia;
                estrela.alt = "Estrela vazia";
            }
        });
    }

});