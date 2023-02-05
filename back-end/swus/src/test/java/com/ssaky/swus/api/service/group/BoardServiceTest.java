package com.ssaky.swus.api.service.group;

import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.group.WriteBoardReq;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.db.entity.group.Board;
import com.ssaky.swus.db.repository.group.BoardRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class BoardServiceTest {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    BoardService boardService;

    @Autowired
    MemberService memberService;

    static int memberId;
    static int memberId2;

    @BeforeEach
    void beforeEach(){
        String email = "helenalim1205@gmail.com";
        String password = "ssafy";

        SignUpReq signUpReq = SignUpReq.builder().email(email).password(password)
                .nickname("상상").questionId(2).answer("보광초").build();

        memberId = memberService.join(signUpReq);

        String email2 = "ssafy@gmail.com";
        String password2 = "ssafy";
        SignUpReq signUpReq2 = SignUpReq.builder().email(email2).password(password2)
                .nickname("싸피").questionId(2).answer("싸피초").build();

        memberId2 = memberService.join(signUpReq2);

        boardRepository.deleteAll();
    }

    @Test
    public void board등록() {

        // given
        WriteBoardReq writeBoardReq = new WriteBoardReq(
                "S",
                "React 공부스터디",
                "React 공부를 해서 마스터가 되봅시다",
                "1010100",
                6,
                LocalDate.of(2023, 1, 16),
                LocalDate.of(2023, 3, 16),
                LocalTime.of(12, 0, 0),
                LocalTime.of(15, 0, 0)
        );

        System.out.println(writeBoardReq);

        // when
        int boardId = boardService.writeBoard(memberId, writeBoardReq);

        // then
        Board board = boardRepository.findAll().get(0);
        System.out.println("board : " + board);
        assertEquals(boardId, board.getBoardId());
        assertEquals("React 공부스터디", board.getTitle());
        assertEquals("React 공부를 해서 마스터가 되봅시다", board.getContent());
    }
}
