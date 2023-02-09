package com.ssaky.swus.api.service.report;

import com.ssaky.swus.api.request.member.MemberNicknameReq;
import com.ssaky.swus.api.response.report.MemberGetResp;
import com.ssaky.swus.api.response.report.RoundGetResp;
import com.ssaky.swus.api.response.report.TodoGroupMemberGetResp;
import com.ssaky.swus.db.repository.report.TodoGroupMemberRepository;
import com.ssaky.swus.db.repository.report.TodoGroupRepository;
import com.ssaky.swus.db.entity.report.TodoGroup;
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
        //파라미터로 해당 그룹의 모든 유저id 받기

        //그룹의 모든 회차를 오름차순으로 불러오기
        List<RoundGetResp> rounds = todoGrRepo.findTodoGroups(teamId);
        for (RoundGetResp r : rounds) {
            log.debug(r.toString());
        }

        //진행한 회차 수 구하기
        int notNullRound = 0; //회차수 저장할 변수
        for(int i=0, endi=rounds.size(); i<endi; i++){
            if(rounds.get(i).getStudyAt()==null) { //해당 회차에 진행 날짜가 null이라면
                notNullRound = i; //해당회차-1개만큼 진행한 것
                break;
            }
        }
        log.debug("진행한 회차수는 ["+(notNullRound-1)+"회] 입니다.");

        //진행한 회차수까지만 멤버 투두리스트 읽어오기
        for (int i = 0, endi = notNullRound; i < endi; i++) { //회차수 만큼 반복
            rounds.get(i).setMembers(new ArrayList<>());
            for (int j = 0, endj = reqs.size(); j < endj; j++) { //멤버수 만큼 반복
                //해당 멤버의 투두리스트 배열 저장
                List<TodoGroupMemberGetResp> todoGMList
                        =  todoGrMemRepo.findTodoGroupMemberList(reqs.get(j).getMemberId(),teamId,i+1);
                //rounds에 저장할 형태로 객체 생성
                MemberGetResp member = new MemberGetResp(reqs.get(j).getNickname(), todoGMList);
                log.debug((i+1)+"   회차에 멤버 투두리스트 : "+member.toString());
                //rounds에 저장
                rounds.get(i).getMembers().add(member);
            }
        }

        return rounds;
    }

    //변경감지를 이용해서 날짜 등록하여 완료로 처리
    @Transactional
    public void setDone(int teamId, int round) {
        TodoGroup todoGroup = todoGrRepo.findOne(teamId, round);
        todoGroup.done();
        log.debug(todoGroup.getId().getRound()+"회차("+todoGroup.getContent()+")를 "+todoGroup.getStudyAt()+"로 완료 처리했습니다.");
    }
}
