const apiKey = "YOUR_OMDB_API_KEY"; // 🔑 Replace with your OMDb API key
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("movies");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") {
    alert("Please enter a movie name!");
    return;
  }
  fetchMovies(query);
});

async function fetchMovies(query) {
  moviesContainer.innerHTML = "<p>Loading...</p>";
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      moviesContainer.innerHTML = `<p style="text-align:center;color:red;">❌ ${data.Error}</p>`;
    }
  } catch (err) {
    moviesContainer.innerHTML = `<p style="text-align:center;color:red;">❌ Something went wrong</p>`;
    console.error(err);
  }
}

function displayMovies(movies) {
  moviesContainer.innerHTML = "";
  movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    
    movieCard.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/180x270?text=No+Image"}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;
    
    moviesContainer.appendChild(movieCard);
  });
}
