package com.ssaky.swus.config.filter;

import com.ssaky.swus.api.request.auth.LoginReq;
import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.response.auth.LoginResp;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.common.codes.AuthConstants;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.transaction.Transactional;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class JwtAuthorizationFilterTest {

    @Autowired MemberService memberService;

    static String accessToken;

    @BeforeEach
    void beforeEach(){
        String email = "helenalim1205@gmail.com";
        String password = "ssafy";

        SignUpReq signUpReq = SignUpReq.builder().email(email).password(password)
                .nickname("상상").questionId(2).answer("보광초").build();

        int id = memberService.join(signUpReq);

        LoginReq loginReq = LoginReq.builder().email(email).password(password).build();
        LoginResp loginResp = memberService.login(loginReq);
        accessToken = AuthConstants.TOKEN_TYPE+" "+loginResp.getAccessToken();

    }

}