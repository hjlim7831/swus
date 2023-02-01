package com.ssaky.swus.config.filter;

import com.ssaky.swus.common.codes.AuthConstants;
import com.ssaky.swus.common.utils.TokenUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Slf4j
//@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    @Value("${swagger.paths}")
    private List<String> swaggerPaths;

    private AntPathMatcher pathMatcher = new AntPathMatcher();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {

        // 1. 토큰이 필요하지 않은 API URL에 대해 배열로 구성
        List<String> list = Arrays.asList(
                "/auth/login",
                "/auth/sign-up",
                "/auth/generateToken"
        );
//        System.out.println(request.getServletPath());
        // swagger에 필요한 URL일 경우, 다음 필터로 이동
        boolean isSwaggerPath = swaggerPaths.stream()
                .anyMatch(path -> pathMatcher.match(path, request.getServletPath()));
        if (isSwaggerPath){
            chain.doFilter(request, response);
            return;
        }

        // 2. 토큰이 필요하지 않은 API URL의 경우 -> 로직 처리 없이 다음 필터로 이동
        if (list.contains(request.getRequestURI())){
            chain.doFilter(request, response);
            return;
        }

        // 3. OPTIONS 요청일 경우 -> 로직 처리 없이 다음 필터로 이동
        if (request.getMethod().equalsIgnoreCase("OPTIONS")){
            chain.doFilter(request, response);
        }
        
        // [1] Client에서 API 요청 시, Header 확인
        String header = request.getHeader(AuthConstants.AUTH_HEADER);
        logger.debug("[+] header Check: "+header);
        
        try{
            
            if (header != null && !header.equalsIgnoreCase("")){
                
                // [2] Header 내에 토큰 추출
                String token = TokenUtils.getTokenFromHeader(header);
                
                // [3] 추출한 토큰의 유효성 체크
                if (TokenUtils.isValidToken(token)){

                    // [4] 토큰을 기반으로 사용자 아이디를 반환 받는 메서드
                    String memberId = TokenUtils.getmemberIdFromToken(token);
                    logger.debug("[+] memberId Check: "+memberId);

                    // [5] 사용자 아이디의 존재여부 체크
                    if (memberId != null && !memberId.equalsIgnoreCase("")){
                        chain.doFilter(request, response);
                    } else {
//                        throw new BusinessExceptionHandler("TOKEN isn't memberId", ErrorCode.BUSINESS_EXCEPTION_ERROR);
                    }
                    // 토큰이 유효하지 않은 경우
                } else {
//                    throw new BusinessExceptionHandler("TOKEN is invalid", ErrorCode.BUSINESS_EXCEPTION_ERROR);
                }
            }
            // [2-1] 토큰이 존재하지 않는 경우
            else {
//                throw new BusinessExceptionHandler("Token is null", ErrorCode.BUSINESS_EXCEPTION_ERROR);
            }

        } catch (Exception e){

            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            JSONObject jsonObject = jsonResponseWrapper(e);
            printWriter.print(jsonObject);
            printWriter.flush();
            printWriter.close();
        }
    }

    private JSONObject jsonResponseWrapper(Exception e){

        String resultMsg = "";
        // JWT 토큰 만료
        if (e instanceof ExpiredJwtException) {
            resultMsg = "TOKEN Expired";
        }
        // JWT 허용된 토큰이 아님
        else if (e instanceof SignatureException) {
            resultMsg = "TOKEN SignatureException Login";
        }
        // JWT 토큰내에서 오류 발생 시
        else if (e instanceof JwtException) {
            resultMsg = "TOKEN Parsing JwtException";
        }
        // 이외 JTW 토큰내에서 오류 발생
        else {
            resultMsg = "OTHER TOKEN ERROR";
        }

        HashMap<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("status", 401);
        jsonMap.put("code", "9999");
        jsonMap.put("message", resultMsg);
        jsonMap.put("reason", e.getMessage());
        JSONObject jsonObject = new JSONObject(jsonMap);
        logger.error(resultMsg, e);
        return jsonObject;
    }

}
