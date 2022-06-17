import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  genreId: string | null = null;
  movies: Movie[] = [];
  searchValue: string | null = null;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  getPagedMovies(page: number, searchValue?: string) {
    this.moviesService.searchMovies(page, searchValue).subscribe((movies) => {
      this.movies = movies;
    });
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies;
    });
  }
  paginate(event: any) {
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, event.page + 1);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(event.page + 1, this.searchValue);
      } else {
        this.getPagedMovies(event.page + 1);
      }
    }
  }
  searchChanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
