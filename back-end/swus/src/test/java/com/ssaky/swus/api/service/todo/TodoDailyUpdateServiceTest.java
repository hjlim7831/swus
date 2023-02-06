package com.ssaky.swus.api.service.todo;

import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.todo.TodoCreateReq;
import com.ssaky.swus.api.request.todo.TodoUpdateReq;
import com.ssaky.swus.api.response.todo.DailyTodoResp;
import com.ssaky.swus.api.response.todo.TodoGetResp;
import com.ssaky.swus.api.response.todo.TodoJandiResp;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.db.repository.todo.JandiTodoRepository;
import com.ssaky.swus.db.repository.todo.MemberTodoCount;
import com.ssaky.swus.db.repository.todo.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.util.ReflectionTestUtils;

import javax.transaction.Transactional;

import java.sql.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class TodoDailyUpdateServiceTest {

    @Autowired TodoRepository todoRepository;
    @Autowired TodoService todoService;
    @Autowired MemberService memberService;
    @Autowired JandiTodoRepository jandiTodoRepository;

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

        // 투두 내용
        String content1 = "알고리즘 한 문제 풀기";
        String content2 = "JPA 복습하기";
        String content3 = "테스트 코드 작성하기";
        TodoCreateReq todoCreateReq1 = new TodoCreateReq(content1);
        TodoCreateReq todoCreateReq2 = new TodoCreateReq(content2);
        TodoCreateReq todoCreateReq3 = new TodoCreateReq(content3);

        String content4 = "인강 1개 듣기";
        String content5 = "물마시기";
        TodoCreateReq todoCreateReq4 = new TodoCreateReq(content4);
        TodoCreateReq todoCreateReq5 = new TodoCreateReq(content5);

        // 투두 기록
        int num1 = todoService.save(todoCreateReq1, memberId);
        int num2 = todoService.save(todoCreateReq2, memberId);
        int num3 = todoService.save(todoCreateReq3, memberId);
        int num4 = todoService.save(todoCreateReq4, memberId2);
        int num5 = todoService.save(todoCreateReq5, memberId2);

        // 완료한 Todo들 update 처리
        TodoUpdateReq todoUpdateReq1 = TodoUpdateReq.builder()
                .content(content1).todoDone("Y").build();
        TodoUpdateReq todoUpdateReq2 = TodoUpdateReq.builder()
                .content(content2).todoDone("Y").build();
        TodoUpdateReq todoUpdateReq4 = TodoUpdateReq.builder()
                .content(content4).todoDone("Y").build();

        todoService.update(num1, todoUpdateReq1, memberId);
        todoService.update(num2, todoUpdateReq2, memberId);
        todoService.update(num4, todoUpdateReq4, memberId2);

    }

    @Test
    public void todoDone이_Y인_경우_모두_지우기(){
        todoRepository.deleteAllDoneInQuery();
        List<TodoGetResp> list1 = todoRepository.findList(memberId);
        List<TodoGetResp> list2 = todoRepository.findList(memberId2);
        assertEquals(1, list1.size());
        assertEquals(1, list2.size());

    }

    @Test
    public void 모든_사용자의_TODO_잔디기록하기(){
        // given
        List<MemberTodoCount> todoCountList = todoRepository.findTodoCountGroupByMember();
        // when
        ReflectionTestUtils.invokeMethod(todoService, "saveAllDailyTodoCount", todoCountList);

        // then
        TodoJandiResp resp1 = todoService.getJandiRecords(memberId);
        TodoJandiResp resp2 = todoService.getJandiRecords(memberId2);
        assertEquals(resp1.getTodoRecords().get(0).getTodoDoneCount(),2);
        assertEquals(resp2.getTodoRecords().get(0).getTodoDoneCount(),1);
        System.out.println(resp1);
        System.out.println(resp2);
    }

    @Test
    public void JpaRepository_테스트(){
        Date fromDate = Date.valueOf("2023-02-05");
        Date toDate = Date.valueOf("2023-02-05");

        System.out.println(jandiTodoRepository.findByIdMemberIdAndIdStudyAtBetween(memberId, fromDate, toDate, DailyTodoResp.class));

    }



}
