package com.ssaky.swus.api.service.study;

import com.ssaky.swus.api.request.study.CoreTimeReq;
import com.ssaky.swus.api.request.study.TargetTimeReq;
import com.ssaky.swus.api.request.study.TotalTimeReq;
import com.ssaky.swus.api.response.study.CoreTimeResp;
import com.ssaky.swus.api.response.study.TargetTimeResp;
import com.ssaky.swus.api.response.study.TotalTimeResp;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.entity.study.Study;
import com.ssaky.swus.db.repository.study.StudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class StudyService {

    private final StudyRepository studyRepository;

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
