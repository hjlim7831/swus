package com.ssaky.swus.util;

import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.common.codes.AuthConstants;
import com.ssaky.swus.common.utils.TokenUtils;
import com.ssaky.swus.db.entity.member.Member;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;
import org.springframework.stereotype.Component;

@Component
public class WithAuthUserSecurityContextFactory implements WithSecurityContextFactory<WithAuthUser> {

    private MemberService memberService;

    @Autowired
    public WithAuthUserSecurityContextFactory(MemberService memberService){
        this.memberService = memberService;
    }

    @Override
    public SecurityContext createSecurityContext(WithAuthUser annotation) {
        String email = annotation.email();
        int questionId = 1;
        String answer = "보리";
        String password = "ssafyssafy";
        String nickname = "이매";

        SignUpReq req = SignUpReq.builder().email(email).password(password).nickname(nickname).questionId(questionId).answer(answer).build();
        memberService.join(req);
        Member member = memberService.findOneByEmail(email).get();

        String token = TokenUtils.generateJwtToken(member);
        Claims claims = TokenUtils.getClaimsFromToken(token);
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = new UsernamePasswordAuthenticationToken(claims, null);
        context.setAuthentication(authentication);
        return context;
    }
}
