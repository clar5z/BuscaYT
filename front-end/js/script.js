document.addEventListener("DOMContentLoaded", function () {
    function loadMicroFrontend(name) {
        fetch(`http://localhost:3000/${name}`)
            .then((response) => response.text())
            .then((data) => {
                document.querySelector(`#${name}`).innerHTML = data;
                const script = document.createElement("script");
                script.src = `http://localhost:3000/${name}/js/script.js`;
                document.body.appendChild(script);
                const style = document.createElement("link");
                style.rel = "stylesheet";
                style.href = `http://localhost:3000/${name}/css/style.css`;
                document.body.appendChild(style);
            })
            .catch((error) => {
                console.error(`Erro ao carregar micro frontend ${name}:`, error);
            });
    }

    loadMicroFrontend("mf_drawer");
    loadMicroFrontend("mf_videos");
});
