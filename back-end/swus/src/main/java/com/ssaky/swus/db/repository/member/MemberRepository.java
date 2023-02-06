package com.ssaky.swus.db.repository.member;

import com.ssaky.swus.db.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    @Transactional
    Member save(Member member);

    @Transactional
    void delete(Member member);

    @Transactional
    void deleteById(int id);

    @Transactional
    void deleteAll();

    <T> Optional<T> findById(int id, Class<T> type);

    Optional<Member> findByEmail(String email);

    Optional<Member> findByEmailAndPassword(String email, String password);

    Optional<Member> findByEmailAndQuestionIdAndAnswer(String email, int questionId, String answer);

    long count();
}
