package com.ssaky.swus.api.controller.chat;

import com.ssaky.swus.db.model.ChatRoom;
import com.ssaky.swus.db.repository.chat.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;

    @GetMapping("/room")
    public String rooms(Model model) {
        log.debug("... /chat/room 요청 받았당");
        log.debug("... /chat/room 요청 받았당");
        log.debug("... /chat/room 요청 받았당");
        log.debug("... /chat/room 요청 받았당");
        log.debug("... /chat/room 요청 받았당");
        log.debug("... /chat/room 요청 받았당");
        log.debug("... /chat/room 요청 받았당");
        log.debug("... /chat/room 요청 받았당");
        log.debug("... /chat/room 요청 받았당");
        log.debug("... /chat/room 요청 받았당");
        return "/chat/room";
    }

    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> room() {
        return chatRoomRepository.findAllRoom();
    }

    @PostMapping("/room")
    @ResponseBody
    public ChatRoom createRoom(@RequestParam String name) {
        return chatRoomRepository.createChatRoom(name);
    }

    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "/chat/roomdetail";
    }

    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable String roomId) {
        return chatRoomRepository.findRoomById(roomId);
    }
}
