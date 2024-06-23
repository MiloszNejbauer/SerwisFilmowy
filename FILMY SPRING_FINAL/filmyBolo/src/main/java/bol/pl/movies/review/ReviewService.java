package bol.pl.movies.review;

import bol.pl.movies.movie.Movie;
import bol.pl.movies.movie.MovieRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final MovieRepository movieRepository;

    public Review addReview(NewReviewRequest request) {

        if (movieRepository.findById(request.getMovieId()).isEmpty()) {
            throw new RuntimeException("Nie ma takiego filmu");
        } else {
            Review review = new Review();

            review.setUsername(request.getUsername());
            review.setMovieId(request.getMovieId());
            review.setDescription(request.getDescription());
            review.setRating(request.getRating());

            reviewRepository.save(review);

            double totalMovieRating = calculateRating(request.getMovieId());
            Movie movie = movieRepository.findById(request.getMovieId()).orElse(null);

            if(movie != null) {
                movie.setTotalRating(totalMovieRating);
                movieRepository.save(movie);
            }

            return review;
        }
    }

    public List<Review> getAllByMovieId(String movieId) {
        return reviewRepository.findAllByMovieId(movieId);
    }


    private double calculateRating(String movieId) {
         Optional<Movie> movieOptional = movieRepository.findById(movieId);
         if (movieOptional.isPresent()) {

             List<Review> reviews = reviewRepository.findAllByMovieId(movieId);

             int ratingSum = 0;
             for (Review review : reviews) {
                 ratingSum += review.getRating();
             }

             return (double) ratingSum / reviews.size();
         } return 0;
    }
}
