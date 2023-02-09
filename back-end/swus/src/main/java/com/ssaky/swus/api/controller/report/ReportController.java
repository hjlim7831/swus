package com.ssaky.swus.api.controller.report;

import com.ssaky.swus.api.request.member.MemberNicknameReq;
import com.ssaky.swus.api.response.report.RoundGetResp;
import com.ssaky.swus.api.service.report.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/my-reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    //해당 그룹의 모든 회차의 레포트 불러오기
    @GetMapping("/{teamId}/member-todos")
    public ResponseEntity<?> getReports(Authentication authentication, @PathVariable int teamId) {
        Map<String, Object> resultMap = new HashMap<>();

        //team에 속한 memberList 불러오기
        //memberList에는 memberId, nickname이 저장되어있어야함

        //임의로 더미데이터 객체 생성
        List<MemberNicknameReq> members = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            MemberNicknameReq member = new MemberNicknameReq(i, "멤버" + i);
            members.add(member);
//            log.debug("생성된 멤버 확인 : "+member.toString());
        }

        List<RoundGetResp> rounds = reportService.getReports(teamId, members);
        resultMap.put("rounds", rounds);
        return ResponseEntity.ok(resultMap);
    }
}
