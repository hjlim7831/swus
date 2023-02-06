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

    //채팅 리스트 화면
    @GetMapping("/room")
    public String rooms(Model model) {
        return "/chat/room";
    }

    //모든 채팅창 목록 반환
    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> room() {
        return chatRoomRepository.findAllRoom();
    }

    //채팅방 생성
    @PostMapping("/room")
    @ResponseBody
    public ChatRoom createRoom(@RequestParam String name) {
        log.debug("createRoom호출. name : "+name);
        return chatRoomRepository.createChatRoom(name);
    }

    //채팅방 입장 화면
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        log.debug("roomDetail호출. roomdId : "+roomId);
//        model.addAttribute("roomName", roomId);
        return "/chat/roomdetail";
    }

    //특정 채팅방 조회
    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable String roomId) {
        log.debug("roomInfo호출. roomId : "+roomId);
        return chatRoomRepository.findRoomByName(roomId);
    }

    //휴게실 입장시 채팅방 입장
    @GetMapping("/breakrooms/chat")
    public String breakDetail(Model model) {
        String breakChatId = "breakroom";
        log.debug("roomDetail호출. roomdId : "+breakChatId);
        model.addAttribute("roomId", breakChatId);
        return "/chat/roomdetail";
    }
}
