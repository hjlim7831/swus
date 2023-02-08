package com.ssaky.swus.api.service.report;

import com.ssaky.swus.api.response.report.RoundGetResp;
import com.ssaky.swus.api.response.report.TodoGroupGetResp;
import com.ssaky.swus.db.entity.report.TodoGroup;
import com.ssaky.swus.db.repository.report.TodoGroupMemberRepository;
import com.ssaky.swus.db.repository.report.TodoGroupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class ReportService {

    private final TodoGroupMemberRepository todoGroupMemberRepository;
    private final TodoGroupRepository todoGroupRepository;

    //그룹의 모든회차 레포트 불러오기
    public List<RoundGetResp> getReports(int teamId) {
        //해당 그룹의 모든 유저id 불러오기
            //group 도메인 안돼서 일단 더미데이터로 테스트할것임
        List<Integer> memberIds = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            memberIds.add(i);
        }

        //그룹의 모든 회차 불러오기
            //회차는 오름차순으로 불러오기
        List<TodoGroupGetResp> rounds = todoGroupRepository.findTodoGroups(teamId);

        /* 회차의 studyAt이 null이 아닌 값만 member와 투두리스트를 불러와야함 */
        //null이 아닌 모든 그룹원의 todo리스트 불러오기
            //그룹원으로 반복문 돌려야함
            //그룹원으로 모든 투두리스트 불러왔으면 해당 회차에 add해주기
        //멤버의 해당 회차에 투두리스트가 없을수도 있음!
//        int notNullRound = 3;
//        for (int i = 0, endi = notNullRound; i < endi; i++) {
//            for (int j = 0, endj = memberIds.size(); j < endj; j++) {
//
//            }
//        }





        return null;
    }

    public void setDone(int round, int teamId) {
//        todoGroupRepository.
    }
}
