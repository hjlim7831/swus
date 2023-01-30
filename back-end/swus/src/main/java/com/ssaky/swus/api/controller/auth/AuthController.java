package com.ssaky.swus.api.controller.auth;

import antlr.Token;
import com.ssaky.swus.api.response.auth.LoginResp;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.api.request.auth.LoginReq;
import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.common.utils.TokenUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private MemberService memberService;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginReq form){
        Map<String, Object> resultMap = new HashMap<>();

        Optional<Member> member = memberService.login(form);
        if (member.isPresent()){
            String accessToken = TokenUtils.generateJwtToken(member.get());
            LoginResp resp = new LoginResp(member.get(), accessToken);
            return ResponseEntity.ok(resp);
        }else{
            resultMap.put("msg", "failure_login");
            return ResponseEntity.badRequest().body(resultMap);
        }
    }

    @PostMapping("sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpReq form){
        Map<String, Object> resultMap = new HashMap<>();
        log.debug(String.valueOf(form));

        if (memberService.validateDuplicateEmail(form.getEmail())){
            resultMap.put("msg", "fail_duplicated_email");
            return ResponseEntity.badRequest().body(resultMap);
        } else{
            int id = memberService.join(form);
            resultMap.put("msg", "success_signup");
            return ResponseEntity.ok(resultMap);
        }

    }

//    @PostMapping("/generateToken")
//    public ResponseEntity<?> selectCodeList(@RequestBody Member member){
//        Map<String, Object> resultMap = new HashMap<>();
//
//        String resultToken = TokenUtils.generateJwtToken(member);
//
//        resultMap.put("result", resultToken);
//        resultMap.put("resultCode", 200);
//        System.out.println(resultMap);
//        return ResponseEntity.ok(resultMap);
//    }

}
