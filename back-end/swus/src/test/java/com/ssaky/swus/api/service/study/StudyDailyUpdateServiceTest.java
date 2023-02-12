package com.ssaky.swus.api.service.study;

import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.study.CoreTimeReq;
import com.ssaky.swus.api.request.study.TargetTimeReq;
import com.ssaky.swus.api.request.study.TotalTimeReq;
import com.ssaky.swus.api.response.study.TimeJandiResp;
import com.ssaky.swus.api.response.study.WeeklyTimeResp;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.db.entity.study.Study;
import com.ssaky.swus.db.repository.study.JandiStudyRepository;
import com.ssaky.swus.db.repository.study.StudyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.util.ReflectionTestUtils;

import javax.transaction.Transactional;
import java.util.List;

import static org.junit.Assert.assertEquals;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class StudyDailyUpdateServiceTest {

    @Autowired MemberService memberService;
    @Autowired StudyService studyService;
    @Autowired StudyRepository studyRepository;
    @Autowired JandiStudyRepository jandiStudyRepository;

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

        // 목표시간 입력
        TargetTimeReq targetTimeReq = new TargetTimeReq(90);
        TargetTimeReq targetTimeReq2 = new TargetTimeReq(135);
        studyService.updateTargetTime(memberId, targetTimeReq);
        studyService.updateTargetTime(memberId2, targetTimeReq2);

    }

    @Test
    public void 모든_사용자의_시간_잔디기록하기() {
        List<Study> studyTimeList = studyRepository.findAll();
        System.out.println(studyTimeList);
        ReflectionTestUtils.invokeMethod(studyService, "saveAllDailyStudyTime", studyTimeList);

        TimeJandiResp resp1 = studyService.getJandiRecords(memberId);
        TimeJandiResp resp2 = studyService.getJandiRecords(memberId2);

        assertEquals(75, resp1.getTimeRecords().get(0).getTotalTime());
        assertEquals(120, resp2.getTimeRecords().get(0).getTotalTime());

    }

    @Test
    public void 모든_사용자의_순공_총공시간_초기화() {
        jandiStudyRepository.initiateCoreAndTotalTime();
        assertEquals(0, studyService.getTotalTime(memberId).getNowTotalTime());
        assertEquals(0, studyService.getCoreTime(memberId).getNowCoreTime());

    }

    @Test
    public void 일주일데이터_더하고_가져오기(){
        List<Study> studyTimeList = studyRepository.findAll();
        ReflectionTestUtils.invokeMethod(studyService, "saveAllDailyStudyTime", studyTimeList);
        System.out.println(studyService.getOneWeekData(memberId));
    }







}
