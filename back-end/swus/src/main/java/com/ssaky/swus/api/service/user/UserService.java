package com.ssaky.swus.api.service.user;

import com.ssaky.swus.api.domain.user.User;

import java.util.Optional;

public interface UserService {

    public int join(User user);

    public boolean validateDuplicateEmail(String email);

    public User findOne(int userId);

    public Optional<User> findOneByEmail(String email);
}
