package bol.pl.movies.review;

import lombok.Data;


@Data
public class NewReviewRequest {
    private String movieId;
    private String description;
    private Integer rating;
    private String username;
}
