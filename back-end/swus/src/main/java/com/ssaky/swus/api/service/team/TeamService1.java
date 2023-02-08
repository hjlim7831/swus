package com.ssaky.swus.api.service.team;

import com.ssaky.swus.api.request.team.TeamInfoUpdateReq;
import com.ssaky.swus.api.request.team.TeamInviteReq;
import com.ssaky.swus.api.response.group.MyTeamDetailResp;
import com.ssaky.swus.api.response.group.MyTeamResp;
import com.ssaky.swus.api.response.group.TeamNameResp;
import com.ssaky.swus.common.error.exception.BusinessException;
import com.ssaky.swus.common.error.exception.ErrorCode;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.entity.team.MemberTeam;
import com.ssaky.swus.db.entity.team.Team;
import com.ssaky.swus.db.repository.member.MemberRepository;
import com.ssaky.swus.db.repository.team.MemberTeamRepository;
import com.ssaky.swus.db.repository.team.TeamRepository1;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class TeamService1 {

    private final MemberTeamRepository memberTeamRepository;
    private final TeamRepository1 teamRepository;
    private final MemberRepository memberRepository;

    /**
     * 내 그룹 목록 가져오기
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

    // TODO [2] 팀 상세 정보 조회 (투두 조회 제외)
    public MyTeamDetailResp getTeamDetailInfo(int memberId, int teamId) {
        // Team 테이블
        Optional<Team> teamO = teamRepository.findByTeamId(teamId, Team.class);

        // MemberTeam 테이블에서 팀원 정보들 가져오기
        List<MemberTeam> memberTeams = memberTeamRepository.findByIdTeamId(teamId, MemberTeam.class);


        return null;
    }

    /**
     * 팀 정보 수정
     * @param teamId
     * @param memberId
     * @param req
     */
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
     * 그룹 종료 전환
     * @param teamId
     * @param memberId
     */
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
            Optional<MemberTeam> nextMemberTeamO = memberTeamRepository.findByIdTeamIdAndFirstByOrderByCreateAtAsc(teamId, MemberTeam.class);
            if (nextMemberTeamO.isPresent()) {
                nextMemberTeamO.get().setLeader();
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

    private void isLeader(int teamId, int memberId) {
        Optional<MemberTeam> myMemberTeamO = memberTeamRepository.findByIdMemberIdAndIdTeamId(memberId, teamId, MemberTeam.class);

        if (myMemberTeamO.isEmpty()) {
            throw new InvalidValueException("유효한 정보가 없습니다.");
        }
        if (myMemberTeamO.get().getIsLeader().equals("N")) {
            throw new BusinessException("그룹장이 아닙니다.", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        }
    }
}
