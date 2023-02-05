package com.ssaky.swus.api.service.study;

import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.study.CoreTimeReq;
import com.ssaky.swus.api.request.study.TargetTimeReq;
import com.ssaky.swus.api.request.study.TotalTimeReq;
import com.ssaky.swus.api.response.study.CoreTimeResp;
import com.ssaky.swus.api.response.study.TargetTimeResp;
import com.ssaky.swus.api.response.study.TotalTimeResp;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.db.repository.study.StudyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class StudyServiceTest {

    @Autowired StudyService studyService;
    @Autowired StudyRepository studyRepository;
    @Autowired MemberService memberService;

    static int memberId1;
    static int memberId2;

    @BeforeEach
    void beforeEach(){
        String email = "helenalim1205@gmail.com";
        String password = "ssafy";

        SignUpReq signUpReq = SignUpReq.builder().email(email).password(password)
                .nickname("상상").questionId(2).answer("보광초").build();

        memberId1 = memberService.join(signUpReq);

        String email2 = "ssafy@gmail.com";
        String password2 = "ssafy";
        SignUpReq signUpReq2 = SignUpReq.builder().email(email2).password(password2)
                .nickname("싸피").questionId(2).answer("싸피초").build();

        memberId2 = memberService.join(signUpReq2);
    }

    @Test
    public void 총공시간_조회(){
        assertEquals(studyService.getTotalTime(memberId1).getNowTotalTime(), 0);
        
    }

    @Test
    public void 총공시간_업데이트(){
        int time = 75;
        TotalTimeReq req = new TotalTimeReq(time);
        studyService.updateTotalTime(memberId1, req);
        assertEquals(time, studyRepository.findByMemberId(memberId1, TotalTimeResp.class).get().getNowTotalTime());

    }

    @Test
    public void 순공시간_조회(){
        assertEquals(studyService.getCoreTime(memberId1).getNowCoreTime(), 0);

    }

    @Test
    public void 순공시간_업데이트(){
        int time = 75;
        CoreTimeReq req = new CoreTimeReq(time);
        studyService.updateCoreTime(memberId1, req);
        assertEquals(time, studyRepository.findByMemberId(memberId1, CoreTimeResp.class).get().getNowCoreTime());

    }
    @Test

    public void 목표시간_조회(){
        assertEquals(studyService.getTargetTime(memberId1).getTargetTime(), 0);
    }

    @Test
    public void 목표시간_업데이트(){
        int time = 75;
        TargetTimeReq req = new TargetTimeReq(time);
        studyService.updateTargetTime(memberId1, req);
        assertEquals(time, studyRepository.findByMemberId(memberId1, TargetTimeResp.class).get().getTargetTime());

    }

}