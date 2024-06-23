package bol.pl.movies.movie;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public Movie addMovie(NewMovieRequest newMovieRequest) {

       Movie movie = new Movie();
       movie.setTitle(newMovieRequest.getTitle());
       movie.setDescription(newMovieRequest.getDescription());

       movieRepository.save(movie);

       return movie;
    }

    public List<Movie> getALlMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovieById(String id) {
        return movieRepository.findById(id).get();
    }
}
