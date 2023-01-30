package com.ssaky.swus.api.service.member;

import com.ssaky.swus.api.request.auth.LoginDTO;
import com.ssaky.swus.api.request.auth.SignUpDTO;
import com.ssaky.swus.api.domain.member.Member;
import com.ssaky.swus.api.repository.member.MemberRepository;
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

    @Transactional
    public int join(SignUpDTO form){
        Member member = new Member(form);
        log.debug(String.valueOf(member));
        memberRepository.save(member);
        return member.getId();
    }

    @Override
    public boolean validateDuplicateEmail(String email){
        return !memberRepository.findByEmail(email).isEmpty();
    }

    @Override
    public Member findOne(int userId) {return memberRepository.findOne(userId);}

    @Override
    public Optional<Member> findOneByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    @Override
    public Optional<Member> login(LoginDTO form) {
        return memberRepository.checkEmailAndPassword(form);
    }
}
