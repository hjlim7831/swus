package com.ssaky.swus.api.controller.auth;

import com.ssaky.swus.api.domain.member.Member;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.common.utils.TokenUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private MemberService memberService;

    @PostMapping("login")
    public ResponseEntity<?> login(Model model, LoginDTO form){
        String email = form.getEmail();
        String password = form.getPassword();

        return ResponseEntity.ok("");
    }

    @PostMapping("sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpDTO form){
        int id = memberService.join(form);
        log.debug(String.valueOf(form));
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("id", id);
        return ResponseEntity.ok(resultMap);
    }

    @PostMapping("/generateToken")
    public ResponseEntity<?> selectCodeList(@RequestBody Member member){
        Map<String, Object> resultMap = new HashMap<>();

        String resultToken = TokenUtils.generateJwtToken(member);

        resultMap.put("result", resultToken);
        resultMap.put("resultCode", 200);
        System.out.println(resultMap);
        return ResponseEntity.ok(resultMap);
    }

}
