package com.ssaky.swus.api.service.todo;

import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.todo.TodoCreateReq;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.db.entity.todo.TodoPrivate;
import com.ssaky.swus.db.repository.todo.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class TodoServiceTest {

    @Autowired TodoRepository todoRepository;
    @Autowired TodoService todoService;
    @Autowired MemberService memberService;

    static int memberId;

    @BeforeEach
    void beforeEach(){
        String email = "helenalim1205@gmail.com";
        String password = "ssafy";

        SignUpReq signUpReq = SignUpReq.builder().email(email).password(password)
                .nickname("상상").questionId(2).answer("보광초").build();

        memberId = memberService.join(signUpReq);
    }

    @Test
    public void todo등록(){
        // given
        TodoCreateReq todoCreateReq = new TodoCreateReq("알고리즘 한 문제 풀기");

        // when
        int num = todoService.save(todoCreateReq, memberId);

        // then
        TodoPrivate res = todoRepository.findOne(num).get();

        assertEquals(num, res.getNum());
    }

}