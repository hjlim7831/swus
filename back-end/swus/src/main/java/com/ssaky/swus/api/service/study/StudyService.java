package com.ssaky.swus.api.service.study;

import com.ssaky.swus.api.request.study.CoreTimeReq;
import com.ssaky.swus.api.request.study.TargetTimeReq;
import com.ssaky.swus.api.request.study.TotalTimeReq;
import com.ssaky.swus.api.response.study.*;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.common.utils.DateUtils;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.entity.study.JandiTime;
import com.ssaky.swus.db.entity.study.Study;
import com.ssaky.swus.db.repository.study.JandiStudyRepository;
import com.ssaky.swus.db.repository.study.StudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class StudyService {

    private final StudyRepository studyRepository;
    private final JandiStudyRepository jandiStudyRepository;

    /**
     * 6시 기준 순공, 총공시간 초기화 / Jandi 기록 입력
     */
    @Scheduled(cron = "0 0 06 * * ?", zone = "Asia/Seoul")
    @Transactional
    protected void dailyUpdate() {
        // 1. 멤버별로 순공, 총공 시간 가져오기
        List<Study> studyTimeList = studyRepository.findAll();

        // 3. 잔디 기록 입력하기 (멤버별 순공, 총공시간)
        saveAllDailyStudyTime(studyTimeList);

        // 2. 순공, 총공시간 0으로 초기화 하기
        jandiStudyRepository.initiateCoreAndTotalTime();
    }

    public TimeJandiResp getJandiRecords(int memberId) {
        // 서울 ZoneId로 가져오기
        LocalDate now = LocalDate.now(ZoneId.of("Asia/Seoul"));
        // 올해 년도 가져오기
        int year = now.getYear();
        String fromDateStr = String.valueOf(year)+"-01-01";
        String toDateStr = String.valueOf(year)+"-12-31";

        Date fromDate = Date.valueOf(fromDateStr);
        Date toDate = Date.valueOf(toDateStr);

        List<DailyTimeResp> timeRecords = jandiStudyRepository.findByIdMemberIdAndIdStudyAtBetween(memberId, fromDate, toDate, DailyTimeResp.class);

        TimeJandiResp resp = TimeJandiResp.builder().year(year).timeRecords(timeRecords).build();

        return resp;
    }

    @Transactional
    protected void saveAllDailyStudyTime(List<Study> studyTimeList) {
        Date yesterday = DateUtils.getYesterday();
        for(Study s: studyTimeList) {
            JandiTime jandiTime = JandiTime.builder()
                    .studyAt(yesterday)
                    .study(s).build();
            jandiStudyRepository.save(jandiTime);
        }
    }

    @Transactional
    public void save(Member member){
        Study study = new Study(member);
        studyRepository.save(study);
    }

    public CoreTimeResp getCoreTime(int memberId) {
        Optional<CoreTimeResp> respO = studyRepository.findByMemberId(memberId, CoreTimeResp.class);
        if (respO.isPresent()){
            return respO.get();
        } else {
            throw new InvalidValueException("Invalid memberId. Check Token");
        }
    }

    @Transactional
    public void updateCoreTime(int memberId, CoreTimeReq req){
        Optional<Study> studyO = studyRepository.findByMemberId(memberId, Study.class);
        if (studyO.isPresent()){
            studyO.get().updateCoreTime(req);
        }else {
            throw new InvalidValueException("Invalid memberId. Check Token");
        }

    }

    public TargetTimeResp getTargetTime(int memberId) {
        Optional<TargetTimeResp> respO = studyRepository.findByMemberId(memberId, TargetTimeResp.class);
        if (respO.isPresent()){
            return respO.get();
        }else{
            throw new InvalidValueException("Invalid memberId. Check Token");
        }
    }

    @Transactional
    public void updateTargetTime(int memberId, TargetTimeReq req){
        Optional<Study> studyO = studyRepository.findByMemberId(memberId, Study.class);
        if (studyO.isPresent()){
            studyO.get().updateTargetTime(req);
        }else {
            throw new InvalidValueException("Invalid memberId. Check Token");
        }
    }

    public TotalTimeResp getTotalTime(int memberId) {
        Optional<TotalTimeResp> respO = studyRepository.findByMemberId(memberId, TotalTimeResp.class);
        if (respO.isPresent()){
            return respO.get();
        }else{
            throw new InvalidValueException("Invalid memberId. Check Token");
        }
    }

    @Transactional
    public void updateTotalTime(int memberId, TotalTimeReq req){
        Optional<Study> studyO = studyRepository.findByMemberId(memberId, Study.class);
        if (studyO.isPresent()){
            studyO.get().updateTotalTime(req);
        }else {
            throw new InvalidValueException("Invalid memberId. Check Token");
        }
    }
}
