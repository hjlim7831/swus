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
import java.time.LocalDate;
import java.util.List;

import static org.junit.Assert.assertEquals;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class StudyWeeklyDataTest {

    @Autowired StudyService studyService;

    @Test
    public void 일주일데이터_가져오기() {
        WeeklyTimeResp resp = studyService.getOneWeekData(7);
        System.out.println(resp);
    }
}
