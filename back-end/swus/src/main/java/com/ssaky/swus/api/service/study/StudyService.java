package com.ssaky.swus.api.service.study;

import com.ssaky.swus.api.request.study.CoreTimeReq;
import com.ssaky.swus.api.request.study.TargetTimeReq;
import com.ssaky.swus.api.request.study.TotalTimeReq;
import com.ssaky.swus.api.response.study.CoreTimeResp;
import com.ssaky.swus.api.response.study.TargetTimeResp;
import com.ssaky.swus.api.response.study.TotalTimeResp;
import com.ssaky.swus.db.repository.study.StudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class StudyService {

    @Autowired StudyRepository studyRepository;

    public CoreTimeResp getCoreTime(int memberId) {


        return null;
    }

    public void updateCoreTime(int memberId, CoreTimeReq req){

    }

    public TargetTimeResp getTargetTime(int memberId) {

        return null;
    }

    public void updateTargetTime(int memberId, TargetTimeReq req){

    }

    public TotalTimeResp getTotalTime(int memberId) {

        return null;
    }

    public void updateTotalTime(int memberId, TotalTimeReq req){

    }


}
