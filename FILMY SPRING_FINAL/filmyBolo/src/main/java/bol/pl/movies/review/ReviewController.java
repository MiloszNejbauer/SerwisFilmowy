package bol.pl.movies.review;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
@AllArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping()
    public ResponseEntity<Review> add(@RequestBody NewReviewRequest request) {
        return ResponseEntity.ok(reviewService.addReview(request));
    }

    @GetMapping
    public ResponseEntity<List<Review>> getAllByMovieId(@RequestParam String movieId) {
        return ResponseEntity.ok(reviewService.getAllByMovieId(movieId));
    }
}
