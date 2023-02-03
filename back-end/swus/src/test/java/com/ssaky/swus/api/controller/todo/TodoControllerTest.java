package com.ssaky.swus.api.controller.todo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssaky.swus.api.controller.auth.AuthController;
import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.request.todo.TodoCreateReq;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.api.service.todo.TodoService;
import com.ssaky.swus.common.error.exception.ErrorCode;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.util.WithAuthUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import javax.annotation.PostConstruct;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TodoController.class)
class TodoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TodoService todoService;

//    @PostConstruct
//    @BeforeEach
//    public void settingUserTest(){
//        String email = "hjlim7831@gmail.com";
//        String password = "ssafyssafy";
//        SignUpReq req = SignUpReq.builder().email(email).password(password)
//                .nickname("이매").questionId(2).answer("보리").build();
//        memberService.join(req);
//
//
//
//    }

    @Test
    @WithAuthUser(email = "hjlim7831@gmail.com")
//    @WithMockUser(username = "hjlim7831@gmail.com")
//    @WithUserDetails(value = "hjlim7831@gmail.com")
    public void todo등록() throws Exception {
        // given
        int num = 1;
        String content = "놀기";
        given(todoService.save(any(TodoCreateReq.class), anyInt())).willReturn(num);

        ObjectMapper mapper = new ObjectMapper();

        TodoCreateReq req = TodoCreateReq.builder().content(content).build();

        // when & then
        final ResultActions actions = mockMvc.perform(post("/my-todos").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .content(mapper.writeValueAsString(req)))
                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.num").value(num))
                .andDo(print());

    }

}