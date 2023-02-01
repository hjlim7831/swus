package com.ssaky.swus.api.service.member;

import com.ssaky.swus.db.entity.member.Member;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.transaction.Transactional;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class EmailServiceTest {

    @Autowired EmailService emailService;

    @Test
    public void 이메일_전송(){

        // given
        Member member = Member.builder()
                .email("hjlim7831@gmail.com")
                .password("ssafyssafy")
                .nickname("이매").build();

        // when & then
        emailService.sendEmail(member);
    }

}