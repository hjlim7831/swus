package com.ssaky.swus.api.service.team;

import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.team.UpdateBoardReq;
import com.ssaky.swus.api.request.team.WriteBoardReq;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.db.entity.team.Board;
import com.ssaky.swus.db.repository.team.BoardRepository;
import org.junit.jupiter.api.Assertions;
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
    void beforeEach() {
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
    public void 모집글등록() {

        // 주의: test코드에서는 content에 영어만 작성가능 (title은 영한 가능)

        // given
        WriteBoardReq writeBoardReq = new WriteBoardReq(
                "S",
                "React 공부스터디",
                "공부 스터디 english only",
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
        assertEquals("공부 스터디 english only", board.getContent());
    }

//    public void 모집글상세조회() {
//        // given
//
//        // when
//
//        // then
//    }

    @Test
    public void 모집글수정() {
        // given
        Board board = Board.builder()
                .title("Spring 스터디 모집")
                .content("Spring 그 자체가 되실분 구해요")
                .number(5)
                .build();
        boardRepository.save(board);

        UpdateBoardReq updateBoardReq = UpdateBoardReq.builder()
                .title("SpringBoot 스터디 모집")
                .content("SpringBoot 그 자체가 되실분 구해요")
                .boardNumber(3)
                .build();

        // when
        boardService.updateBoard(board.getBoardId(), updateBoardReq);

        // then
        Board changeBoard = boardRepository.findById(board.getBoardId())
                .orElseThrow(() -> new RuntimeException("글이 존재하지 않습니다. id = " + board.getBoardId()));

        Assertions.assertEquals("SpringBoot 스터디 모집", changeBoard.getTitle());
        Assertions.assertEquals("SpringBoot 그 자체가 되실분 구해요", changeBoard.getContent());
    }

    @Test
    public void 게시글삭제() {
        // given
        Board board = Board.builder()
                .title("Spring 스터디 모집")
                .content("Spring 그 자체가 되실분 구해요")
                .number(5)
                .build();
        boardRepository.save(board);

        // when
        boardService.deleteBoard(board.getBoardId());

        // then
        Assertions.assertEquals(0, boardRepository.count());
    }

    @Test
    public void 존재하지않는게시글삭제() {
        // given
        Board board = Board.builder()
                .title("Spring 스터디 모집")
                .content("Spring 그 자체가 되실분 구해요")
                .number(5)
                .build();
        boardRepository.save(board);

        // expected
        Assertions.assertThrows(RuntimeException.class, () -> {
            boardService.deleteBoard(board.getBoardId() + 1);
        });
    }
}
