class Repository {
  constructor() {
    this.storage = {
      1: new Movie(1, 'Evil Dead', 'Ashley Joanna Williams', 2013, 'jpg'),
      2: new Movie( 2, 'Annabelle Creation', 'Stephanie Sigman', 2017, 'jpg'),
      3: new Movie( 3, 'Insidious The Last Key', 'Lin Shaye', 2018, 'jpg'),
      4: new Movie( 4, 'The Conjuring 2', 'Vera Farmiga', 2016, 'jpg'),
      5: new Movie( 5, 'Dawn of Justice', 'Ben Affleck', 2016, 'jpg'),
      6: new Movie( 6, 'Suicide Squad', 'Margot Robbie', 2016, 'jpg'),
      7: new Movie( 7, 'John Wick Chapter 1', 'Keanu Reeves', 2014, 'jpg'),
      8: new Movie( 8, 'John Wick Chapter 2', 'Keanu Reeves', 2017, 'jpg'),
      9: new Movie( 9, 'John Wick Chapter 3', 'Keanu Reeves', 2019, 'jpg'),
      10: new Movie(10, 'Lost In Space S1', 'Maxwell Jenkins', 2018, 'jpg'),
      11: new Movie(11, 'Lost In Space S2', 'Maxwell Jenkins', 2019, 'jpg'),
      12: new Movie(12, 'Pacific Rim', 'John Boyega', 2013, 'jpg'),
      13: new Movie(13, 'Pacific Rim Uprising', 'John Boyega', 2017, 'jpg'),
    };
    this.count = 13;
  }

  insertMovie(name, actor, year, path) {
    this.count += 1;
    this.storage[this.count] = new Movie(this.count, name, actor, year, path);
    return this.count;
  }

  deleteMovie(number) {
    delete this.storage[number];
  }

  updateMovie(pk, option) {
    const {name, actor, year, path} = option;
    const movie = this.storage[pk];
    this.storage[pk] = new Movie(movie.pk, name || movie.name, actor || movie.actor, year || movie.year, path || movie.path);
  }

  getAll() {
    return this.storage;
  }

  getMovie(pk) {
    return this.storage[pk];
  }
}

class Movie {
  constructor(
    pk, name, actor, year, path
  ) {
    this.pk = pk;
    this.name = name;
    this.actor = actor;
    this.year = year;
    this.path = path;
  }
}

module.exports = {repository: new Repository()};