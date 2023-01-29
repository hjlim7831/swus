package com.ssaky.swus.api.service.user;

import com.ssaky.swus.api.domain.user.User;
import com.ssaky.swus.api.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Transactional
    public int join(User user){
        userRepository.save(user);
        return user.getId();
    }

    public boolean validateDuplicateEmail(String email){
        return !userRepository.findByEmail(email).isEmpty();
    }

    public User findOne(int userId) {return userRepository.findOne(userId);}

    public Optional<User> findOneByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
