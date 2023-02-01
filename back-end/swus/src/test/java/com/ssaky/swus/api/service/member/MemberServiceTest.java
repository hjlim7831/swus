package com.ssaky.swus.api.service.member;

import com.ssaky.swus.api.request.auth.LoginReq;
import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.response.auth.LoginResp;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.common.error.exception.custom.LoginFailException;
import com.ssaky.swus.common.utils.TokenUtils;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.repository.member.MemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


// SpringExtension을 사용하게 되면 Spring TestContext Framework와 Junit5와 통합하여 사용하게 됨
@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class MemberServiceTest {

    @Autowired MemberRepository memberRepository;
    @Autowired MemberService memberService;
    @Autowired EntityManager em;

    @Test
    public void 회원가입() throws Exception {

        // given
        String email = "helenalim1205@gmail.com";
        String password = "ssafy";

        SignUpReq req = SignUpReq.builder().email(email).password(password).nickname("상상").questionId(2).answer("보광초").build();

        // when
        int id = memberService.join(req);
        System.out.println(id);

        // then
        Member findMember = memberRepository.findOne(id).get();
        assertEquals(req.getEmail(), findMember.getEmail());
    }

    @Test
    public void 중복회원_예외() throws Exception {
        // given
        String email = "helenalim1205@gmail.com";
        String password = "ssafy";

        SignUpReq req1 = SignUpReq.builder().email(email).password(password).nickname("상상").questionId(2).answer("보광초").build();
        SignUpReq req2 = SignUpReq.builder().email(email).password(password).nickname("상상").questionId(2).answer("보광초").build();

        // when
        int id1 = memberService.join(req1);

        // then
        assertThrows(InvalidValueException.class, () -> {
            memberService.join(req2);
        });

    }

    @Test
    @WithMockUser
    public void 로그인_실패() throws Exception{
        // given
        String user = "user";
        String password = "password";

        // when
        LoginReq req = LoginReq.builder().email(user).password(password).build();

        // then
        // 해당 유저 정보가 없으므로, LoginFailException이 떠야 함
        assertThrows(LoginFailException.class, () -> {
            memberService.login(req);
        });
    }

    @Test
    @WithAnonymousUser
    public void 세큐리티_로그인_실패() throws Exception{
        // given
        String user = "user1234";
        String password = "password1234";

        // when
        LoginReq req = LoginReq.builder().email(user).password(password).build();

        // then
        // 해당 유저 정보가 없으므로, LoginFailException이 떠야 함
        assertThrows(LoginFailException.class, () -> {
            memberService.login(req);
        });
    }
    
    @Test
    @WithMockUser
    public void 로그인_성공() throws Exception{

        // given
        String user = "user";
        String password = "password";

        // 로그인을 위해 회원가입 해두기
        SignUpReq signupReq = SignUpReq.builder().email(user).password(password).nickname("유저").questionId(2).answer("서울초").build();
        int id = memberService.join(signupReq);
        
        // 회언가입 한 애로 로그인하기
        LoginReq loginReq = LoginReq.builder().email(user).password(password).build();
        LoginResp resp = memberService.login(loginReq);
        
        // 로그인 후 받은 accessToken
        String accessToken = resp.getAccessToken();

        // when
        
        // 얘가 담고 있는 애가 맞는지
        int memberId = Integer.parseInt(TokenUtils.parseTokenToUserInfo(accessToken));

        // then
        assertEquals(id, memberId);

    }

}