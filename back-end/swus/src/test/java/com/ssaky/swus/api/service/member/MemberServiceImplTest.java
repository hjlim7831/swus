package com.ssaky.swus.api.service.member;

import com.ssaky.swus.api.request.auth.LoginReq;
import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.common.utils.TokenUtils;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.repository.member.MemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


// SpringExtension을 사용하게 되면 Spring TestContext Framework와 Junit5와 통합하여 사용하게 됨
@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class MemberServiceImplTest {

    @Autowired MemberRepository memberRepository;
    @Autowired MemberService memberService;
    @Autowired EntityManager em;

    @Test
    public void 회원가입() throws Exception {

        // given
        SignUpReq req = new SignUpReq("helenalim1205@gmail.com", "ssafy", "상상", 2, "보광초");

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

        // when

        // then
    }

    @Test
    @WithMockUser
    public void 로그인() throws Exception{
        // given
        String user = "user";
        String password = "password";
        // 로그인을 위해 회원가입 해두기
        SignUpReq signupReq = new SignUpReq(user, password, "유저", 2, "서울초");
        int id = memberService.join(signupReq);
        
        LoginReq loginReq = new LoginReq("user", "password");
        Optional<Member> member = memberService.login(loginReq);

        String accessToken = TokenUtils.generateJwtToken(member.get());



        // when
        String userId = TokenUtils.parseTokenToUserInfo(accessToken);
        System.out.println(userId);
        
        // userId로 회원 정보 가져와서 같은 애인지 비교하기

        // then

    }

}