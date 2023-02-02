package com.ssaky.swus.api.controller.room;

import com.ssaky.swus.api.request.room.PublicCreateReq;
import com.ssaky.swus.api.service.room.RoomService;
import com.ssaky.swus.db.entity.Room.PublicRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/studyrooms")
    public ResponseEntity<?> createPublic(@RequestBody PublicCreateReq publicCreateReq) {
        roomService.createPublic(publicCreateReq.getType());
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

    @PostMapping("/studyrooms/{room_id}")
    public ResponseEntity<?> enterPublic (@RequestBody Map<String, Object> userIdMap, @PathVariable int room_id){
        int user_id = (Integer) userIdMap.get("user_id");
        roomService.enterPublic(room_id,user_id);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg", "success_enter_studyroom");
        return ResponseEntity.ok(resultMap);
    }
}
