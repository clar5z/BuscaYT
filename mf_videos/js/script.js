document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.querySelector('#mf_videos__button');
    const searchInput = document.querySelector('#mf_videos__input').value.trim();
    const searchContainer = document.querySelector('#mf_videos__videos');
    const favVideosContainer = document.querySelector('#mf_videos__fav__videos');
    const API_KEY = '';

    function searchVideos() {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(searchInput)}&key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
        displayVideos(data.items);
        })
    }

    function displayVideos(videos) {
        searchContainer.innerHTML = '';

        videos.forEach(video => {
            const videoItem = document.createElement('div');
            const isFavorited = isVideoFavorited(video.id.videoId);
            const favoriteSymbol = isFavorited ? '★' : '☆';

            videoItem.innerHTML = `
                <iframe width="300" height="300" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
                <button class="favorite-button" data-video-id="${video.id.videoId}" data-video-title="${video.snippet.title}" aria-label="Adicionar aos Favoritos">${favoriteSymbol}</button>
            `;
            searchContainer.appendChild(videoItem);

            const addToFavoritesButton = videoItem.querySelector('.favorite-button');
            addToFavoritesButton.addEventListener('click', toggleFavorite);
        });
    }

    function toggleFavorite(event) {
        const videoId = event.target.dataset.videoId;
        const videoTitle = event.target.dataset.videoTitle;
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        const existingIndex = favorites.findIndex(video => video.videoId === videoId);

        if (existingIndex === -1) {
            favorites.push({ videoId, videoTitle });
            event.target.textContent = '★';
        } else {
            favorites.splice(existingIndex, 1);
            event.target.textContent = '☆';
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    function isVideoFavorited(videoId) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.some(video => video.videoId === videoId);
    }

    searchButton.addEventListener('click', searchVideos); 

    function navigate(path) {
        history.pushState(null, null, path);
        handleNavigation();
    }

    function handleNavigation() {
        const path = window.location.pathname;
        const homeContent = document.querySelector('#mf_videos__home');
        const favContent = document.querySelector('#mf_videos__fav');
        if (path === '/favoritos') {
            homeContent.classList.remove('active');
            favContent.classList.add('active');
        } else {
            favContent.classList.remove('active');
            homeContent.classList.add('active');
        }
    }

    window.addEventListener('popstate', handleNavigation);
    handleNavigation();
});