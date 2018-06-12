$(document).ready(function() {
  $("body").on("submit", "#searchForm", function(e) {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
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
