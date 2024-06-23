package bol.pl.movies.users;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public User addUser(NewUserRequest newUserRequest) {

       User user = new User();
       user.setName(newUserRequest.getName());

       userRepository.save(user);

       return user;
    }

}