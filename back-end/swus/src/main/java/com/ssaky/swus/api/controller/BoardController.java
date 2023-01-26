package com.ssaky.swus.api.controller;

import com.ssaky.swus.api.service.BoardService;
import com.ssaky.swus.db.entity.Address;
import com.ssaky.swus.db.entity.Board;
import com.ssaky.swus.db.entity.Member;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;

@Controller
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @ApiOperation(
            value = "모집글 작성"
            , notes = "Board를 받아서 모집글 작성")
    @PostMapping("/boards")
    public String create(@Valid Board board) {
        boardService.join(board);
        return "redirect:/";
    }
}
