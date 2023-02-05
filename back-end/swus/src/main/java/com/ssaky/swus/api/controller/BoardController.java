package com.ssaky.swus.api.controller;

import com.ssaky.swus.api.request.group.WritePostReq;
import com.ssaky.swus.api.service.group.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> writePost(@RequestBody WritePostReq post){

        Map<String, Object> resultMap = new HashMap<>();
        log.debug(String.valueOf(post));



//        return ResponseEntity.ok();
    }

}
