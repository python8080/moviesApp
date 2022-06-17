import { Component, OnInit } from '@angular/core';
import { Genre } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.movieService.getMovieGenres().subscribe((genresData) => {
      this.genres = genresData;
    });
  }
}
