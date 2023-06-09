const apiKey = "5087ec35f89e158e1ac70743164ee730";
const baseURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=";
const searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=5087ec35f89e158e1ac70743164ee730&query=";
const imgBaseURL = "http://image.tmdb.org/t/p/w500";
const genres = [
  { name: "Action", id: 28 },
  { name: "Comedy", id: 35 },
  { name: "Drama", id: 18 },
  { name: "Horror", id: 27 },
  { name: "Fiction", id: 878 },
  { name: "Animé", id: 16 }
];

let data = [];

//All Movies API
for (let i = 1; i <= 5; i++) {
  fetch(`${baseURL}${apiKey}&language=en-US&page=${i}&region=US`)
    .then((res) => res.json())
    .then((res) => {
      data.push(...res.results);
      if (i === 3) {
        data.map((item) => {
          Movie(item.poster_path, item.id);
        });
      }
    });
}

function Movie(poster_path, id) {
  const div = document.createElement("div");
  div.classList.add("grid-item");

  const img = document.createElement("img");
  img.src = `${imgBaseURL}${poster_path}`;

  const grid = document.querySelector(".grid");
  div.appendChild(img);
  grid.appendChild(div);

  div.setAttribute("id", id);
  let red = document.getElementById(id);

  red.addEventListener("click", () => {
    window.location.href = "detail.html?movieId=" + id;
  });
}

function renderGenreButtons() {
  const genreContainer = document.querySelector("#genre-buttons");

  genres.forEach((genre) => {
    const button = document.createElement("button");
    button.textContent = genre.name;
    button.classList.add("genre-button");
    button.addEventListener("click", () => {
      searchMoviesByGenre(genre.id);
    });
    genreContainer.appendChild(button);
  });

  // Add media query for smaller screens
  const mediaQuery = window.matchMedia('(max-width: 767px)');
  if (mediaQuery.matches) {
    genreContainer.style.display = "flex";
    genreContainer.style.flexWrap = "wrap";
    genreContainer.style.justifyContent = "center";

    const buttons = document.querySelectorAll(".genre-button");
    buttons.forEach((button) => {
      button.style.width = "100px";
      button.style.margin = "5px";
    });
  }
}

function searchMoviesByGenre(genreId) {
  document.getElementById("movies").innerHTML = "";

  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`)
    .then((res) => res.json())
    .then((res) => {
      data = res.results;
      data.map((item) => {
        Movie(item.poster_path, item.id);
      });
    });
}

function searhMovies() {
  document.getElementById("movies").innerHTML = "";
  let search = document.querySelector("#search").value;

  //Search for movies API
  fetch(`${searchUrl}${search}`)
    .then((res) => res.json())
    .then((res) => {
      data = res.results;
      data.map((item) => {
        Movie(item.poster_path, item.id);
      });
    });
}

renderGenreButtons();

var button = document.getElementById("back-to-top");
window.onscroll = function() {
  scrollFunction()
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}
button.onclick = function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}