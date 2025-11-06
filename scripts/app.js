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
    loadHTML("/HTML/partials/header.html", "header-placeholder");
    loadHTML("/HTML/partials/sidebar.html", "sidebar-placeholder");
});