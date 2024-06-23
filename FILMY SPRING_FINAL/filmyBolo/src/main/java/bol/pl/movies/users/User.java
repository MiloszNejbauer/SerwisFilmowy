package bol.pl.movies.users;

import bol.pl.movies.review.Review;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Document
@Data
@NoArgsConstructor
public class User {
    @MongoId
    private String id;
    private String name;
    private List<Review> reviews;
}
