package com.ssaky.swus.api.controller.member;

import com.ssaky.swus.api.request.member.MemberUpdateReq;
import com.ssaky.swus.api.service.team.TeamService1;
import com.ssaky.swus.api.service.member.MemberService;
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
@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final TeamService1 teamService;

    @GetMapping("my-info")
    public ResponseEntity<?> getInfo(Authentication authentication){
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        return ResponseEntity.ok(memberService.findOneInfo(memberId));
    }

    @PutMapping("my-info")
    public ResponseEntity<?> updateInfo(Authentication authentication, @RequestBody MemberUpdateReq req){
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        String msg = memberService.updateInfo(memberId, req);
        resultMap.put("msg", msg);
        return ResponseEntity.ok(resultMap);
    }

    @DeleteMapping("my-info")
    public ResponseEntity<?> withdraw(Authentication authentication){
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        memberService.delete(memberId);
        resultMap.put("msg", "success_withdraw_member");
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("my-groups")
    public ResponseEntity<?> getMyGroupList(Authentication authentication) {
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        return ResponseEntity.ok(teamService.getTeamList(memberId));
    }


    @GetMapping("my-groups/{team_id}")
    public ResponseEntity<?> getGroupInfo(Authentication authentication, @PathVariable("team_id") int teamId) {
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        return ResponseEntity.ok(teamService.getTeamDetailInfo(teamId, memberId));
    }
}