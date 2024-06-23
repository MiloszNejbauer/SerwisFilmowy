package bol.pl.movies.movie;

import bol.pl.movies.review.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movie")
@AllArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @PostMapping()
    public ResponseEntity<Movie> add(@RequestBody NewMovieRequest newMovieRequest) {
        return ResponseEntity.ok(movieService.addMovie(newMovieRequest));
    }

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        return ResponseEntity.ok(movieService.getALlMovies());
    }

    @GetMapping("/get")
    public ResponseEntity<Movie> getMovieById(@RequestParam String id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }

}
