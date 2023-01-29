package com.ssaky.swus.api.service.user;

import com.ssaky.swus.api.domain.user.User;
import com.ssaky.swus.api.domain.user.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userService.findOneByEmail(email);
        if (user.isPresent()){
            return new UserDetailsImpl(user.get());
        }else {
            return null;
        }
    }
}
