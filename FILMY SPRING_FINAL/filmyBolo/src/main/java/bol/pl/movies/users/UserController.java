package bol.pl.movies.users;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService reviewService;

    @PostMapping()
    public ResponseEntity<User> add(@RequestBody NewUserRequest request) {
        System.out.println(request.toString());
        return ResponseEntity.ok(reviewService.addUser(request));
    }
}