package com.ssaky.swus.api.controller;

import com.ssaky.swus.api.service.group.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/boards")
    public ResponseEntity<?> writePost(){
        return ResponseEntity.ok();
    }

}
