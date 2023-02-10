package com.ssaky.swus.api.controller.team;

import com.ssaky.swus.api.request.team.UpdateBoardReq;
import com.ssaky.swus.api.request.team.WriteBoardReq;
import com.ssaky.swus.api.response.group.BoardGetResp;
import com.ssaky.swus.api.response.group.BoardListResp;
import com.ssaky.swus.api.service.team.BoardService;
import com.ssaky.swus.common.utils.TokenUtils;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
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

    @GetMapping("/{board_id}")
    public ResponseEntity<?> getPost(Authentication authentication, @PathVariable("board_id") int boardId) {

        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);

        BoardGetResp boardGetResp = boardService.getDetailBoard(boardId);
        return ResponseEntity.ok(boardGetResp);
    }

    @GetMapping
    public ResponseEntity<?> getPostList(Authentication authentication) {
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);

        List<BoardListResp> boardList = boardService.getBoardList();
        return ResponseEntity.ok(boardList);
    }

    @PatchMapping("/{board_id}")
    public ResponseEntity<?> updatePost(Authentication authentication, @PathVariable("board_id") Integer boardId, @RequestBody @Valid UpdateBoardReq updateBoardReq) {
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);

        boardService.updateBoard(boardId, updateBoardReq);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg", "success_update_board");
        return ResponseEntity.ok(resultMap);
    }

    @DeleteMapping("/{board_id}")
    public ResponseEntity<?> deletePost(Authentication authentication, @PathVariable("board_id") int boardId) {
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);

        boardService.deleteBoard(boardId);
        Map<String, Object> resultMap = new HashMap<>();
        StringBuilder sb = new StringBuilder();
        sb.append("success_delete_board_id_");
        sb.append(boardId);
        resultMap.put("msg", sb);
        return ResponseEntity.ok(resultMap);
    }
}
