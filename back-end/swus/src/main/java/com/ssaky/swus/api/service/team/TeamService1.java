package com.ssaky.swus.api.service.team;

import com.ssaky.swus.api.request.team.TeamInviteReq;
import com.ssaky.swus.api.response.group.MyTeamDetailResp;
import com.ssaky.swus.api.response.group.MyTeamResp;
import com.ssaky.swus.api.response.group.TeamNameResp;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.db.entity.team.MemberTeam;
import com.ssaky.swus.db.repository.team.MemberTeamRepository;
import com.ssaky.swus.db.repository.team.TeamRepository1;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class TeamService1 {

    MemberTeamRepository memberTeamRepository;
    TeamRepository1 memberRepository;

    /**
     * 내 그룹 목록 가져오기
     * @param memberId
     * @return
     */
    // TODO [1] 내 팀 목록 조회
    public List<MyTeamResp> getTeamList(int memberId) {
        // MemberTeamRepository 에서 유저가 속한 그룹들의 teamId 가져오기
        List<MemberTeam> memberTeams = memberTeamRepository.findByIdMemberId(memberId, MemberTeam.class);
        List<MyTeamResp> respList = new ArrayList<>();

        // teamId로 팀 정보들 하나씩 가져오기
        for(MemberTeam mt: memberTeams) {
            int teamId = mt.getId().getTeamId();
            Optional<MyTeamResp> respO = memberRepository.findByTeamId(teamId, MyTeamResp.class);
            if (respO.isPresent()) {
                respList.add(respO.get());
            } else {
                throw new InvalidValueException("적절하지 못한 teamId 입니다.");
            }
        }
        
        // 합쳐서 결과 만들기

        return respList;
    }

    // TODO [2] 팀 상세 정보 조회
    public MyTeamDetailResp getGroupDetailInfo(int memberId, int teamId) {
        // Group 테이블과, GroupTodo 테이블에서 정보 가져오기

        // NOTE : 모집 인원을 그룹 테이블로 옮겨버리는게 맞는거 같은데? 게시글 삭제해버리면 어떡함

        return null;
    }
    
    // TODO [2] 팀 정보 수정
    public void updateTeamInfo(int teamId, int memberId) {
        // 그룹 엔티티에 정보 수정

        // 그룹 투두 엔티티에 정보 수정

    }
    
    // TODO [3] 그룹 종료 전환
    public void updateDone(int teamId, int memberId) {
        // memberId로 그룹장인지 확인
        
        // teamId로 그룹 종료 전환

    }

    // TODO [3] 팀원 초대
    public void inviteMember(int teamId, int memberId, TeamInviteReq req) {
        String email = req.getEmail();
        // 현재 사용자가 그룹장인지 체크하기
        
        // 아니면 에러 반환
        
        // UserGroup 에 한 줄 추가하기
        
    }
    
    // TODO [4] 그룹 탈퇴
    public void teamWithdrawal(int teamId, int memberId) {
        // 그룹장 여부 확인
        
        // 그룹장이라면, 다음으로 들어온 사람에게 그룹장 넘기기

        // UserGroup에서 빼기

    }
    
    // TODO [4] 그룹명 조회
    public TeamNameResp getTeamName(int teamId) {
        // 팀명 조회하기

        return null;
    }


}
