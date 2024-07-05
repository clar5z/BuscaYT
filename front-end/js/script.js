document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/mf_drawer')
        .then(response => response.text())
        .then(data => {
            document.querySelector('#mf_drawer').innerHTML = data;
            const script = document.createElement('script');
            script.src = 'http://localhost:3000/mf_drawer/js/script.js';
            document.body.appendChild(script);
            const style = document.createElement('link');
            style.rel = 'stylesheet';
            style.href = 'http://localhost:3000/mf_drawer/css/style.css';
            document.body.appendChild(style);
        })
        .catch(error => {
            console.error('Erro ao carregar micro frontend:', error);
        });

    fetch('http://localhost:3000/mf_videos')
        .then(response => response.text())
        .then(data => {
            document.querySelector('#mf_videos').innerHTML = data;
            const script = document.createElement('script');
            script.src = 'http://localhost:3000/mf_videos/js/script.js';
            document.body.appendChild(script);
            const style = document.createElement('link');
            style.rel = 'stylesheet';
            style.href = 'http://localhost:3000/mf_videos/css/style.css';
            document.body.appendChild(style);
        })
        .catch(error => {
            console.error('Erro ao carregar micro frontend:', error);
        });
});
