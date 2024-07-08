const favAmount = document.querySelector("#mf_drawer__fav__amount");
const liFav = document.querySelector("#mf_drawer__fav");
const liVideos = document.querySelector("#mf_drawer__videos");
let favoritesCount = 0;

// Initialize favorites count and update DOM
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

updateFavoritesCount();
updateActiveState();

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("favorite-button")) {
        updateFavoritesCount();
    }
});

// Update active state on drawer item click
liFav.addEventListener("click", function () {
    liFav.classList.add("active");
    liVideos.classList.remove("active");
});

liVideos.addEventListener("click", function () {
    liFav.classList.remove("active");
    liVideos.classList.add("active");
});

window.addEventListener("popstate", updateActiveState);
