package com.ssaky.swus.api.controller.todo;

import com.ssaky.swus.api.request.todo.TodoCreateReq;
import com.ssaky.swus.api.request.todo.TodoUpdateReq;
import com.ssaky.swus.api.service.todo.TodoService;
import com.ssaky.swus.common.utils.TokenUtils;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/my-todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<?> getTodoList(Authentication authentication){
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        return ResponseEntity.ok(todoService.getList(memberId));
    }

    @PostMapping
    public ResponseEntity<?> addTodo(Authentication authentication, @RequestBody TodoCreateReq req){
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        int num = todoService.save(req, memberId);
        resultMap.put("num", num);
        return ResponseEntity.ok(resultMap);
    }

    @PutMapping("/{num}")
    public ResponseEntity<?> updateTodo(Authentication authentication, @PathVariable int num, @RequestBody TodoUpdateReq req){
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);

        todoService.update(num, req, memberId);
        resultMap.put("msg", "success_update_todo");
        return ResponseEntity.ok(resultMap);
    }

    @DeleteMapping("/{num}")
    public ResponseEntity<?> deleteTodo(Authentication authentication, @PathVariable int num){
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        todoService.delete(num, memberId);
        resultMap.put("msg", "success_delete_todo");
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("/jandi")
    public ResponseEntity<?> getTodoJandi(Authentication authentication){
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        return ResponseEntity.ok(todoService.getJandiRecords(memberId));

    }
}
