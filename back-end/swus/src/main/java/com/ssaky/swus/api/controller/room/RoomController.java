package com.ssaky.swus.api.controller.room;

import com.ssaky.swus.api.request.room.PublicCreateReq;
import com.ssaky.swus.api.request.room.PublicExitReq;
import com.ssaky.swus.api.service.room.RoomService;
import com.ssaky.swus.common.utils.TokenUtils;
import com.ssaky.swus.db.entity.Room.PublicRoom;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/studyrooms")
    public ResponseEntity<?> createPublic(@RequestBody PublicCreateReq publicCreateReq) {
        int roomId = roomService.createPublic(publicCreateReq.getType());
        PublicRoom room = roomService.findPublic(roomId);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg", "success_get_studyrooms");
        resultMap.put("public", room);
        return ResponseEntity.ok(resultMap);
    }

    //방 리스트 불러오기
    @GetMapping("/studyrooms")
    public ResponseEntity<?> getAllPublics() {

        List<PublicRoom> publics = roomService.findPublics();
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg", "success_get_studyrooms");
        resultMap.put("publics",publics);
        return ResponseEntity.ok(resultMap);
    }

    @PostMapping("/studyrooms/{room_id}")
    public ResponseEntity<?> enterPublic (Authentication authentication, @PathVariable int room_id){
        Claims claims = (Claims) authentication.getPrincipal();
        int userId = TokenUtils.getmemberIdFromToken(claims);
        roomService.enterPublic(room_id,userId);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg", "success_enter_studyroom");
        return ResponseEntity.ok(resultMap);
    }

    @PostMapping("/studyrooms/exit")
    public ResponseEntity<?> exitPublic(Authentication authentication, @RequestBody PublicExitReq publicExitReq) {
        Claims claims = (Claims) authentication.getPrincipal();
        int userId = TokenUtils.getmemberIdFromToken(claims);
        publicExitReq.setMemberId(userId);
        log.debug("member_id/room_id : "+userId+"/"+publicExitReq.getRoomId());
        roomService.exitPublic(publicExitReq);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg", "success_exit_studyroom");
        return ResponseEntity.ok(resultMap);
    }
}
