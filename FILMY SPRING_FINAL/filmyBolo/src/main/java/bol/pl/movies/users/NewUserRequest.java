package bol.pl.movies.users;

import java.util.List;

import bol.pl.movies.review.Review;
import lombok.Data;


@Data
public class NewUserRequest {
    private String id;
    private String name;
    private List<Review> reviews;
}