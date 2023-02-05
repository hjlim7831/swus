package com.ssaky.swus.api.service.member;

import com.ssaky.swus.api.request.auth.CheckPwdReq;
import com.ssaky.swus.api.request.auth.LoginReq;
import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.response.auth.LoginResp;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.common.error.exception.custom.LoginFailException;
import com.ssaky.swus.common.error.exception.custom.UncorrectAnswerException;
import com.ssaky.swus.common.utils.TokenUtils;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.repository.member.MemberRepository;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;


// SpringExtension을 사용하게 되면 Spring TestContext Framework와 Junit5와 통합하여 사용하게 됨
@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class MemberAuthServiceTest {

    @Autowired
    MemberRepository memberRepository;
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
        Member findMember = memberRepository.findById(id, Member.class).get();
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
        
        // 회원가입 한 애로 로그인하기
        LoginReq loginReq = LoginReq.builder().email(user).password(password).build();
        LoginResp resp = memberService.login(loginReq);
        
        // 로그인 후 받은 accessToken
        String accessToken = resp.getAccessToken();

        // when
        
        // 얘가 담고 있는 애가 맞는지
        String s = TokenUtils.parseTokenToUserInfo(accessToken);
        System.out.println(s);
        Claims claims = TokenUtils.getClaimsFromToken(accessToken);
        int memberId = TokenUtils.getmemberIdFromToken(claims);

        // then
        assertEquals(id, memberId);

    }

    @Test
    public void 비밀번호_확인_실패(){

        // given
        // 가입한 회원 만들기
        String email = "helenalim1205@gmail.com";
        String password = "ssafy";

        SignUpReq signUpReq = SignUpReq.builder().email(email).password(password).nickname("상상").questionId(2).answer("보광초").build();
        int id = memberService.join(signUpReq);

        // when
        CheckPwdReq req1 = CheckPwdReq.builder().email(email).questionId(1).answer("보광초").build();
        CheckPwdReq req2 = CheckPwdReq.builder().email(email).questionId(2).answer("신중초").build();

        // then
        
        // questionId가 잘못된 경우
        assertThrows(UncorrectAnswerException.class, () -> {
            memberService.checkAnswerForPasswordQuestion(req1);
        });
        
        // questionId는 맞지만, 답이 아닌 경우
        assertThrows(UncorrectAnswerException.class, () -> {
            memberService.checkAnswerForPasswordQuestion(req2);
        });

    }

    @Test
    public void 이메일_중복일때(){
        // given
        String email = "helenalim1205@gmail.com";
        String password = "ssafy";

        SignUpReq req = SignUpReq.builder().email(email).password(password).nickname("상상").questionId(2).answer("보광초").build();

        // when
        int id = memberService.join(req);

        // then
        assertThrows(InvalidValueException.class, ()-> {
            memberService.validateDuplicateEmail(email);
        });

    }

}