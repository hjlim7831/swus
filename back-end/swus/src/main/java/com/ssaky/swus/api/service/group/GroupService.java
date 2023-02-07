package com.ssaky.swus.api.service.group;

import com.ssaky.swus.api.request.group.GroupInviteReq;
import com.ssaky.swus.api.response.group.GroupMemberTodosResp;
import com.ssaky.swus.api.response.group.MyGroupDetailResp;
import com.ssaky.swus.api.response.group.MyGroupResp;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class GroupService {

    /**
     * 내 그룹 목록 가져오기
     * @param memberId
     * @return
     */
    // TODO [1] 내 그룹 목록 조회
    public List<MyGroupResp> getGroupList(int memberId) {
        // UserGroupRepository 에서 유저가 속한 그룹들의 groupId 가져오기

        // GroupRepository 에서 groupId로 정보 하나씩 값 가져오기

        // 합쳐서 결과 만들기

        return null;
    }

    // TODO [2] 그룹 상세 정보 조회
    public MyGroupDetailResp getGroupDetailInfo(int memberId, int groupId) {
        // Group 테이블과, GroupTodo 테이블에서 정보 가져오기

        // NOTE : 모집 인원을 그룹 테이블로 옮겨버리는게 맞는거 같은데? 게시글 삭제해버리면 어떡함

        return null;
    }

    // TODO [2] 그룹원들 투두 목록 조회
    public GroupMemberTodosResp getGroupMemberTodos(int groupId, int memberId) {
        // 그룹 아이디로 그룹원 투두들 가져오기

        return null;
    }

    // TODO [2] 그룹 정보 수정
    public void updateGroupInfo(int groupId, int memberId) {
        // 그룹 엔티티에 정보 수정

        // 그룹 투두 엔티티에 정보 수정

    }

    // TODO [3] 그룹원 초대
    public void inviteMember(int groupId, int memberId, GroupInviteReq req) {
        String email = req.getEmail();
        // 현재 사용자가 그룹장인지 체크하기
        
        // 아니면 에러 반환
        
        // UserGroup 에 한 줄 추가하기
        
    }
    
    // TODO [4] 그룹 탈퇴
    public void groupWithdrawal(int groupId, int memberId) {
        // 그룹장 여부 확인
        
        // 그룹장이라면, 다음으로 들어온 사람에게 그룹장 넘기기

        // UserGroup에서 빼기

    }


}
