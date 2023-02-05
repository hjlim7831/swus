package com.ssaky.swus.api.controller.study;

import com.ssaky.swus.api.request.study.CoreTimeReq;
import com.ssaky.swus.api.request.study.TargetTimeReq;
import com.ssaky.swus.api.request.study.TotalTimeReq;
import com.ssaky.swus.api.service.study.StudyService;
import com.ssaky.swus.common.utils.TokenUtils;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/my-studies")
public class StudyController {

    @Autowired
    StudyService studyService;

    @GetMapping("now-core-time")
    public ResponseEntity<?> getCoreTime(Authentication authentication){
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        return ResponseEntity.ok(studyService.getCoreTime(memberId));
    }

    @PutMapping("now-core-time")
    public ResponseEntity<?> updateCoreTime(Authentication authentication, @RequestBody CoreTimeReq req){
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        studyService.updateCoreTime(memberId, req);
        resultMap.put("msg", "success_update_now_core_time");
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("now-total-time")
    public ResponseEntity<?> getTotalTime(Authentication authentication){
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        return ResponseEntity.ok(studyService.getTotalTime(memberId));
    }

    @PutMapping("now-total-time")
    public ResponseEntity<?> updateTotalTime(Authentication authentication, @RequestBody TotalTimeReq req){
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        studyService.updateTotalTime(memberId, req);
        resultMap.put("msg", "success_update_now_total_time");
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("now-target-time")
    public ResponseEntity<?> getTargetTime(Authentication authentication){
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        return ResponseEntity.ok(studyService.getTargetTime(memberId));
    }

    @PutMapping("now-target-time")
    public ResponseEntity<?> updateTargetTime(Authentication authentication, @RequestBody TargetTimeReq req){
        Map<String, Object> resultMap = new HashMap<>();
        Claims claims = (Claims) authentication.getPrincipal();
        int memberId = TokenUtils.getmemberIdFromToken(claims);
        studyService.updateTargetTime(memberId, req);
        resultMap.put("msg", "success_update_now_target_time");
        return ResponseEntity.ok(resultMap);
    }
}
