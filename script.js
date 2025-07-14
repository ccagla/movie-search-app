
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
            card.dataset.id = movie.id;
            movieCard.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
            `;

            movieList.appendChild(movieCard);

            if (data.Response === "False") {
                movieList.innerHTML = `
                <p class="text-center text-red-600 font-semibold">Movie not found.Please try another word.</p>
                `
                return;
                
            }
        });
}

movieList.addEventListener("click", async function (e) {
    const target = e.target.closest(".movie-card");

    if (!target) return;

    const movieId = target.dataset.id;
    await fetchMovieDetails(movieId)
    
} );

async function fetchMovieDetails(movieId) {
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=e713582&s=${movieId}`);
        const data = await res.json();


        if (data.Response === "False") {
            throw new Error("Details not found")
        }
        showMovieModal(data);
    } catch (error) {
        console.log("Detaylar alınamadı:", error.message)
    }
}

function showMovieModal(movie) {
    const existingModal = document.querySelector(".modal");

    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
    <div class="model-content">
    <span class="close-btn">&times;</span>
    <h2>${movie.Title}</h2>
    <img src="${movie.Poster}" alt "${movie.Title}">
    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
    </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
        modal.remove();
    });
}