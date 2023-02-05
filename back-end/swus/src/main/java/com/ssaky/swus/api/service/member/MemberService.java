package com.ssaky.swus.api.service.member;

import com.ssaky.swus.api.request.auth.CheckPwdReq;
import com.ssaky.swus.api.request.auth.LoginReq;
import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.member.MemberUpdateReq;
import com.ssaky.swus.api.response.auth.LoginResp;
import com.ssaky.swus.api.response.member.MemberInfoGetResp;
import com.ssaky.swus.api.service.study.StudyService;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.common.error.exception.custom.LoginFailException;
import com.ssaky.swus.common.error.exception.custom.UncorrectAnswerException;
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

    private final EmailService emailService;
    private final StudyService studyService;
    private final MemberRepository memberRepository;

    @Transactional
    public int join(SignUpReq form){
        Member member = new Member(form);
        log.debug(String.valueOf(member));

        // 1. 이메일 중복 확인하기
        validateDuplicateEmail(form.getEmail());

        // 2. 회원 Table에 회원정보 저장하기
        memberRepository.save(member);

        // 3. 공부 시간 Table 생성하기
        studyService.save(member);
        return member.getId();
    }

    public void updateInfo(int memberId, MemberUpdateReq req){
        Optional<Member> memberO = memberRepository.findById(memberId);
        if (memberO.isPresent()){
            memberO.get().updateInfo(req);
        }else{
            throw new InvalidValueException("Invalid memberId. Check Token");
        }
    }

    public void delete(int memberId){
        Optional<Member> memberO = memberRepository.findById(memberId, Member.class);
        if (memberO.isPresent()){
            memberRepository.delete(memberO.get());
        }else{
            throw new InvalidValueException("Invalid memberId. Check Token");
        }

    }

    public void validateDuplicateEmail(String email){
        memberRepository.findByEmail(email).ifPresent(m -> {
            throw new InvalidValueException("이미 존재하는 회원입니다.");
        });
    }

    public MemberInfoGetResp findOne(int memberId) {
        Optional<MemberInfoGetResp> respO = memberRepository.findById(memberId, MemberInfoGetResp.class);
        if (respO.isPresent()){
            return respO.get();
        }else{
            throw new InvalidValueException("Invalid memberId. Check Token");
        }
    }

    public Optional<Member> findOneByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    public LoginResp login(LoginReq form) {
        Optional<Member> member = memberRepository.findByEmailAndPassword(form.getEmail(), form.getPassword());
        if (member.isPresent()){
            String accessToken = TokenUtils.generateJwtToken(member.get());
            LoginResp resp = LoginResp.builder().member(member.get()).accessToken(accessToken).build();
            return resp;
        }else{
            throw new LoginFailException(form.getEmail());
        }
    }

    public boolean checkAnswerForPasswordQuestion(CheckPwdReq form){
        Optional<Member> member = memberRepository.findByEmailAndQuestionIdAndAnswer(form.getEmail(), form.getQuestionId(), form.getAnswer());
        if (member.isPresent()){
            return emailService.sendEmail(member.get());
        }else{
            throw new UncorrectAnswerException("wrong answer for question");
        }
    }
}
