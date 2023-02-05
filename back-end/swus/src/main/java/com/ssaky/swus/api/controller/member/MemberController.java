package com.ssaky.swus.api.controller.member;

import com.ssaky.swus.api.request.member.MemberUpdateReq;
import com.ssaky.swus.api.service.member.MemberService;
import com.ssaky.swus.common.utils.TokenUtils;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("my-info")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<?> getInfo(Authentication authentication){
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);

        return ResponseEntity.ok(memberService.findOneInfo(memberId));

    }

    @PutMapping
    public ResponseEntity<?> updateInfo(Authentication authentication, MemberUpdateReq req){
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        memberService.updateInfo(memberId, req);
        resultMap.put("msg", "success_update_user");
        return ResponseEntity.ok(resultMap);
    }

    @DeleteMapping
    public ResponseEntity<?> withdraw(Authentication authentication){
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        memberService.delete(memberId);
        resultMap.put("msg", "success_withdraw_member");
        return ResponseEntity.ok(resultMap);
    }

}
