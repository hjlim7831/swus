package com.ssaky.swus.api.service.group;

import com.ssaky.swus.api.request.group.WriteBoardReq;
import com.ssaky.swus.db.entity.group.Board;
import com.ssaky.swus.db.repository.group.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;

    @Transactional
    public int writeBoard(int memberId, WriteBoardReq req) {
        System.out.println(req);
        Board board = Board.builder()
                .memberId(memberId)
                .title(req.getTitle())
                .content(req.getContent())
                .number(req.getBoardNumber())
                .build();
        return boardRepository.save(board).getBoardId();
    }
}
