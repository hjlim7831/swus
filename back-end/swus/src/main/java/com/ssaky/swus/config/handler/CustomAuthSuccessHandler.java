package com.ssaky.swus.config.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.entity.member.MemberDetails;
import org.json.simple.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

public class CustomAuthSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        
        // 사용자와 관련된 정보 모두 조회
        Member member = ((MemberDetails) authentication.getPrincipal()).getMember();

        ObjectMapper objectMapper = new ObjectMapper();
        Map result = objectMapper.convertValue(member, Map.class);

        // 조회 데이터를 JSONObject 형태로 파싱

        JSONObject userObj = new JSONObject(result);

        Map<String, Object> responseMap = new HashMap<>();

        JSONObject jsonObject;

        responseMap.put("userInfo", userObj);
        responseMap.put("resultCode", 200);
        responseMap.put("failMsg", null);
        jsonObject = new JSONObject(responseMap);

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter printWriter = response.getWriter();
        printWriter.print(jsonObject);
        printWriter.flush();
        printWriter.close();

    }
}
