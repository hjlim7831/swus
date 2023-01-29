package com.ssaky.swus.api.repository.user;

import com.ssaky.swus.api.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final EntityManager em;

    public void save(User user) {em.persist(user);}

    public User findOne(int id) {return em.find(User.class, id);}

    public Optional<User> findByEmail(String email){
        List<User> resultList = em.createQuery("select u from User u where u.email = :email", User.class)
                .setParameter("email", email)
                .getResultList();

        if (resultList.isEmpty()){
            return Optional.empty();
        }else{
            return Optional.of(resultList.get(0));
        }
    }

}
