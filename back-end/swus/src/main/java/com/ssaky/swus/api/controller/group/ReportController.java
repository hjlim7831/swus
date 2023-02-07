package com.ssaky.swus.api.controller.group;

import com.ssaky.swus.api.request.group.GroupInviteReq;
import com.ssaky.swus.api.service.group.GroupService;
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
@RequestMapping("my-reports")
@RequiredArgsConstructor
public class ReportController {

    private final GroupService groupService;

    // 그룹 정보 수정
    @PutMapping("my-reports/{group_id}")
    public ResponseEntity<?> updateGroupInfo(Authentication authentication, @PathVariable("group_id") int groupId) {
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        groupService.updateGroupInfo(groupId, memberId);
        resultMap.put("group_id", groupId);
        return ResponseEntity.ok(resultMap);
    }

    // 그룹원들 투두 목록 조회
    @GetMapping("my-reports/{group_id}/member-todos")
    public ResponseEntity<?> getGroupMemberTodos(Authentication authentication, @PathVariable("group_id") int groupId) {
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        return ResponseEntity.ok(groupService.getGroupMemberTodos(groupId, memberId));
    }

    @PostMapping("my-reports/{group_id}/invite")
    public ResponseEntity<?> inviteMember(Authentication authentication, @PathVariable("group_id") int groupId, GroupInviteReq req) {
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        groupService.inviteMember(groupId, memberId, req);
        resultMap.put("msg", "success_add_group_member");
        return ResponseEntity.ok(resultMap);
    }

    @DeleteMapping("my-reports/{group_id}")
    public ResponseEntity<?> groupWithdrawal(Authentication authentication, @PathVariable("group_id") int groupId) {
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        groupService.groupWithdrawal(groupId, memberId);
        return ResponseEntity.ok(resultMap);
    }

    // [6] 그룹 열람실 스크린샷 이미지 조회 my-reports/{group_id}/images

}
