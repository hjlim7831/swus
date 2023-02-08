package com.ssaky.swus.api.service.team;

import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.team.TeamInviteReq;
import com.ssaky.swus.api.response.group.MyTeamResp;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.db.entity.team.MemberTeam;
import com.ssaky.swus.db.entity.team.Team;
import com.ssaky.swus.db.repository.member.MemberRepository;
import com.ssaky.swus.db.repository.team.MemberTeamRepository;
import com.ssaky.swus.db.repository.team.TeamRepository1;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.transaction.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class TeamService1Test {

    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;
    @Autowired TeamService1 teamService;
    @Autowired TeamRepository1 teamRepository;
    @Autowired MemberTeamRepository memberTeamRepository;

    static int leaderId;
    static int memberId2;
    static int memberId3;
    static int teamId;

    static String email;
    static String email2;
    static String email3;

    @BeforeEach
    void beforeEach() {
        
        // DB 초기화
        memberTeamRepository.deleteAll();
        teamRepository.deleteAll();
        memberRepository.deleteAll();
        
        // 회원가입
        email = "helenalim1205@gmail.com";
        String password = "ssafy";

        SignUpReq signUpReq = SignUpReq.builder().email(email).password(password)
                .nickname("상상").questionId(2).answer("보광초").build();

        leaderId = memberService.join(signUpReq);

        email2 = "ssafy@gmail.com";
        String password2 = "ssafy";
        SignUpReq signUpReq2 = SignUpReq.builder().email(email2).password(password2)
                .nickname("싸피").questionId(2).answer("싸피초").build();

        memberId2 = memberService.join(signUpReq2);

        email3 = "samsung@gmail.com";
        String password3 = "samsung";
        SignUpReq signUpReq3 = SignUpReq.builder().email(email3).password(password3)
                .nickname("삼성").questionId(2).answer("삼성초").build();

        memberId3 = memberService.join(signUpReq3);
        // 팀생성
        Team team = Team.builder().teamName("JPA 스터디")
                .category("S").teamInfo("JPA 뿌시기")
                .teamDone("N")
                .build();
        // [1] 팀 테이블에 추가
        teamRepository.save(team);
        teamId = team.getTeamId();

        // [2] 팀, 사용자 연관 테이블에 추가
        MemberTeam memberTeam = MemberTeam.builder()
                .memberId(leaderId)
                .teamId(teamId)
                .build();
        memberTeam.setLeader();
        memberTeamRepository.save(memberTeam);

    }

//    @AfterEach
//    void afterEach() {
//        memberTeamRepository.deleteAll();
//        teamRepository.deleteAll();
//        memberRepository.deleteAll();
//
//    }

    @Test
    public void 팀원_초대() {
        TeamInviteReq req = TeamInviteReq.builder().email(email2).build();
        teamService.inviteMember(teamId, leaderId, req);
        List<MemberTeam> list = memberTeamRepository.findAll();
        assertEquals(2, list.size());
    }

    @Test
    public void 내팀_목록_조회() {
        List<MyTeamResp> teamList = teamService.getTeamList(leaderId);
        assertEquals(1, teamList.size());
        assertEquals("JPA 스터디", teamList.get(0).getTeamName());
    }

    @Test
    public void 그룹명_조회() {
        assertEquals("JPA 스터디", teamService.getTeamName(teamId).getTeamName());
    }
}