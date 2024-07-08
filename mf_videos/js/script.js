const searchButton = document.querySelector("#mf_videos__button");
const searchInput = document.querySelector("#mf_videos__input");
const searchContainer = document.querySelector("#mf_videos__videos");
const favContainer = document.querySelector("#mf_videos__fav__videos");
// Enter API KEY here
const API_KEY = "";

let nextPageToken = "";
let isFetching = false;

// Search videos from YouTube API
function searchVideos(pageToken = "") {
    if (isFetching) return;

    isFetching = true;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(searchInput.value.trim())}&key=${API_KEY}&pageToken=${pageToken}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            nextPageToken = data.nextPageToken;
            displayVideos(data.items);
            isFetching = false;
        });
}

function displayVideos(videos) {
    videos.forEach((video) => {
        const videoItem = createVideoItem(video);
        searchContainer.appendChild(videoItem);
    });
}

// Display favorite videos
function displayFavorites(favorites) {
    favContainer.innerHTML = "";
    favorites.forEach((favorite) => {
        if (favorite.videoId && favorite.videoTitle) {
            const videoItem = createVideoItem({
                id: { videoId: favorite.videoId },
                snippet: { title: favorite.videoTitle },
            });
            favContainer.appendChild(videoItem);
        }
    });
}

function createVideoItem(video) {
    const videoItem = document.createElement("div");
    videoItem.classList.add("mf_videos__item");

    if (video.id && video.snippet) {
        const isFavorited = isVideoFavorited(video.id.videoId);
        const favoriteSymbol = isFavorited ? "★" : "☆";

        videoItem.innerHTML = `
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
            <button class="favorite-button" data-video-id="${video.id.videoId}" data-video-title="${video.snippet.title}" aria-label="Adicionar aos Favoritos">${favoriteSymbol}</button>
        `;

        const addToFavoritesButton = videoItem.querySelector(".favorite-button");
        addToFavoritesButton.addEventListener("click", toggleFavorite);
    }

    return videoItem;
}

function toggleFavorite(event) {
    const videoId = event.target.dataset.videoId;
    const videoTitle = event.target.dataset.videoTitle;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const existingIndex = favorites.findIndex((video) => video.videoId === videoId);

    if (existingIndex === -1) {
        favorites.push({ videoId, videoTitle });
        event.target.textContent = "★";
    } else {
        favorites.splice(existingIndex, 1);
        event.target.textContent = "☆";
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    displayFavorites(favorites);
}

function isVideoFavorited(videoId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.some((video) => video.videoId === videoId);
}

searchButton.addEventListener("click", () => {
    searchContainer.innerHTML = "";
    nextPageToken = "";
    searchVideos();
});

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchContainer.innerHTML = "";
        nextPageToken = "";
        searchVideos();
    }
});

// Navigation functions
function navigate(path) {
    history.pushState(null, null, path);
    handleNavigation();
}

function handleNavigation() {
    const path = window.location.pathname;
    const homeContent = document.querySelector("#mf_videos__home");
    const favContent = document.querySelector("#mf_videos__fav");

    if (path === "/favoritos") {
        homeContent.classList.remove("active");
        favContent.classList.add("active");

        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        displayFavorites(favorites);
    } else {
        favContent.classList.remove("active");
        homeContent.classList.add("active");
    }
}

window.addEventListener("popstate", handleNavigation);
handleNavigation();

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        if (nextPageToken) {
            searchVideos(nextPageToken);
        }
    }
});
