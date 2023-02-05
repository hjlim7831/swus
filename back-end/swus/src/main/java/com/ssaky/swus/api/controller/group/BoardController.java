package com.ssaky.swus.api.controller.group;

import com.ssaky.swus.api.request.group.WriteBoardReq;
import com.ssaky.swus.api.service.group.BoardService;
import com.ssaky.swus.common.utils.TokenUtils;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/boards")
public class BoardController {

    private final BoardService boardService;

    @PostMapping("")
    public ResponseEntity<?> writePost(Authentication authentication, @RequestBody WriteBoardReq boardReq){

        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);

        int boardId = boardService.writeBoard(memberId, boardReq);
        resultMap.put("msg", "success_write_board");
        resultMap.put("board_id", boardId);
        return ResponseEntity.ok(resultMap);
    }



}
