package com.ssaky.swus.api.service.member;

import ch.qos.logback.core.LogbackException;
import com.ssaky.swus.api.request.auth.LoginReq;
import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.response.auth.LoginResp;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.common.error.exception.custom.LoginFailException;
import com.ssaky.swus.common.utils.TokenUtils;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public int join(SignUpReq form){
        Member member = new Member(form);
        log.debug(String.valueOf(member));

        validateDuplicateEmail(form.getEmail());
        memberRepository.save(member);
        return member.getId();
    }

    public void validateDuplicateEmail(String email){
        memberRepository.findByEmail(email).ifPresent(m -> {
            throw new InvalidValueException("이미 존재하는 회원입니다.");
        });
    }

    public Optional<Member> findOne(int memberId) {return memberRepository.findOne(memberId);}

    public Optional<Member> findOneByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    public LoginResp login(LoginReq form) {
        Optional<Member> member = memberRepository.checkEmailAndPassword(form);
        if (member.isPresent()){
            String accessToken = TokenUtils.generateJwtToken(member.get());
            LoginResp resp = LoginResp.builder().member(member.get()).accessToken(accessToken).build();
            return resp;
        }else{
            throw new LoginFailException(form.getEmail());
        }
    }
}
