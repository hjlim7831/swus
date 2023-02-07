package com.ssaky.swus.api.service.group;

import com.ssaky.swus.api.request.group.UpdateBoardReq;
import com.ssaky.swus.api.request.group.WriteBoardReq;
import com.ssaky.swus.api.response.group.BoardGetResp;
import com.ssaky.swus.api.response.group.BoardListResp;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.db.entity.group.Board;
import com.ssaky.swus.db.repository.group.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;

    @Transactional
    public int writeBoard(int memberId, WriteBoardReq req) {
        Board board = Board.builder()
                .memberId(memberId)
                .title(req.getTitle())
                .content(req.getContent())
                .number(req.getBoardNumber())
                .build();
        return boardRepository.save(board).getBoardId();
    }

    @Transactional
    public BoardGetResp getDetailBoard(int boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(IllegalArgumentException::new);    // Id값에 해당하는 게시글이 없을때

        board.updateView(board.getViews());

        return BoardGetResp.builder()
                .title(board.getTitle())
                .content(board.getContent())
                .views(board.getViews())
                .writeAt(board.getWriteAt())
                .boardNumber(board.getNumber())
                .build();
    }

    @Transactional
    public List<BoardListResp> getBoardList() {
        List<Board> boards = boardRepository.findAll();
        List<BoardListResp> boardList = new ArrayList<>();

        for (Board board : boards) {
            BoardListResp resp = BoardListResp.builder()
                    .board_id(board.getBoardId())
                    .title(board.getTitle())
                    .writeAt(board.getWriteAt())
                    .views(board.getViews())
                    .build();

            boardList.add(resp);
        }
        return boardList;
    }

    @Transactional
    public void updateBoard(int boardId, UpdateBoardReq updateBoardReq) {
        Optional<Board> boardO = boardRepository.findById(boardId);

        if (boardO.isEmpty()) {
            throw new InvalidValueException("기존 게시글이 없습니다.");
        }
        boardO.get().update(updateBoardReq);
    }

    @Transactional
    public void deleteBoard(int boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(RuntimeException::new);
        boardRepository.delete(board);
    }
}
