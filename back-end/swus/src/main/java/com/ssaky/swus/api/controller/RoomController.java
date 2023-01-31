package com.ssaky.swus.api.controller;

import com.ssaky.swus.api.request.room.PublicRoomCreateReq;
import com.ssaky.swus.api.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/studyrooms")
    public ResponseEntity<?> create(@RequestBody PublicRoomCreateReq publicRoomCreateReq) {
        roomService.createPublic(publicRoomCreateReq.getType());
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg", "success_create_studyroom");
        return ResponseEntity.ok(resultMap);
    }
}
