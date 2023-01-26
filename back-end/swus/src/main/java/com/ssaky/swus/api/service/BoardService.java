package com.ssaky.swus.api.service;

import com.ssaky.swus.db.entity.Board;
import com.ssaky.swus.db.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor //final 있는 필드만 생성자 생성
public class BoardService {

    private final BoardRepository boardRepository;

    @Transactional
    public Long join(Board board) {
        boardRepository.save(board);
        return board.getId();
    }

}
