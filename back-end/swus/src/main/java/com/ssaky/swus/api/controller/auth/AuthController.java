package com.ssaky.swus.api.controller.auth;

import com.ssaky.swus.api.request.auth.CheckPwdReq;
import com.ssaky.swus.api.response.auth.LoginResp;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.api.request.auth.LoginReq;
import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.common.utils.TokenUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

        LoginResp resp = memberService.login(form);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpReq form){
        Map<String, Object> resultMap = new HashMap<>();
        log.debug(String.valueOf(form));

        int id = memberService.join(form);
        resultMap.put("msg", "success_signup");
        return ResponseEntity.ok(resultMap);

    }

    @GetMapping("check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            memberService.validateDuplicateEmail(email);
            resultMap.put("msg", "N");
        } catch(InvalidValueException e){
            resultMap.put("msg", "Y");
        }

        return ResponseEntity.ok(resultMap);
    }

    @PostMapping("check-pwd")
    public ResponseEntity<?> checkPwd(@RequestBody CheckPwdReq form){
        Map<String, Object> resultMap = new HashMap<>();
        log.debug(String.valueOf(form));

        return ResponseEntity.ok(resultMap);
    }

}
