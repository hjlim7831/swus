package com.ssaky.swus.db.repository;

import com.ssaky.swus.db.entity.Board;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BoardRepositoryTest {

    @Autowired BoardRepository boardRepository;

    @Test
    @Transactional
    @Rollback(false)
    public void save() {
        Board board = new Board();
        board.setTitle("안녕");
        boardRepository.save(board);
    }

    @Test
    public void delete() {
    }

    @Test
    public void findOne() {
    }

    @Test
    public void findAll() {
    }
}

