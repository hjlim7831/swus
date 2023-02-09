package com.ssaky.swus.api.service.team;

import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.team.TeamInfoUpdateReq;
import com.ssaky.swus.api.request.team.TeamInviteReq;
import com.ssaky.swus.api.response.group.MyTeamDetailResp;
import com.ssaky.swus.api.response.group.MyTeamResp;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.common.error.exception.BusinessException;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.db.entity.team.Board;
import com.ssaky.swus.db.entity.team.MemberTeam;
import com.ssaky.swus.db.entity.team.Team;
import com.ssaky.swus.db.repository.member.MemberRepository;
import com.ssaky.swus.db.repository.team.BoardRepository1;
import com.ssaky.swus.db.repository.team.MemberTeamRepository;
import com.ssaky.swus.db.repository.team.TeamRepository1;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.util.ReflectionTestUtils;

import javax.transaction.Transactional;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.util.ReflectionTestUtils.invokeMethod;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class TeamService1Test {

    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;
    @Autowired TeamService1 teamService;
    @Autowired TeamRepository1 teamRepository;
    @Autowired MemberTeamRepository memberTeamRepository;
    @Autowired BoardRepository1 boardRepository;

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
        LocalDate beginAt = LocalDate.of(2023,1,10);
        LocalDate endAt = LocalDate.of(2023, 6, 20);
        LocalTime startTime = LocalTime.of(12, 30);
        LocalTime finishTime = LocalTime.of(16, 0);

        Team team = Team.builder().teamName("JPA 스터디")
                .category("S").teamInfo("JPA 뿌시기")
                .teamDone("N").number(2)
                .beginAt(beginAt)
                .endAt(endAt)
                .day("1111000")
                .startTime(startTime)
                .finishTime(finishTime)
                .build();
        // [1] 팀 테이블에 추가
        teamRepository.save(team);
        teamId = team.getTeamId();

        // [2] Board에 글 등록
        Board board = Board.builder()
                .title("JPA 뿌실분들 구합니다")
                .memberId(leaderId)
                .teamId(teamId)
                .number(6)
                .build();
        boardRepository.save(board);

        // [3] 팀, 사용자 연관 테이블에 추가
        MemberTeam memberTeam = MemberTeam.builder()
                .memberId(leaderId)
                .teamId(teamId)
                .build();
        memberTeam.setLeader();
        memberTeamRepository.save(memberTeam);

        MemberTeam memberTeam2 = MemberTeam.builder()
                .memberId(memberId2)
                .teamId(teamId)
                .build();
        memberTeamRepository.save(memberTeam2);

    }

