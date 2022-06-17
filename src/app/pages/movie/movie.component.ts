import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieCredits, MovieImages, MovieVideo } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  imagesSizes = IMAGES_SIZES;
  movieCredits: MovieCredits | null = null;
  movieImages: MovieImages | null = null;
  constructor(private route: ActivatedRoute, private movieService: MoviesService) {}

  ngOnInit(): void {
    this.route.params.pipe().subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
    });
  }

  ngOnDestroy() {
    console.log('component destroyed');
  }


  getMovieVideos(id: string) {
    this.movieService.getMovieVideos(id).subscribe((videoData) => {
      this.movieVideos = videoData;
    });
  }

  getMovieImages(id: string) {
    this.movieService.getMovieImage(id).subscribe((imageData) => {
      this.movieImages = imageData;
    });
  }

  getMovie(id: string) {
    this.movieService.getMovie(id).subscribe((movieData) => {
      this.movie = movieData;
      console.log(this.movie);
    });
  }

  getMovieCredits(id: string) {
    this.movieService.getMovieCredit(id).subscribe((movieCreditData) => {
      this.movieCredits = movieCreditData;
      console.log(this.movie);
    });
  }
}
