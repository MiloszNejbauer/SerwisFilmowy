package bol.pl.movies.movie;

import lombok.Data;

@Data
public class NewMovieRequest {
    private String title;
    private String description;
}
