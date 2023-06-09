package com.ssaky.swus.api.service.team;

import com.ssaky.swus.api.request.team.TeamInfoUpdateReq;
import com.ssaky.swus.api.request.team.TeamInviteReq;
import com.ssaky.swus.api.request.team.TeamTodoListUpdateReq;
import com.ssaky.swus.api.request.team.TeamTodoUpdateReq;
import com.ssaky.swus.api.response.group.*;
import com.ssaky.swus.common.error.exception.BusinessException;
import com.ssaky.swus.common.error.exception.ErrorCode;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.entity.report.TodoGroup;
import com.ssaky.swus.db.entity.team.Board;
import com.ssaky.swus.db.entity.team.MemberTeam;
import com.ssaky.swus.db.entity.team.Team;
import com.ssaky.swus.db.repository.member.MemberRepository;
import com.ssaky.swus.db.repository.report.TodoGroupRepositoryI;
import com.ssaky.swus.db.repository.team.BoardRepository1;
import com.ssaky.swus.db.repository.team.MemberTeamRepository;
import com.ssaky.swus.db.repository.team.TeamRepository1;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class TeamService1 {

    private final MemberTeamRepository memberTeamRepository;
    private final TeamRepository1 teamRepository;
    private final MemberRepository memberRepository;
    private final TodoGroupRepositoryI todoGroupRepository;

    /**
     * 내 팀 목록 가져오기
     * @param memberId
     * @return
     */
    public List<MyTeamResp> getTeamList(int memberId) {
        // MemberTeamRepository 에서 유저가 속한 그룹들의 teamId 가져오기
        List<MemberTeam> memberTeams = memberTeamRepository.findByIdMemberId(memberId, MemberTeam.class);
        List<MyTeamResp> respList = new ArrayList<>();

        // teamId로 팀 정보들 하나씩 가져오기
        for(MemberTeam mt: memberTeams) {
            int teamId = mt.getId().getTeamId();
            Optional<MyTeamResp> respO = teamRepository.findByTeamId(teamId, MyTeamResp.class);
            if (respO.isPresent()) {
                respList.add(respO.get());
            } else {
                throw new InvalidValueException("적절하지 못한 teamId 입니다.");
            }
        }

        return respList;
    }

    public MyTeamDetailResp getTeamDetailInfo(int teamId, int memberId) {
        // [1] Team 에 속한 멤버인지 확인
        Optional<MemberTeam> memberTeam = memberTeamRepository.findByIdMemberIdAndIdTeamId(memberId, teamId, MemberTeam.class);
        if (memberTeam.isEmpty()) {
            throw new InvalidValueException("접근할 수 없는 정보입니다. 해당 팀의 구성원이 아닙니다.");
        }

        // [2] Team 테이블에서 팀 정보 가져오기
        MyTeamDetailResp resp = new MyTeamDetailResp();
        Optional<Team> teamO = teamRepository.findByTeamId(teamId, Team.class);

        if (teamO.isEmpty()) {
            throw new InvalidValueException("존재하지 않는 그룹입니다.");
        }
        resp.setTeamInfo(teamO.get());

        // [3] MemberTeam 테이블에서 팀원 정보들 가져오기
        List<String> memberList = new ArrayList<>();

        List<MemberTeam> memberTeams = memberTeamRepository.findByIdTeamId(teamId, MemberTeam.class);
        for(MemberTeam m: memberTeams) {
            // 리더일 때
            Optional<Member> member = memberRepository.findById(m.getId().getMemberId(), Member.class);
            if (m.getIsLeader().equals("Y")) {
                resp.setLeaderInfo(member.get().getNickname(), member.get().getEmail());
            }
            // 팀원일 때
            else {
                memberList.add(member.get().getNickname());
            }
        }
        resp.setMemberList(memberList);
        
        // [4] 그룹 투두 목록 가져오기
        List<GroupTodoResp> todolist = todoGroupRepository.findByIdTeamId(teamId, GroupTodoResp.class);
        resp.setTodoList(todolist);

        return resp;
    }

    /**
     * 팀 정보 수정
     * @param teamId
     * @param memberId
     * @param req
     */
    @Transactional
    public void updateTeamInfo(int teamId, int memberId, TeamInfoUpdateReq req) {
        // [1] 팀장인지 확인
        isLeader(teamId, memberId);
        
        // [2] 팀 정보 가져오기
        Optional<Team> teamO = teamRepository.findByTeamId(teamId, Team.class);
        if (teamO.isEmpty()) {
            throw new InvalidValueException("잘못된 접근입니다. teamId를 확인해주세요.");
        }
        // [3] 팀 정보 수정하기
        teamO.get().updateInfo(req);


    }

    /**
     * 팀 종료 전환
     * @param teamId
     * @param memberId
     */
    @Transactional
    public void updateDone(int teamId, int memberId) {
        // [1] memberId로 그룹장인지 확인
        Optional<MemberTeam> memberTeamO = memberTeamRepository.findByIdMemberIdAndIdTeamId(memberId, teamId, MemberTeam.class);

        if (memberTeamO.isEmpty()) {
            throw new InvalidValueException("유효하지 않은 접근입니다. 토큰 혹은 teamId를 확인해주세요.");
        }

        if (memberTeamO.get().getIsLeader().equals("N")) {
            throw new BusinessException("유효하지 않은 접근입니다. (그룹장 권한 없음)", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        }

        // teamId로 그룹 종료 전환
        Optional<Team> teamO = teamRepository.findByTeamId(teamId, Team.class);
        teamO.get().isDone();
    }

    /**
     * 이메일로 팀원 초대하기
     * @param teamId
     * @param memberId
     * @param req
     */
    @Transactional
    public void inviteMember(int teamId, int memberId, TeamInviteReq req) {
        String email = req.getEmail();
        Optional<Member> teamMemberO = memberRepository.findByEmail(email);
        // [1] 유효하지 않은 이메일일 경우
        if (teamMemberO.isEmpty()) {
            throw new InvalidValueException("없는 사용자 입니다.");
        }
        int teamMemberId = teamMemberO.get().getId();

        // [2] 현재 사용자가 그룹장인지 체크하기
        isLeader(teamId, memberId);
        
        // [3] 이미 속한 그룹인지 확인하기
        Optional<MemberTeam> yourMemberTeamO = memberTeamRepository.findByIdMemberIdAndIdTeamId(teamMemberId, teamId, MemberTeam.class);
        if (yourMemberTeamO.isPresent()) {
            throw new BusinessException("이미 속한 그룹입니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        }

        // [4] MemberTeam 에 한 줄 추가하기
        MemberTeam memberTeam = MemberTeam.builder()
                .memberId(teamMemberId)
                .teamId(teamId)
                .build();
        memberTeamRepository.save(memberTeam);

        // [5] 팀 number 1 더하기
        Optional<Team> team = teamRepository.findByTeamId(teamId, Team.class);
        team.get().addNumber();
    }

    /**
     * 팀 탈퇴 기능
     * @param teamId
     * @param memberId
     */
    @Transactional
    public void teamWithdrawal(int teamId, int memberId) {
        Optional<Team> team = teamRepository.findByTeamId(teamId, Team.class);

        Optional<MemberTeam> myMemberTeamO = memberTeamRepository.findByIdMemberIdAndIdTeamId(memberId, teamId, MemberTeam.class);
        if (myMemberTeamO.isEmpty()) {
            throw new InvalidValueException("유효한 정보가 없습니다.");
        }
        // [1] 그룹장 여부 확인
        // 그룹장이라면
        if (myMemberTeamO.get().getIsLeader().equals("Y")) {

            // 다음으로 들어온 사람에게 그룹장 넘기기
            List<MemberTeam> restMemberTeams = orderByCreateAtAsc(teamId);
            if (restMemberTeams.size() >= 2) {
                restMemberTeams.get(1).setLeader();
            }
        }

        // [2] 나를 MemberTeam 에서 빼기
        memberTeamRepository.delete(myMemberTeamO.get());

        // [3] 팀 number 1 빼기
        team.get().subtractNumber();

    }

    /**
     * 팀 이름 가져오기
     * @param teamId
     * @return
     */
    public TeamNameResp getTeamName(int teamId) {
        // 팀명 조회하기
        Optional<TeamNameResp> respO = teamRepository.findByTeamId(teamId, TeamNameResp.class);
        if (respO.isEmpty()) {
            throw new InvalidValueException("존재하지 않는 그룹입니다.");
        }
        return respO.get();
    }

    public void isLeader(int teamId, int memberId) {
        Optional<MemberTeam> myMemberTeamO = memberTeamRepository.findByIdMemberIdAndIdTeamId(memberId, teamId, MemberTeam.class);

        if (myMemberTeamO.isEmpty()) {
            throw new InvalidValueException("유효한 정보가 없습니다.");
        }
        if (myMemberTeamO.get().getIsLeader().equals("N")) {
            throw new BusinessException("그룹장이 아닙니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        }
    }

    public List<MemberTeam> orderByCreateAtAsc(int teamId) {
        List<MemberTeam> restMemberTeams = memberTeamRepository.findByIdTeamId(teamId, MemberTeam.class);

        Collections.sort(restMemberTeams, (rm1, rm2) -> {
                    // rm1이 rm2 이후이면 rm2가 앞으로 가야 함
                    if (rm1.getCreateAt().isAfter(rm2.getCreateAt())) {
                        return 1;
                    }else {
                        return -1;
                    }
                }
        );
        return restMemberTeams;
    }

    @Transactional
    public void updateTeamTodos(int teamId, int memberId, TeamTodoListUpdateReq req) {
        log.debug("teamId:{}, memberId:{}",teamId, memberId);
        // [1] 수정하는 사람이 리더인지 확인
        isLeader(teamId, memberId);
        
        // [2] 수정 시작
        for(TeamTodoUpdateReq tt: req.getTeamTodoList()) {
            int round = tt.getRound();
            Optional<TodoGroup> todoGroupO = todoGroupRepository.findByIdRoundAndIdTeamId(round, teamId, TodoGroup.class);
            // [2]-1 이미 DB에 저장되어 있는 경우, UPDATE
            if (todoGroupO.isPresent()) {
                todoGroupO.get().updateContent(tt, round, teamId);
            }
            // [2]-2 DB에 없는 경우 INSERT
            else {
                TodoGroup todoGroup = TodoGroup.builder()
                        .teamId(teamId).round(round).content(tt.getContent()).build();
                System.out.println(todoGroup);

                // 이쪽 오류 발생
                todoGroupRepository.save(todoGroup);
            }
        }
    }
}
