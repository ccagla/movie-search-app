
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const movieList = document.getElementById("movie-list");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const query = input.value.trim();

    if (query === "") {
        showError("Please enter a movie name")
        return;
    }

    fetchMovies(query);
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";

    setTimeout(() => {
        errorMessage.textContent = "";
        errorMessage.style.display = "none";
    }, 3000);
    
}