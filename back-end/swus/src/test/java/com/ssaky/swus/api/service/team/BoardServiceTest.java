package com.ssaky.swus.api.service.team;

import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.team.UpdateBoardReq;
import com.ssaky.swus.api.request.team.WriteBoardReq;
import com.ssaky.swus.api.response.group.BoardGetResp;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.db.entity.team.Board;
import com.ssaky.swus.db.entity.team.Team;
import com.ssaky.swus.db.repository.member.MemberRepository;
import com.ssaky.swus.db.repository.team.BoardRepository;
import com.ssaky.swus.db.repository.team.MemberTeamRepository;
import com.ssaky.swus.db.repository.team.TeamRepository1;
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
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
//@Transactional
public class BoardServiceTest {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    TeamRepository1 teamRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    BoardService boardService;

    @Autowired
    MemberService memberService;

    @Autowired
    MemberTeamRepository memberTeamRepository;

    static int memberId;
    static int memberId2;

    @BeforeEach
    void beforeEach() {
        boardRepository.deleteAll();
        memberTeamRepository.deleteAll();
        teamRepository.deleteAll();
        memberRepository.deleteAll();

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
        String category = "S";
        String title = "React 공부 스터디";
        String content = "공부 스터디 english only";
        String day = "1010100";
        LocalDate beginAt = LocalDate.of(2023, 1, 16);
        LocalDate endAt = LocalDate.of(2023, 3, 16);
        LocalTime startTime = LocalTime.of(12, 0, 0);
        LocalTime finishTime = LocalTime.of(15, 0, 0);

        int boardNumber = 6;
        WriteBoardReq writeBoardReq = new WriteBoardReq(
                category,
                title,
                content,
                day,
                boardNumber,
                beginAt,
                endAt,
                startTime,
                finishTime
        );

        System.out.println(writeBoardReq);

        // when
        int boardId = boardService.writeBoard(memberId, writeBoardReq);

        // then
        Board board = boardRepository.findByBoardId(boardId, Board.class).get();
        int teamId = board.getTeam().getTeamId();

        // 팀
        Team team = teamRepository.findByTeamId(teamId, Team.class).get();
        assertEquals("N", team.getTeamDone());
        assertEquals(beginAt, team.getBeginAt());
        assertEquals(endAt, team.getEndAt());
        assertEquals(finishTime, team.getFinishTime());
        assertEquals(startTime, team.getStartTime());
        assertEquals(title, team.getTeamName());
        assertEquals(content, team.getTeamInfo());
        assertEquals(category, team.getCategory());
        assertEquals(day, team.getDay());
        assertEquals(boardNumber, team.getRecruitmentNumber());
        assertEquals(1, team.getTeamNumber());
        
        // 보드
        assertEquals(boardId, board.getBoardId());
        assertEquals(title, board.getTitle());
        assertEquals(content, board.getContent());
        assertEquals(0, board.getViews());
    }

    @Test
    public void 모집글상세조회() {
        // given
        String category = "S";
        String title = "React 공부 스터디";
        String content = "공부 스터디 english only";
        String day = "1010100";
        LocalDate beginAt = LocalDate.of(2023, 1, 16);
        LocalDate endAt = LocalDate.of(2023, 3, 16);
        LocalTime startTime = LocalTime.of(12, 0, 0);
        LocalTime finishTime = LocalTime.of(15, 0, 0);

        int boardNumber = 6;
        WriteBoardReq writeBoardReq = new WriteBoardReq(
                category,
                title,
                content,
                day,
                boardNumber,
                beginAt,
                endAt,
                startTime,
                finishTime
        );

        // when
        int boardId = boardService.writeBoard(memberId, writeBoardReq);

        BoardGetResp detailBoard = boardService.getDetailBoard(boardId);

        // then
        System.out.println(detailBoard);
    }

