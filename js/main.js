$(document).ready(function() {
  $("body").on("submit", "#searchForm", function(e) {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

// Before Movie details page
$(document).on("pagebeforeshow", "#movie", function() {
  let movieId = sessionStorage.getItem("movieId");
  getMovie(movieId);
});

// movie clicked
function movieClicked(id) {
  //   console.log(id);
  sessionStorage.setItem("movieId", id);
  $.mobile.changePage("movie.html");
}

// Get Movies From OBDB API
function getMovies(searchText) {
  $.ajax({
    method: "GET",
    url: "http://www.omdbapi.com?s=" + searchText + "&apikey=3a8b886d"
  }).done(function(data) {
    // console.log(data);
    let movies = data.Search;
    let output = "";
    $.each(movies, function(index, movie) {
      output += `
                     <li>
                     <a onclick="movieClicked('${movie.imdbID}')" href="#">
                     <img src="${movie.Poster}">
                     <h2>${movie.Title}</h2>
                     <p>Release Year: ${movie.Year}</p>
                     </a>
                     </li>
                     `;
    });
    $("#movies")
      .html(output)
      .listview("refresh");
  });
}

// Get single movie
function getMovie(movieId) {
  console.log("this", movieId);

  $.ajax({
    method: "GET",
    url: "http://www.omdbapi.com?i=" + movieId + "&apikey=3a8b886d"
  }).done(function(movie) {
    console.log(movie);
    let movieTop = `
    <div style="text-align:center">
    <h1>${movie.Title}</h1>
    <img src="${movie.Poster}">
    </div>
    `;
    $("#movieTop").html(movieTop);

    let movieDetails = `
    <li><strong>Genre:</strong> ${movie.Genre}</li>
    <li><strong>Rated:</strong> ${movie.Rated}</li>
    <li><strong>Released:</strong> ${movie.Released}</li>
    <li><strong>Runtime:</strong> ${movie.Runtime}</li>
    <li><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
    <li><strong>IMDB Votes:</strong> ${movie.imdbVotes}</li>
    <li><strong>Actors:</strong> ${movie.Actors}</li>
    <li><strong>Director:</strong> ${movie.Director}</li>
  `;

    $("#movieDetails")
      .html(movieDetails)
      .listview("refresh");
  });
}
