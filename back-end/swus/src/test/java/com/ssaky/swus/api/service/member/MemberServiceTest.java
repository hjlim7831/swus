package com.ssaky.swus.api.service.member;

import com.ssaky.swus.api.request.auth.CheckPwdReq;
import com.ssaky.swus.api.request.auth.LoginReq;
import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.member.MemberUpdateReq;
import com.ssaky.swus.api.response.auth.LoginResp;
import com.ssaky.swus.api.response.member.MemberInfoGetResp;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.common.error.exception.custom.LoginFailException;
import com.ssaky.swus.common.error.exception.custom.UncorrectAnswerException;
import com.ssaky.swus.common.utils.TokenUtils;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.repository.member.MemberRepository;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;


// SpringExtension을 사용하게 되면 Spring TestContext Framework와 Junit5와 통합하여 사용하게 됨
@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class MemberServiceTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired MemberService memberService;

    static int memberId;
    static int memberId2;

    @BeforeEach
    void beforeEach(){
        String email = "helenalim1205@gmail.com";
        String password = "ssafy";

        SignUpReq signUpReq = SignUpReq.builder().email(email).password(password)
                .nickname("상상").questionId(2).answer("보광초").build();

        memberId = memberService.join(signUpReq);

        String email2 = "ssafy@gmail.com";
        String password2 = "ssafy";
        SignUpReq signUpReq2 = SignUpReq.builder().email(email2).password(password2)
                .nickname("싸피").questionId(2).answer("싸피초").build();

        memberId2 = memberService.join(signUpReq2);
    }

    @Test
    public void 회원정보_조회(){
        MemberInfoGetResp resp = memberService.findOneInfo(memberId);
        System.out.println(resp);
        assertEquals("helenalim1205@gmail.com", resp.getEmail());
        assertEquals("상상", resp.getNickname());
    }

    @Test
    public void 회원정보_수정_기존_비밀번호_다름(){
        String nickname = "상상12";
        String newPassword = "ssafy123";
        MemberUpdateReq req = MemberUpdateReq.builder()
                .oldPassword("ssafy_wrong")
                .newPassword(newPassword)
                .nickname(nickname).build();
        assertThrows(InvalidValueException.class, () -> {
            memberService.updateInfo(memberId, req);
        });
    }

    @Test
    public void 회원정보_수정_기존_비밀번호_같음(){
        String nickname = "상상12";
        String newPassword = "ssafy123";
        MemberUpdateReq req = MemberUpdateReq.builder()
                .oldPassword("ssafy")
                .newPassword(newPassword)
                .nickname(nickname).build();

        memberService.updateInfo(memberId, req);

        MemberInfoGetResp resp = memberService.findOneInfo(memberId);
        Member one = memberService.findOne(memberId);
        assertEquals(one.getNickname(), nickname);
        assertEquals(one.getPassword(), newPassword);
    }

    @Test
    public void 회원_탈퇴(){
        memberService.delete(memberId);
        // TODO: 다른 테이블도 살아있는지 확인하기


    }



}