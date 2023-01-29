package com.ssaky.swus.api.controller.auth;

import com.ssaky.swus.api.domain.user.User;
import com.ssaky.swus.common.utils.TokenUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("login")
    public ResponseEntity<?> login(Model model){

        return ResponseEntity.ok("");
    }

    @PostMapping("sign-up")
    public ResponseEntity<?> signUp(Model model){

        return ResponseEntity.ok("");
    }

    @PostMapping("/generateToken")
    public ResponseEntity<?> selectCodeList(@RequestBody User user){
        Map<String, Object> resultMap = new HashMap<>();

        String resultToken = TokenUtils.generateJwtToken(user);

        resultMap.put("result", resultToken);
        resultMap.put("resultCode", 200);
        return ResponseEntity.ok(resultMap);
    }

}
