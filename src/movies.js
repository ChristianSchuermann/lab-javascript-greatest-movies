// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

function getAllDirectors(moviesArray) {
  return moviesArray.map((movie) =>  movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

function howManyMovies(moviesArray) {
  return moviesArray.filter((movie) => movie.director === "Steven Spielberg" && movie.genre.includes("Drama")).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals

function scoresAverage(moviesArray) {
  if (!moviesArray.length) {
      return 0;
  }

  const total = moviesArray.reduce((sum, movie) => {
  if (movie.score) {
      return sum + movie.score;
  } else {
      return sum;
  }
  }, 0);

  return Number((total / moviesArray.length).toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies

function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter((movies) => movies.genre.includes("Drama"));
  return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(moviesArray) {
  return [...moviesArray].sort((a, b) => {
      if (a.year > b.year) {
          return 1;
      } else if (b.year > a.year) {
          return -1;
      } else {
          if (a.title > b.title) {
              return 1;
          } else if (b.title > a.title) {
              return -1;
          }
          return 0;
      }
  });
return orderArray;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(moviesArray) {
  return [...moviesArray].sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    } else {
      return 0;
    }
  }).map((movies) => movies.title).slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

function turnHoursToMinutes(moviesArray) {
  return moviesArray.map(movie => {
      const times = movie.duration.split(' ');
      const minutes = times.reduce((sum, time) => {
          if (time.includes('h')) {
              const value = parseInt(time.replace('h', ''), 10);
              return sum + value * 60;
          }

          if (time.includes('min')) {
              const value = parseInt(time.replace('min', ''), 10);
              return sum + value;
          }
      }, 0);

      /* BEFORE
      {
          title: Inglorious Basterds,
          duration: '2h 33min'
      }
      */

      movie.duration = minutes;

      /* AFTER
      {
          title: Inglorious Basterds,
          duration: 153
      }
      */
      return movie;
  })
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average

function bestYearAvg(moviesArray) {
  const allYears = {};
  /* 
  {
      1989: [movie1, movie2, ...],
      1990: [movie1, movie2, ...],
      1991: [movie1, movie2, ...]
  }
  */
  moviesArray.forEach(movie => {
      if (!allYears[movie.year]) {
          allYears[movie.year] = [movie];
          return;
      }
      allYears[movie.year].push(movie);
  });
  
  let bestYear = 0;
  let bestScore = 0;

  // [1989, 1990, 1991, 1992]
  const years = Object.keys(allYears);

  for (const currentYear of years) {
      const scoreAvg = +scoresAverage(allYears[currentYear]);
      if (scoreAvg > bestScore) {
          bestScore = scoreAvg;
          bestYear = currentYear;
      }
  }


  return `The best year was ${bestYear} with an average score of ${bestScore}`;
}