    @Test
    public void 모집글수정() {
        // given
        String category = "S";
        String title = "React 공부 스터디";
        String content = "공부 스터디 english only";
        String day = "1010100";
        LocalDate beginAt = LocalDate.of(2023, 1, 16);
        LocalDate endAt = LocalDate.of(2023, 3, 16);
        LocalTime startTime = LocalTime.of(12, 0, 0);
        LocalTime finishTime = LocalTime.of(15, 0, 0);

        int boardNumber = 6;
        WriteBoardReq writeBoardReq = new WriteBoardReq(
                category,
                title,
                content,
                day,
                boardNumber,
                beginAt,
                endAt,
                startTime,
                finishTime
        );

        int boardId = boardService.writeBoard(memberId, writeBoardReq);
        Board board = boardRepository.findByBoardId(boardId, Board.class).get();

        int teamId = board.getTeam().getTeamId();

        String updateCategory = "M";
        String updateTitle = "SpringBoot 스터디 모집";
        String updateContent = "SpringBoot 그 자체가 되실분 구해요";
        String updateDay = "1111000";
        int updateBoardNumber = 3;
        LocalDate updateBeginAt = LocalDate.of(2023, 2, 10);
        LocalDate updateEndAt = LocalDate.of(2024, 12, 5);
        LocalTime updateStartTime = LocalTime.of(9, 0, 0);
        LocalTime updateFinishTime = LocalTime.of(13, 0, 0);


        UpdateBoardReq updateBoardReq = UpdateBoardReq.builder()
                .category(updateCategory)
                .title(updateTitle)
                .content(updateContent)
                .day(updateDay)
                .boardNumber(updateBoardNumber)
                .beginAt(updateBeginAt)
                .endAt(updateEndAt)
                .startTime(updateStartTime)
                .finishTime(updateFinishTime)
                .build();
        System.out.println(updateBoardReq);
        // when
        boardService.updateBoard(board.getBoardId(), updateBoardReq);

        // then
        Board changeBoard = boardRepository.findById(board.getBoardId())
                .orElseThrow(() -> new RuntimeException("글이 존재하지 않습니다. id = " + board.getBoardId()));

        Team team = teamRepository.findByTeamId(teamId, Team.class).get();
        assertEquals("N", team.getTeamDone());
        assertEquals(updateBeginAt, team.getBeginAt());
        assertEquals(updateEndAt, team.getEndAt());
        assertEquals(updateFinishTime, team.getFinishTime());
        assertEquals(updateStartTime, team.getStartTime());
        assertEquals(updateTitle, team.getTeamName());
        assertEquals(updateContent, team.getTeamInfo());
        assertEquals(updateCategory, team.getCategory());
        assertEquals(updateDay, team.getDay());
        assertEquals(updateBoardNumber, team.getRecruitmentNumber());
        assertEquals(1, team.getTeamNumber());

        // 보드
        assertEquals(updateTitle, changeBoard.getTitle());
        assertEquals(updateContent, changeBoard.getContent());
    }

    @Test
    public void 게시글삭제() {
        // given
        String category = "S";
        String title = "React 공부 스터디";
        String content = "공부 스터디 english only";
        String day = "1010100";
        LocalDate beginAt = LocalDate.of(2023, 1, 16);
        LocalDate endAt = LocalDate.of(2023, 3, 16);
        LocalTime startTime = LocalTime.of(12, 0, 0);
        LocalTime finishTime = LocalTime.of(15, 0, 0);

        int boardNumber = 6;
        WriteBoardReq writeBoardReq = new WriteBoardReq(
                category,
                title,
                content,
                day,
                boardNumber,
                beginAt,
                endAt,
                startTime,
                finishTime
        );

        int boardId = boardService.writeBoard(memberId, writeBoardReq);
        Board board = boardRepository.findByBoardId(boardId, Board.class).get();

        // when
        boardService.deleteBoard(board.getBoardId());

        // then
        Assertions.assertEquals(0, boardRepository.count());
    }

    @Test
    public void 존재하지않는_게시글_삭제() {
        // given
        String category = "S";
        String title = "React 공부 스터디";
        String content = "공부 스터디 english only";
        String day = "1010100";
        LocalDate beginAt = LocalDate.of(2023, 1, 16);
        LocalDate endAt = LocalDate.of(2023, 3, 16);
        LocalTime startTime = LocalTime.of(12, 0, 0);
        LocalTime finishTime = LocalTime.of(15, 0, 0);

        int boardNumber = 6;
        WriteBoardReq writeBoardReq = new WriteBoardReq(
                category,
                title,
                content,
                day,
                boardNumber,
                beginAt,
                endAt,
                startTime,
                finishTime
        );

        int boardId = boardService.writeBoard(memberId, writeBoardReq);
        Board board = boardRepository.findByBoardId(boardId, Board.class).get();

        // expected
        Assertions.assertThrows(RuntimeException.class, () -> {
            boardService.deleteBoard(board.getBoardId() + 1);
        });
    }
}
