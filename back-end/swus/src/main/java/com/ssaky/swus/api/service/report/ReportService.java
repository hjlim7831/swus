package com.ssaky.swus.api.service.report;

import com.ssaky.swus.api.request.member.MemberNicknameReq;
import com.ssaky.swus.api.response.report.MemberGetResp;
import com.ssaky.swus.api.response.report.RoundGetResp;
import com.ssaky.swus.api.response.report.TodoGroupMemberGetResp;
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

    private final TodoGroupMemberRepository todoGrMemRepo;
    private final TodoGroupRepository todoGrRepo;

    //그룹의 모든회차 레포트 불러오기
    public List<RoundGetResp> getReports(int teamId, List<MemberNicknameReq> reqs) {
        //1. 해당 그룹의 모든 유저id 불러오기 << 이건 파라미터로 해결

        //그룹의 모든 회차 불러오기
            //회차는 오름차순으로 불러오기
        List<RoundGetResp> rounds = todoGrRepo.findTodoGroups(teamId);
        for (RoundGetResp r : rounds) {
            log.debug(r.toString());
        }

        /* 회차의 studyAt이 null이 아닌 값만 member와 투두리스트를 불러와야함 */
        //null이 아닌 모든 그룹원의 todo리스트 불러오기
            //그룹원으로 반복문 돌려야함
            //그룹원으로 모든 투두리스트 불러왔으면 해당 회차에 add해주기
        //멤버의 해당 회차에 투두리스트가 없을수도 있음!

        //진행한 회차 수 구하기
        int notNullRound = 0; //회차수 저장할 변수
        for(int i=0, endi=rounds.size(); i<endi; i++){
            if(rounds.get(i).getStudyAt()==null) { //해당 회차에 진행 날짜가 null이라면
                notNullRound = i; //해당회차-1개만큼 진행한 것
                break;
            }
        }
        log.debug("진행한 회차수+1는 ["+notNullRound+"] 입니다.");

        //진행한 회차수까지만 멤버 투두리스트 읽어오기
        for (int i = 0, endi = notNullRound; i < endi; i++) {
            log.debug("이거 몇번 나옴? 2번나와야되는데");
            rounds.get(i).setMembers(new ArrayList<>());
            for (int j = 0, endj = reqs.size(); j < endj; j++) {
                List<TodoGroupMemberGetResp> todoGMList
                        =  todoGrMemRepo.findTodoGroupMemberList(reqs.get(j).getMemberId(),teamId,i+1);
                MemberGetResp member = new MemberGetResp(reqs.get(j).getNickname(), todoGMList);
                log.debug("멤버 투두 나와주세요~ "+member.toString());

                rounds.get(i).getMembers().add(member);
            }
        }





        return rounds;
    }

    public void setDone(int round, int teamId) {
//        todoGroupRepository.
    }
}
