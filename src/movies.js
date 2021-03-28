// Iteration 1: All directors? - Get the array of all directors.
function getAllDirectors(movies) {
  const allDirectors = movies.map((item) => {
    return item.director;
  });
  return allDirectors;
}

// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

function howManyMovies(movies) {
  const spielbergMovies = movies.filter((item) => {
    return item.director === "Steven Spielberg" && item.genre.includes("Drama");
  });

  return spielbergMovies.length;
}

// Iteration 3: All rates average - Get the average of all rates with 2 decimals

function ratesAverage(movies) {
  if (movies.length === 0) {
    return 0;
  }

  const rates = movies.map((movie) => {
    return movie.rate;
  });

  const ratesSum = rates.reduce((accumulator, currentValue) => {
    if (currentValue) {
      return accumulator + currentValue;
    } else {
      return accumulator;
    }
  });

  return Number((ratesSum / rates.length).toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies

function dramaMoviesRate(movies) {
  let dramaMovies = 0;

  let totalDramaMovies = movies.reduce(function (accumulator, movie) {
    if (!movie.genre.includes("Drama")) {
      return accumulator;
    }
    if (movie.genre.includes("Drama")) {
      dramaMovies += 1;
      return accumulator + movie.rate;
    }
  }, 0);
  if (totalDramaMovies === 0) {
    return 0;
  }
  return parseFloat((totalDramaMovies / dramaMovies).toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(movies) {
  const sortMovies = movies
    .map(function (item) {
      return item;
    })
    .sort(function (movie1, movie2) {
      if (movie1.year < movie2.year) {
        return -1;
      } else if (movie1.year > movie2.year) {
        return 1;
      } else if (movie1.year === movie2.year) {
        return movie1.title.localeCompare(movie2.title);
      }
    });
  return sortMovies;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(movies) {
  const orderByAlpha = movies.map(function (movie) {
    return movie.title;
  });
  return orderByAlpha.sort().slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
// "2h"
function convertHours(hourString) {
  let calculateHour = hourString.split("h");
  return calculateHour[0] * 60;
}

// "33min"
function convertMinutes(minuteString) {
  let calculateMinutes = minuteString.split("min");
  return Number(calculateMinutes[0]);
}

function convertDuration(duration) {
  let timePieces = duration.split(" ");
  // ["2h", "33min"]
  // ["2h"]
  // ["33min"]

  let minutes = timePieces.reduce((sum, onePiece) => {
    if (onePiece.includes("h")) {
      return sum + convertHours(onePiece);
    }
    return sum + convertMinutes(onePiece);
  }, 0);

  return minutes;
}

function turnHoursToMinutes(movies) {
  let newCentArray = movies.map((oneMovie) => {
    let newMovie = {};
    newMovie.title = oneMovie.title;
    newMovie.year = oneMovie.year;
    newMovie.director = oneMovie.director;
    newMovie.duration = convertDuration(oneMovie.duration);
    newMovie.genre = oneMovie.genre;
    newMovie.rate = oneMovie.rate;

    return newMovie;
  });

  return newCentArray;
}

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average

function bestYearAvg(lotsOfMovies) {
  if (!lotsOfMovies.length) return null;

  let masterObject = {};

  lotsOfMovies.forEach((eachMovie) => {
    if (!masterObject[eachMovie.year]) {
      masterObject[eachMovie.year] = [eachMovie];
    } else {
      masterObject[eachMovie.year].push(eachMovie);
    }
  });

  let highest = 0;
  let theActualYear;
  for (let theYear in masterObject) {
    if (ratesAverage(masterObject[theYear]) > highest) {
      highest = ratesAverage(masterObject[theYear]);
      theActualYear = theYear;
    }
  }
  return `The best year was ${theActualYear} with an average rate of ${highest}`;
}
