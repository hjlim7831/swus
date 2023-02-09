package com.ssaky.swus.api.controller.report;

import com.ssaky.swus.api.request.member.MemberNicknameReq;
import com.ssaky.swus.api.response.report.RoundGetResp;
import com.ssaky.swus.api.service.report.ReportService;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.entity.team.MemberTeam;
import com.ssaky.swus.db.repository.member.MemberRepository;
import com.ssaky.swus.db.repository.team.MemberTeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@Slf4j
@RestController
@RequestMapping("/my-reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;
    private final MemberTeamRepository memberTeamRepository;
    private final MemberRepository memberRepository;

    //해당 그룹의 모든 회차의 레포트 불러오기
    @GetMapping("/{teamId}/member-todos")
    public ResponseEntity<?> getReports(Authentication authentication, @PathVariable int teamId) {
        Map<String, Object> resultMap = new HashMap<>();

        //team에 속한 members (memberId, nickname) 불러오기
        //id불러오고, id로 닉네임 불러와서 members에 저장하기
        List<MemberTeam> memberTeams = memberTeamRepository.findByIdTeamId(teamId, MemberTeam.class);
        List<MemberNicknameReq> members = new ArrayList<>();
        for (MemberTeam memberTeam : memberTeams) {
            int id = memberTeam.getId().getMemberId();
            Optional<Member> member = memberRepository.findById(id, Member.class);
            String nickname = member.get().getNickname();
            members.add(new MemberNicknameReq(id,nickname));
        }

        List<RoundGetResp> rounds = reportService.getReports(teamId, members);
        resultMap.put("rounds", rounds);
        return ResponseEntity.ok(resultMap);
    }

    //해당 회차 완료처리하여 레포트에 날짜 반영하고 회차에 투두리스트 출력
    @GetMapping("/{teamId}/rounds/{round}")
    public ResponseEntity<?> setDoneRound(Authentication authentication,
                                          @PathVariable int teamId, @PathVariable int round) {
        reportService.setDone(teamId, round);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("rounds", "success_set_done_round");

        return ResponseEntity.ok(resultMap);
    }
}
