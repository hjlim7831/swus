package com.ssaky.swus.api.service.todo;

import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.todo.TodoCreateReq;
import com.ssaky.swus.api.request.todo.TodoUpdateReq;
import com.ssaky.swus.api.response.todo.TodoGetResp;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.common.utils.DateUtils;
import com.ssaky.swus.db.entity.todo.TodoPrivate;
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
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class TodoServiceTest {

    @Autowired TodoRepository todoRepository;
    @Autowired TodoService todoService;
    @Autowired MemberService memberService;

    static int memberId;
    static int memberId2;

    @BeforeEach
    void beforeEach(){
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

    @Test
    public void todo등록(){
        // given
        TodoCreateReq todoCreateReq = new TodoCreateReq("알고리즘 한 문제 풀기");

        // when
        int num = todoService.save(todoCreateReq, memberId);

        // then
        TodoPrivate res = todoRepository.findOne(num, memberId).get();

        assertEquals(num, res.getNum());
    }

    @Test
    public void todo수정(){
        // given
        TodoCreateReq todoCreateReq = new TodoCreateReq("알고리즘 한 문제 풀기");
        int num = todoService.save(todoCreateReq, memberId);

        // when
        TodoUpdateReq todoUpdateReq = TodoUpdateReq.builder()
                .content("알고리즘 두 문제 풀기")
                .todoDone("Y").build();
        todoService.update(num, todoUpdateReq, memberId);

        // then
        TodoPrivate res = todoRepository.findOne(num, memberId).get();

        assertEquals(todoUpdateReq.getTodoDone(), res.getTodoDone());
        assertEquals(todoUpdateReq.getContent(), res.getContent());
    }

    @Test
    public void todo삭제(){
        // given
        TodoCreateReq todoCreateReq = new TodoCreateReq("알고리즘 한 문제 풀기");
        int num = todoService.save(todoCreateReq, memberId);

        // when
        todoService.delete(num, memberId);

        // then
        Optional<TodoPrivate> res = todoRepository.findOne(num, memberId);

        assert(res.isEmpty());
    }

    @Test
    public void todo조회(){
        // given
        String content1 = "알고리즘 한 문제 풀기";
        String content2 = "JPA 복습하기";
        String content3 = "테스트 코드 작성하기";
        TodoCreateReq todoCreateReq1 = new TodoCreateReq(content1);
        TodoCreateReq todoCreateReq2 = new TodoCreateReq(content2);
        TodoCreateReq todoCreateReq3 = new TodoCreateReq(content3);

        String content4 = "인강 1개 듣기";
        TodoCreateReq todoCreateReq4 = new TodoCreateReq(content4);

        // when
        int num1 = todoService.save(todoCreateReq1, memberId);
        int num2 = todoService.save(todoCreateReq2, memberId);
        int num3 = todoService.save(todoCreateReq3, memberId);
        int num4 = todoService.save(todoCreateReq4, memberId2);

        TodoUpdateReq todoUpdateReq = TodoUpdateReq.builder()
                .content(content1).todoDone("Y").build();
        todoService.update(num1, todoUpdateReq, memberId);

        // then
        List<TodoGetResp> list = todoService.getList(memberId);
        System.out.println(list);
        assertEquals(3, list.size());
        assertEquals(content1, list.get(0).getContent());
        assertEquals(content2, list.get(1).getContent());
        assertEquals(content3, list.get(2).getContent());
        assertEquals(num1, list.get(0).getNum());
        assertEquals(num2, list.get(1).getNum());
        assertEquals(num3, list.get(2).getNum());
        assertEquals("Y", list.get(0).getTodoDone());

        List<TodoGetResp> list2 = todoService.getList(memberId2);
        assertEquals(1, list2.size());
        assertEquals(content4, list2.get(0).getContent());

    }

    @Test
    public void 어제날짜_가져오기(){
        // when
        Date yesterday = DateUtils.getYesterday();
        System.out.println(yesterday);
    }
}