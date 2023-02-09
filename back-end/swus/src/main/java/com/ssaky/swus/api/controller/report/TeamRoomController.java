package com.ssaky.swus.api.controller.report;

import com.ssaky.swus.api.response.report.RoundGetResp;
import com.ssaky.swus.api.service.report.ReportService;
import com.ssaky.swus.api.service.report.TodoGroupMemberService;
import com.ssaky.swus.db.repository.team.TeamRepository;
import com.ssaky.swus.db.repository.team.TeamRepository1;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/grouprooms")
@RequiredArgsConstructor
public class TeamRoomController {

    private final TeamRepository teamRepository;
    private final TeamRepository1 teamRepository1;
    private final ReportService reportService;

    @GetMapping("{teamId}")
    public ResponseEntity<?> enterTeamRoom(Authentication authentication,
                                           @PathVariable int teamId) {
        RoundGetResp round = reportService.getRound(teamId);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg", "success_enter_grouproom");
        resultMap.put("teamId", teamId);
        resultMap.put("sessionName", "group"+teamId);

        if (round == null) { //다음회차가 없다면
            resultMap.put("round", 0);
            resultMap.put("content", "등록된 회차 내용이 없습니다.");
        } else { //다음 회차가 있다면
            resultMap.put("round", round.getRound());
            resultMap.put("content", round.getContent());
        }

        return ResponseEntity.ok(resultMap);
    }
}