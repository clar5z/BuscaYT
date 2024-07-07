const favAmount = document.querySelector("#mf_drawer__fav__amount");
let favoritesCount = 0;

function updateFavoritesCount() {
    const favoritesString = localStorage.getItem("favorites");
    if (favoritesString) {
        const favorites = JSON.parse(favoritesString);
        favoritesCount = favorites.length;
    } else {
        favoritesCount = 0;
    }
    favAmount.textContent = favoritesCount.toString();
}

updateFavoritesCount();

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("favorite-button")) {
        updateFavoritesCount();
    }
});

const liFav = document.querySelector("#mf_drawer__fav");
const liVideos = document.querySelector("#mf_drawer__videos");

function updateActiveState() {
    const path = window.location.pathname;
    if (path === "/favoritos") {
        liFav.classList.add("active");
        liVideos.classList.remove("active");
    } else {
        liFav.classList.remove("active");
        liVideos.classList.add("active");
    }
}

updateActiveState();

liFav.addEventListener("click", function () {
    liFav.classList.add("active");
    liVideos.classList.remove("active");
});

liVideos.addEventListener("click", function () {
    liFav.classList.remove("active");
    liVideos.classList.add("active");
});

window.addEventListener("popstate", updateActiveState);
