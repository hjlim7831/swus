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
    public int join(SignUpReq form) {
        // 1. 빈 값들이 있다면 Exception 처리
        if (form.getEmail().equals("") || form.getEmail() == null) {
            throw new InvalidValueException("이메일을 입력하세요.");
        }

        if (form.getPassword().equals("") || form.getPassword() == null) {
            throw new InvalidValueException("비밀번호를 입력하세요.");
        }

        if (form.getNickname().equals("") || form.getNickname() == null) {
            throw new InvalidValueException("닉네임을 입력하세요.");
        }

        if (form.getQuestionId() == 0) {
            throw new InvalidValueException("비밀번호 확인 질문을 선택해 주세요.");
        }

        if (form.getAnswer().equals("") || form.getAnswer() == null) {
            throw new InvalidValueException("비밀번호 확인 질문에 대한 답을 입력해 주세요.");
        }

        Member member = new Member(form);
        log.debug(String.valueOf(member));


        // 2. 이메일 중복 확인하기
        validateDuplicateEmail(form.getEmail());

        // 3. 회원 Table에 회원정보 저장하기
        memberRepository.save(member);

        // 4. 공부 시간 Table 생성하기
        studyService.save(member);
        return member.getId();
    }

    @Transactional
    public String updateInfo(int memberId, MemberUpdateReq req){
        log.debug("기존 비밀번호:{}",req.getOldPassword());
        System.out.println(req.getOldPassword());
        Optional<Member> memberO = memberRepository.findById(memberId);
        // 1. memberId에 해당하는 회원이 없을 경우
        if (memberO.isEmpty()) {
            throw new InvalidValueException("Invalid memberId. Check Token");
        }
        
        // 2. 닉네임이 입력되어 있지 않을 경우
        if (req.getNickname().equals("") || req.getNickname() == null) {
            throw new InvalidValueException("닉네임을 입력해주세요.");
        }

        // 3. oldPassword가 비어있을 경우 -> 비밀번호는 수정하지 않음
        if (req.getOldPassword().equals("") || req.getOldPassword() == null) {
            memberO.get().updateNickname(req);
            return "success_change_nickname";
        }
        
        // 4. oldPassword가 memberO에 있는 password와 일치하지 않을 경우
        if (!memberO.get().getPassword().equals(req.getOldPassword())){
            throw new InvalidValueException("기존 비밀번호가 일치하지 않습니다.");
        }
        memberO.get().updateInfo(req);
        return "success_change_info";
    }

    @Transactional
    public void delete(int memberId) {
        Optional<Member> memberO = memberRepository.findById(memberId, Member.class);
        if (memberO.isPresent()){
            memberRepository.delete(memberO.get());
        }else{
            throw new InvalidValueException("Invalid memberId. Check Token");
        }
    }
    @Transactional
    public void deleteById(int memberId) {
        memberRepository.deleteById(memberId);
    }

    public void validateDuplicateEmail(String email){
        memberRepository.findByEmail(email).ifPresent(m -> {
            throw new InvalidValueException("이미 존재하는 회원입니다.");
        });
    }

    public Member findOne(int memberId){
        Optional<Member> memberO = memberRepository.findById(memberId, Member.class);
        if (memberO.isPresent()){
            return memberO.get();
        }else{
            throw new InvalidValueException("Invalid memberId. Check Token");
        }
    }

    public MemberInfoGetResp findOneInfo(int memberId) {
        Optional<MemberInfoGetResp> respO = memberRepository.findById(memberId, MemberInfoGetResp.class);
        if (respO.isPresent()){
            return respO.get();
        } else {
            throw new InvalidValueException("Invalid memberId. Check Token");
        }
    }

    public Optional<Member> findOneByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    public LoginResp login(LoginReq form) {
        Optional<Member> member = memberRepository.findByEmailAndPassword(form.getEmail(), form.getPassword());
        if (member.isPresent()) {
            String accessToken = TokenUtils.generateJwtToken(member.get());
            LoginResp resp = LoginResp.builder().member(member.get()).accessToken(accessToken).build();
            return resp;
        } else {
            throw new LoginFailException(form.getEmail());
        }
    }

    public boolean checkAnswerForPasswordQuestion(CheckPwdReq form) {
        Optional<Member> member = memberRepository.findByEmailAndQuestionIdAndAnswer(form.getEmail(), form.getQuestionId(), form.getAnswer());
        if (member.isPresent()) {
            return emailService.sendEmail(member.get());
        } else {
            throw new UncorrectAnswerException("wrong answer for question");
        }
    }
}
