package com.ssaky.swus.db.repository.member;

import com.ssaky.swus.db.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    Member save(Member member);

    void delete(Member member);

    <T> Optional<T> findById(int id, Class<T> type);

    Optional<Member> findByEmail(String email);

    Optional<Member> findByEmailAndPassword(String email, String password);

    Optional<Member> findByEmailAndQuestionIdAndAnswer(String email, int questionId, String answer);


}
