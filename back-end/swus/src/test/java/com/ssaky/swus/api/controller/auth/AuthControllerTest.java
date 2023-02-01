package com.ssaky.swus.api.controller.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssaky.swus.api.request.auth.LoginReq;
import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.common.error.exception.ErrorCode;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.common.error.exception.custom.LoginFailException;
import com.ssaky.swus.db.repository.member.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;
    
    // 가짜 객체. given으로 어떤 것을 리턴할 것인지 지정해 줘야 함
    @MockBean
    private MemberService memberService;

    @Test
    @WithMockUser
    public void 회원가입_성공() throws Exception{
        // given
        String email = "user";
        String password = "password";

        SignUpReq req = SignUpReq.builder().email(email).password(password).nickname("상상").questionId(2).answer("보광초").build();
        ObjectMapper mapper = new ObjectMapper();

        // when & then
        final ResultActions actions1 = mockMvc.perform(post("/auth/sign-up").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                        .content(mapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.msg").value("success_signup"))
                .andDo(print());
    }

    @Test
    @WithMockUser
    public void 회원가입_실패() throws Exception{
        // given
        String email = "user";
        String password = "password";

        SignUpReq req = SignUpReq.builder().email(email).password(password).nickname("상상").questionId(2).answer("보광초").build();
        ObjectMapper mapper = new ObjectMapper();
        given(memberService.join(any())).willThrow(new InvalidValueException("이미 존재하는 회원입니다."));

        // when & then
        final ResultActions actions = mockMvc.perform(post("/auth/sign-up").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .content(mapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value(ErrorCode.INVALID_INPUT_VALUE.getMessage()))
                .andDo(print());
    }

    @Test
    @WithMockUser
    public void 로그인_실패() throws Exception{
        // given
        String email = "user";
        String password = "password";

        LoginReq req = LoginReq.builder().email(email).password(password).build();
        ObjectMapper mapper = new ObjectMapper();
        given(memberService.login(any())).willThrow(new LoginFailException(email));

        // when & then
        final ResultActions actions = mockMvc.perform(post("/auth/login").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .content(mapper.writeValueAsString(req)))
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.message").value(ErrorCode.ENTITY_NOT_FOUND.getMessage()))
                .andDo(print());

    }

    @Test
    @WithMockUser
    public void 로그인_성공() throws Exception{
        // given
        String email = "user";
        String password = "password";

        LoginReq req = LoginReq.builder().email(email).password(password).build();
        ObjectMapper mapper = new ObjectMapper();
        given(memberService.login(any())).willThrow(new LoginFailException(email));

        // when & then
        final ResultActions actions = mockMvc.perform(post("/auth/login").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .content(mapper.writeValueAsString(req)))
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.message").value(ErrorCode.ENTITY_NOT_FOUND.getMessage()))
                .andDo(print());

    }
    
    @Test
    // WebMVCTest를 사용하기 때문에 추가해야 하는 코드. 실제로 바로 접근할 때에는 상관 없음
    @WithMockUser(username = "hjlim7831@gmail.com")
    public void 이메일_중복일때() throws Exception {
        // given
        String email = "hjlim7831@gmail.com";
        doThrow(InvalidValueException.class).when(memberService).validateDuplicateEmail(email);
        MultiValueMap<String, String> info = new LinkedMultiValueMap<String, String>();
        info.add("email", email);

        // when & then
        final ResultActions actions = mockMvc.perform(get("/auth/check-email").with(csrf())
                        .params(info))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.msg").value("Y"))
                .andDo(print());

    }

    @Test
    // WebMVCTest를 사용하기 때문에 추가해야 하는 코드. 실제로 바로 접근할 때에는 상관 없음
    @WithMockUser(username = "hjlim7831@gmail.com")
    public void 이메일_중복아닐때() throws Exception {
        // given
        String email = "hjlim7831@gmail.com";
        MultiValueMap<String, String> info = new LinkedMultiValueMap<String, String>();
        info.add("email", email);

        // when & then
        final ResultActions actions = mockMvc.perform(get("/auth/check-email").with(csrf())
                        .params(info))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.msg").value("N"))
                .andDo(print());

    }

}