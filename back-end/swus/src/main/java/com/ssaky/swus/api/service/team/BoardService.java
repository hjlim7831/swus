package com.ssaky.swus.api.service.team;

import com.ssaky.swus.api.request.team.UpdateBoardReq;
import com.ssaky.swus.api.request.team.WriteBoardReq;
import com.ssaky.swus.api.response.group.BoardGetResp;
import com.ssaky.swus.api.response.group.BoardListResp;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.entity.team.Board;
import com.ssaky.swus.db.entity.team.MemberTeam;
import com.ssaky.swus.db.entity.team.Team;
import com.ssaky.swus.db.repository.member.MemberRepository;
import com.ssaky.swus.db.repository.team.BoardRepository;
import com.ssaky.swus.db.repository.team.MemberTeamRepository;
import com.ssaky.swus.db.repository.team.TeamRepository;
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
    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final MemberTeamRepository memberTeamRepository;

    /**
     * 모집게시글 작성
     * @param memberId
     * @param req
     * @return
     */
    @Transactional
    public int writeBoard(int memberId, WriteBoardReq req) {
        log.info("[Service writeBoard] : memberId = {}, WriteBoardReq = {}", memberId, req);
        Team team = new Team(req);
        team.addNumber();           // 인원수 증가

        // MemberTeam 연관 테이블에 팀장 추가
        MemberTeam memberTeam = MemberTeam.builder()
                .memberId(memberId)
                .teamId(team.getTeamId())
                .build();
        memberTeam.setLeader();
        memberTeamRepository.save(memberTeam);

        int teamId = teamRepository.save(team).getTeamId();

        Board board = Board.builder()
                .memberId(memberId)
                .teamId(teamId)
                .title(req.getTitle())
                .content(req.getContent())
                .number(req.getBoardNumber())
                .build();

        return boardRepository.save(board).getBoardId();
    }

    /**
     * 모집게시글 상세 조회
     * @param boardId
     * @return
     */
    @Transactional
    public BoardGetResp getDetailBoard(int boardId) {
        // board 게시글 조회
        Board board = boardRepository.findById(boardId)
                .orElseThrow(IllegalArgumentException::new);    // Id값에 해당하는 게시글이 없을때

        // 모집글 조회시 조회수 +1 증가
        board.updateView(board.getViews());

        // 작성자(member) 정보 조회
        Optional<Member> memberO = memberRepository.findById(board.getMember().getId());
        if (memberO.isEmpty())
            throw new InvalidValueException("작성자 id로 조회되는 사용자 없습니다");
        Member member = memberO.get();

        // team 정보 조회
        Optional<Team> teamO = teamRepository.findById(board.getTeam().getTeamId());
        if (teamO.isEmpty())
            throw new InvalidValueException("팀 id로 조회되는 팀이 없습니다");
        Team team = teamO.get();

        // 글작성자 + 게시글 + 팀 정보 전달
        return BoardGetResp.builder()
                .nickname(member.getNickname())
                .email(member.getEmail())
                .title(board.getTitle())
                .content(board.getContent())
                .views(board.getViews())
                .writeAt(board.getCreateAt())
                .boardNumber(board.getNumber())
                .category(team.getCategory())
                .beginAt(team.getBeginAt())
                .endAt(team.getEndAt())
                .day(team.getDay())
                .startTime(team.getStartTime())
                .finishTime(team.getFinishTime())
                .teamNumber(team.getNumber())
                .build();
    }

    /**
     * 모집게시판 전체 목록 조회
     * @return
     */
    @Transactional
    public List<BoardListResp> getBoardList() {
        List<Board> boards = boardRepository.findAll();
        List<BoardListResp> boardList = new ArrayList<>();

        for (Board board : boards) {
            // 게시글에 해당하는 team 정보(category) 조회
            Optional<Team> teamO = teamRepository.findById(board.getTeam().getTeamId());
            if (teamO.isEmpty())
                throw new InvalidValueException("팀 id로 조회되는 팀이 없습니다");
            Team team = teamO.get();

            // board의 최종인원과 team의 현재인원을 비교해서 모집여부를 "Y"/"N"으로 반환
            String recruitmentDone = "N";
            if (board.getNumber() == team.getNumber())
                recruitmentDone = "Y";

            BoardListResp resp = BoardListResp.builder()
                    .board_id(board.getBoardId())
                    .title(board.getTitle())
                    .category(team.getCategory())
                    .recruitmentDone(recruitmentDone)   // MemberTeam 엔티티되면 해줘야함
                    .writeAt(board.getCreateAt())
                    .views(board.getViews())
                    .build();

            boardList.add(resp);
        }
        return boardList;
    }

    /**
     * 모집게시글 수정
     * (모든 member)
     * @param boardId
     * @param updateBoardReq
     */
    @Transactional
    public void updateBoard(int boardId, UpdateBoardReq updateBoardReq) {
        Optional<Board> boardO = boardRepository.findById(boardId);

        // board 정보 업데이트
        if (boardO.isEmpty())
            throw new InvalidValueException("기존 게시글이 없습니다.");
        Board board = boardO.get();
        board.update(updateBoardReq);

        // team 정보 업데이트
        Optional<Team> teamO = teamRepository.findById(board.getTeam().getTeamId());
        if (teamO.isEmpty())
            throw new InvalidValueException("기존 팀이 없습니다.");
        teamO.get().update(updateBoardReq);
    }

    /**
     * 모집글 삭제
     * (모든 member, 삭제해도 team 존재)
     * @param boardId
     */
    @Transactional
    public void deleteBoard(int boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(RuntimeException::new);
        boardRepository.delete(board);
    }
}
