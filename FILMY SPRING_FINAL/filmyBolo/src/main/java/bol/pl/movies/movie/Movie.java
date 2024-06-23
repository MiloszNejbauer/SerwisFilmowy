package bol.pl.movies.movie;

import bol.pl.movies.review.Review;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Document
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Movie {
    @MongoId
    private String id;
    private String title;
    private String description;
    private Double totalRating;
    private List<Review> reviews;
}
