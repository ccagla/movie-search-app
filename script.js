
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

async function fetchMovies(query) {
    try {
       const res = await fetch(`https://www.omdbapi.com/?apikey=e713582&s=${query}`);

        const data = await res.json();

if (data.Response === "False") {
    showError(data.Error || "No results Found.");
    return;
}

displayMovies(data.Search);

    } catch (error) {
        showError("An error occurred while fetching data.");
        console.log(error);
    }
}

function displayMovies(movies) {
        movieList.innerHTML = "";

        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            movieCard.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
            `;

            movieList.appendChild(movieCard)
        });
}