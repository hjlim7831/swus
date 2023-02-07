package com.ssaky.swus.api.controller.report;

import com.ssaky.swus.api.request.report.TodoGroupMemberCreateReq;
import com.ssaky.swus.api.request.report.TodoGroupMemberUpdateReq;
import com.ssaky.swus.api.service.report.TodoGroupMemberService;
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
@RequestMapping("/my-groups")
@RequiredArgsConstructor
public class TodoGroupMemberController {

    private final TodoGroupMemberService todoGroupMemberService;

    //나의 그룹 투두리스트 조회
    @GetMapping("{groupId}/round/{round}")
    public ResponseEntity<?> getTodoList(Authentication authentication, @PathVariable int groupId, @PathVariable int round){
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        return ResponseEntity.ok(todoGroupMemberService.getList(memberId,groupId,round));
    }

    //나의 그룹 투두리스트 생성
    @PostMapping("{groupId}/round/{round}")
    public ResponseEntity<?> addTodo(Authentication authentication,
                                     @PathVariable int groupId, @PathVariable int round,
                                     @RequestBody TodoGroupMemberCreateReq req){
        req.setRound(round);
        req.setGroupId(groupId);

        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        int num = todoGroupMemberService.save(req, memberId);
        resultMap.put("num", num);
        return ResponseEntity.ok(resultMap);
    }

    //나의 그룹투두리스트 수정
    @PutMapping("{groupId}/round/{round}/num/{num}")
    public ResponseEntity<?> updateTodo(@PathVariable int groupId, @PathVariable int round, @PathVariable int num,
                                        @RequestBody TodoGroupMemberUpdateReq req){
        Map<String, Object> resultMap = new HashMap<>();
        todoGroupMemberService.update(num, req);
        resultMap.put("msg", "success_update_todo");
        return ResponseEntity.ok(resultMap);
    }

    //나의 그룹투두리스트 삭제
    @DeleteMapping("/{num}")
    public ResponseEntity<?> deleteTodo(Authentication authentication, @PathVariable int num){
        Map<String, Object> resultMap = new HashMap<>();
        todoGroupMemberService.delete(num);
        resultMap.put("msg", "success_delete_todo");
        return ResponseEntity.ok(resultMap);
    }

}
