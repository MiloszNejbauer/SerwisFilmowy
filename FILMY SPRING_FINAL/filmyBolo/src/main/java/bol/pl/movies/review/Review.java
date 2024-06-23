package bol.pl.movies.review;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;


@Document
@NoArgsConstructor
@Data
public class Review {
    @MongoId
    private String id;
    private String movieId;
    private String description;
    private Integer rating;
    private String username;
}
