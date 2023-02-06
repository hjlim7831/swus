package com.ssaky.swus.api.service.study;

import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.study.CoreTimeReq;
import com.ssaky.swus.api.request.study.TotalTimeReq;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.db.repository.study.StudyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.transaction.Transactional;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class StudyDailyUpdateServiceTest {

    @Autowired MemberService memberService;
    @Autowired StudyService studyService;
    @Autowired StudyRepository studyRepository;

    static int memberId;
    static int memberId2;

    @BeforeEach
    void beforeEach() {
        // 회원가입
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

        // 총공시간 입력
        TotalTimeReq totalTimeReq = new TotalTimeReq(75);
        TotalTimeReq totalTimeReq2 = new TotalTimeReq(120);

        studyService.updateTotalTime(memberId, totalTimeReq);
        studyService.updateTotalTime(memberId2, totalTimeReq2);

        // 순공시간 입력
        CoreTimeReq coreTimeReq = new CoreTimeReq(60);
        CoreTimeReq coreTimeReq2 = new CoreTimeReq(105);

        studyService.updateCoreTime(memberId, coreTimeReq);
        studyService.updateCoreTime(memberId2, coreTimeReq2);

    }

    @Test
    public void 모든_사용자의_시간_잔디기록하기() {
        // TODO
    }

    @Test
    public void 모든_사용자의_순공_총공시간_초기화() {
        // TODO
    }

    


}
