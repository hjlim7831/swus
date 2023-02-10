package com.ssaky.swus.api.service.member;

import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.member.MemberUpdateReq;
import com.ssaky.swus.api.request.todo.TodoCreateReq;
import com.ssaky.swus.api.request.todo.TodoUpdateReq;
import com.ssaky.swus.api.response.member.MemberInfoGetResp;
import com.ssaky.swus.api.response.todo.TodoGetResp;
import com.ssaky.swus.api.response.todo.TodoJandiResp;
import com.ssaky.swus.api.service.study.StudyService;
import com.ssaky.swus.api.service.todo.TodoService;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.repository.member.MemberRepository;
import com.ssaky.swus.db.repository.study.StudyRepository;
import com.ssaky.swus.db.repository.todo.JandiTodoRepository;
import com.ssaky.swus.db.repository.todo.TodoRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.util.ReflectionTestUtils;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;


// SpringExtension을 사용하게 되면 Spring TestContext Framework와 Junit5와 통합하여 사용하게 됨
@ExtendWith(SpringExtension.class)
@SpringBootTest
class MemberServiceTest {

    @Autowired MemberRepository memberRepository;
    @Autowired TodoRepository todoRepository;
    @Autowired StudyRepository studyRepository;

    @Autowired MemberService memberService;
    @Autowired TodoService todoService;
    @Autowired StudyService studyService;

    static int memberId;
    static int memberId2;

    @BeforeEach
    void beforeEach() {
        String email = "helenalim1205@gmail.com";
        String password = "ssafy";

        SignUpReq signUpReq = SignUpReq.builder().email(email).password(password)
                .nickname("상상").questionId(2).answer("보광초").build();

        memberId = memberService.join(signUpReq);

        String email2 = "ssafy@gmail.com";
        String password2 = "ssafy";
        SignUpReq signUpReq2 = SignUpReq.builder().email(email2).password(password2)
                .nickname("싸피").questionId(2).answer("싸피초").build();

        memberId2 = memberService.join(signUpReq2);
    }

    @AfterEach
    void afterEach() {
        memberRepository.deleteAll();
    }

    @Test
    public void 회원정보_조회() {
        MemberInfoGetResp resp = memberService.findOneInfo(memberId);
        System.out.println(resp);
        assertEquals("helenalim1205@gmail.com", resp.getEmail());
        assertEquals("상상", resp.getNickname());
    }

    @Test
    public void 회원정보_수정_기존_비밀번호_다름() {
        String nickname = "상상12";
        String newPassword = "ssafy123";
        MemberUpdateReq req = MemberUpdateReq.builder()
                .oldPassword("ssafy_wrong")
                .newPassword(newPassword)
                .nickname(nickname).build();
        assertThrows(InvalidValueException.class, () -> {
            memberService.updateInfo(memberId, req);
        });
    }

    @Test
    public void 회원정보_수정_기존_비밀번호_같음() {
        String nickname = "상상12";
        String newPassword = "ssafy123";
        MemberUpdateReq req = MemberUpdateReq.builder()
                .oldPassword("ssafy")
                .newPassword(newPassword)
                .nickname(nickname).build();

        memberService.updateInfo(memberId, req);

        Member one = memberService.findOne(memberId);
        assertEquals(one.getNickname(), nickname);
        assertEquals(one.getPassword(), newPassword);
    }

    @Test
    public void 회원_탈퇴_작동확인() {
        memberService.delete(memberId);
        assertEquals(1, memberRepository.count());
    }

    @Test
    public void 회원_탈퇴후_투두_테이블_확인(){
        // 투두 생성해두기
        TodoCreateReq req = TodoCreateReq.builder().content("JPA 공부하기").build();
        todoService.save(req, memberId);
        
        // 탈퇴 전 테이블 확인
        List<TodoGetResp> listBefore = todoService.getList(memberId);
        assertEquals(1, listBefore.size());
        
        // 탈퇴
        memberService.delete(memberId);
        
        // 탈퇴 후 테이블 확인
        List<TodoGetResp> listAfter = todoService.getList(memberId);
        assertEquals(0, listAfter.size());
    }

    @Test
    public void 회원_탈퇴후_잔디_테이블_확인(){
        // 투두 생성해두기
        String content = "JPA 공부하기";
        TodoCreateReq req = TodoCreateReq.builder().content(content).build();
        int num = todoService.save(req, memberId);
        
        // 투두 Y로 업데이트
        TodoUpdateReq updateReq = TodoUpdateReq.builder().content(content).todoDone("Y").build();
        todoService.update(num, updateReq, memberId);

        // 잔디 생성해두기
        ReflectionTestUtils.invokeMethod(todoService, "dailyUpdate");

        TodoJandiResp jandiRecordsBefore = todoService.getJandiRecords(memberId);
        assertEquals(1, jandiRecordsBefore.getTodoRecords().size());
        
        // 회원 탈퇴하기
        memberService.delete(memberId);

        // 탈퇴 후 jandi 테이블 확인하기
        TodoJandiResp jandiRecordsAfter = todoService.getJandiRecords(memberId);
        assertEquals(0, jandiRecordsAfter.getTodoRecords().size());

    }

    @Test
    public void 회원_탈퇴후_공부_테이블_확인() {
        // 탈퇴 전 테이블 확인
        assertEquals(1, studyRepository.countByMemberId(memberId));
        
        // 회원 탈퇴
        memberService.delete(memberId);
        
        // 탈퇴 후 테이블 확인
        assertEquals(0, studyRepository.countByMemberId(memberId));
    }

    @Test
    public void 회원_탈퇴후_공공열람실_참여자_테이블_확인() {
        // TODO: 테스트 코드 작성하기 (물어보기)

    }
}