/**
 * Função reutilizável para carregar HTML de um arquivo em um elemento da página.
 * @param {string} url - O caminho para o arquivo .html
 * @param {string} elementId - O ID do elemento onde o HTML será injetado
 */
function loadHTML(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
            } else {
                console.warn(`Elemento com ID '${elementId}' não encontrado.`);
            }
        })
        .catch(error => {
            console.error(error);
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `<p>Erro ao carregar o conteúdo.</p>`;
            }
        });
}

document.addEventListener("DOMContentLoaded", function() {
    loadHTML("./partials/header.html", "header-placeholder");
    loadHTML("./partials/sidebar.html", "sidebar-placeholder");
});