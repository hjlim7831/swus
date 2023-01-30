package com.ssaky.swus.api.service.member;

import com.ssaky.swus.api.controller.auth.SignUpDTO;
import com.ssaky.swus.api.domain.member.Member;
import com.ssaky.swus.api.domain.member.Question;
import com.ssaky.swus.api.repository.member.MemberRepository;
import com.ssaky.swus.api.repository.member.QuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final QuestionRepository questionRepository;

    @Transactional
    public int join(SignUpDTO form){
        Question question = questionRepository.findOne(form.getQuestionId());
        log.debug(String.valueOf(question));
//        System.out.println("question"+question.getId());
        Member member = new Member(form, question);
        System.out.println(member);
        memberRepository.save(member);
        return member.getId();
    }

    public boolean validateDuplicateEmail(String email){
        return !memberRepository.findByEmail(email).isEmpty();
    }

    public Member findOne(int userId) {return memberRepository.findOne(userId);}

    public Optional<Member> findOneByEmail(String email) {
        return memberRepository.findByEmail(email);
    }
}