//    @AfterEach
//    void afterEach() {
//        memberTeamRepository.deleteAll();
//        teamRepository.deleteAll();
//        memberRepository.deleteAll();
//
//    }

    @Test
    public void 리더여부_확인() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Throwable e1 = assertThrows(InvalidValueException.class, () -> {
            teamService.isLeader(teamId, memberId3);
        });
        assertEquals("유효한 정보가 없습니다.", e1.getMessage());

        Throwable e2 = assertThrows(BusinessException.class, () -> {
           teamService.isLeader(teamId, memberId2);
        });
        assertEquals("그룹장이 아닙니다.", e2.getMessage());
    }

    @Test
    public void 팀원_초대() {

        // 이메일이 유효하지 않을 때
        TeamInviteReq req1 = TeamInviteReq.builder().email("asdf").build();
        Throwable e1 = assertThrows(InvalidValueException.class,()->{
            teamService.inviteMember(teamId, leaderId, req1);
                });
        assertEquals("없는 사용자 입니다.", e1.getMessage());


        // 이미 속한 그룹일 때
        TeamInviteReq req3 = TeamInviteReq.builder().email(email2).build();
        Throwable e3 = assertThrows(BusinessException.class, ()-> {
            teamService.inviteMember(teamId, leaderId, req3);
        });
        assertEquals("이미 속한 그룹입니다.", e3.getMessage());

        // 추가 가능할 때
        TeamInviteReq req2 = TeamInviteReq.builder().email(email3).build();

        teamService.inviteMember(teamId, leaderId, req2);
        List<MemberTeam> list = memberTeamRepository.findAll();

        Optional<Team> team = teamRepository.findByTeamId(teamId, Team.class);

        // team.number 증가 확인
        assertEquals(3, list.size());
        assertEquals(3, team.get().getNumber());
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

    @Test
    public void 팀_상세_정보조회() {
        MyTeamDetailResp teamDetailInfo = teamService.getTeamDetailInfo(teamId, memberId2);
        System.out.println(teamDetailInfo);

    }

    @Test
    public void 팀_정보_수정() {
        LocalDate beginAt = LocalDate.of(2025,1,10);
        LocalDate endAt = LocalDate.of(2025, 6, 20);
        LocalTime startTime = LocalTime.of(19, 30);
        LocalTime finishTime = LocalTime.of(21, 0);

        String teamName = "JAVA 스터디";
        TeamInfoUpdateReq req = TeamInfoUpdateReq.builder()
                .teamName(teamName)
                .teamInfo("JAVA 뿌시기")
                .day("1110000")
                .beginAt(beginAt)
                .endAt(endAt)
                .startTime(startTime)
                .finishTime(finishTime)
                .build();
        teamService.updateTeamInfo(teamId, leaderId, req);

        MyTeamDetailResp teamDetailInfo = teamService.getTeamDetailInfo(teamId, memberId2);
        System.out.println(teamDetailInfo);

    }

    @Test
    public void 팀_종료_전환() {
        // 그룹원이 아닐 때
        Throwable e1 = assertThrows(InvalidValueException.class,()->{
            teamService.updateDone(teamId, memberId3);
        });
        assertEquals("유효하지 않은 접근입니다. 토큰 혹은 teamId를 확인해주세요.", e1.getMessage());

        // 그룹장이 아닐 때
        Throwable e2 = assertThrows(BusinessException.class, ()-> {
            teamService.updateDone(teamId, memberId2);
        });
        assertEquals("유효하지 않은 접근입니다. (그룹장 권한 없음)", e2.getMessage());

        // 그룹장일 때
        teamService.updateDone(teamId, leaderId);
        Optional<Team> teamO = teamRepository.findByTeamId(teamId, Team.class);
        assertEquals("Y", teamO.get().getTeamDone());

    }

    @Test
    public void CreateAt으로_정렬() {
        List<MemberTeam> memberTeams = teamService.orderByCreateAtAsc(teamId);
        assert(memberTeams.get(0).getCreateAt().isBefore(memberTeams.get(1).getCreateAt()));
        System.out.println(memberTeams.get(0).getCreateAt());
        System.out.println(memberTeams.get(1).getCreateAt());

    }

    @Test
    public void 팀_탈퇴_팀장일때() {
        // 팀 탈퇴시키기
        teamService.teamWithdrawal(teamId, leaderId);
        
        // 남은 팀원이 리더가 됐는지 확인
        List<MemberTeam> memberTeams = memberTeamRepository.findByIdTeamId(teamId, MemberTeam.class);
        
        assertEquals("Y", memberTeams.get(0).getIsLeader());
        Optional<Team> teamO = teamRepository.findByTeamId(teamId, Team.class);
        assertEquals(1, teamO.get().getNumber());


    }

    @Test
    public void 팀_탈퇴_팀장_아닐때() {
        teamService.teamWithdrawal(teamId, memberId2);
        
        // 여전히 리더인가
        List<MemberTeam> memberTeams = memberTeamRepository.findByIdTeamId(teamId, MemberTeam.class);
        assertEquals("Y", memberTeams.get(0).getIsLeader());

        Optional<Team> teamO = teamRepository.findByTeamId(teamId, Team.class);
        assertEquals(1, teamO.get().getNumber());

    }

}