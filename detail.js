const link = window.location.href;
const newLink = new URL(link);
const movieId = newLink.searchParams.get("movieId");

const apiKey = "5087ec35f89e158e1ac70743164ee730";
const detailMovie =
  "https://api.themoviedb.org/3/movie/" +
  movieId +
  "?api_key=" +
  apiKey +
  "&language=en-US";
const relatedUrl =
  "https://api.themoviedb.org/3/movie/" +
  movieId +
  "/similar?api_key=" +
  apiKey +
  "&language=en-US&page=1";
const imgBaseURL = "http://image.tmdb.org/t/p/w500";
const trailerUrl =
  "https://api.themoviedb.org/3/movie/" +
  movieId +
  "/videos?api_key=" +
  apiKey +
  "&language=en-US";


let data;

// Fetch movie details
fetch(detailMovie)
  .then((res) => res.json())
  .then((res) => {
    data = res;
    console.log(data);

    // Set movie details in HTML
    const img = document.createElement("img");
    document.getElementById("myImageID").src = `${imgBaseURL}${data.poster_path}`;
    document.getElementById("original_title").innerHTML = data.original_title;
    document.getElementById("overview").innerHTML = data.overview;
    document.getElementById("release_date").innerHTML = data.release_date;

    // Fetch movie trailers
    fetch(trailerUrl)
      .then((res) => res.json())
      .then((res) => {
        const trailers = res.results.filter(trailer => trailer.type === 'Trailer');
        console.log(trailers);

        // Add first trailer button
        if (trailers.length > 0) {
          addTrailerButton(trailers[0].key);
        }
      });
  });


// Function to add trailer button
function addTrailerButton(trailerKey) {
  const button = document.createElement("button");

  button.innerHTML = "Watch Trailer";

  button.addEventListener("click", () => {
    window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank');
  });

  document.getElementById("trailer-button").appendChild(button);
}


// Fetch related movies
fetch(relatedUrl)
  .then((res) => res.json())
  .then((res) => {
    data = res.results;
    console.log(data);
    data.map((item) => {
      Movie(item.poster_path, item.id);
    });
  });

// Function to create movie poster grid
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
    window.location =
      "file:///D:/HTML%20CSS/final-kodeflix/detail.html?movieId=" + id;
  });
}
