package com.ssaky.swus.api.controller.team;

import com.ssaky.swus.api.request.team.TeamTodoListUpdateReq;
import com.ssaky.swus.api.request.team.TeamInfoUpdateReq;
import com.ssaky.swus.api.request.team.TeamInviteReq;
import com.ssaky.swus.api.service.team.TeamService1;
import com.ssaky.swus.common.utils.TokenUtils;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("my-teams")
public class TeamController {

    private final TeamService1 teamService;

    // 그룹 정보 수정
    @PutMapping("{team_id}")
    public ResponseEntity<?> updateTeamInfo(Authentication authentication, @PathVariable("team_id") int teamId, @RequestBody TeamInfoUpdateReq req) {
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        teamService.updateTeamInfo(teamId, memberId, req);
        resultMap.put("team_id", teamId);
        return ResponseEntity.ok(resultMap);
    }
    
    // 그룹 투두 수정
    @PutMapping("{team_id}/team-todos")
    public ResponseEntity<?> updateGroupTodos(Authentication authentication, @PathVariable("team_id") int teamId, @RequestBody TeamTodoListUpdateReq req) {
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        System.out.println(req);
        teamService.updateTeamTodos(teamId, memberId, req);
        resultMap.put("team_id", teamId);
        return ResponseEntity.ok(resultMap);
    }

    @PostMapping("{team_id}/invite")
    public ResponseEntity<?> inviteMember(Authentication authentication, @PathVariable("team_id") int teamId, @RequestBody TeamInviteReq req) {
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        teamService.inviteMember(teamId, memberId, req);
        resultMap.put("msg", "success_add_team_member");
        return ResponseEntity.ok(resultMap);
    }

    @DeleteMapping("{team_id}")
    public ResponseEntity<?> teamWithdrawal(Authentication authentication, @PathVariable("team_id") int teamId) {
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        teamService.teamWithdrawal(teamId, memberId);
        resultMap.put("msg", "success_withdraw_team");
        return ResponseEntity.ok(resultMap);
    }

    // 그룹 종료 전환
    @PostMapping("{team_id}/done")
    public ResponseEntity<?> updateDone(Authentication authentication, @PathVariable("team_id") int teamId) {
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        teamService.updateDone(teamId, memberId);
        resultMap.put("msg", "success_team_convert_done");
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("{team_id}/name")
    public ResponseEntity<?> getTeamName(@PathVariable("team_id") int teamId) {
        return ResponseEntity.ok(teamService.getTeamName(teamId));
    }

    // [6] 그룹 열람실 스크린샷 이미지 조회 my-reports/{team_id}/images

}
