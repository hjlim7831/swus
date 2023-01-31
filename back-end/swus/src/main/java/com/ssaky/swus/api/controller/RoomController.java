package com.ssaky.swus.api.controller;

import com.ssaky.swus.api.request.room.PublicRoomCreateReq;
import com.ssaky.swus.api.service.RoomService;
import com.ssaky.swus.db.entity.Room.PublicRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/studyrooms")
    public ResponseEntity<?> createPublic(@RequestBody PublicRoomCreateReq publicRoomCreateReq) {
        roomService.createPublic(publicRoomCreateReq.getType());
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg", "success_get_studyrooms");
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
}
