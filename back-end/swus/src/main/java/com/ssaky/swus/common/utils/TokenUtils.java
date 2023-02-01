package com.ssaky.swus.common.utils;

import com.ssaky.swus.db.entity.member.Member;
import io.jsonwebtoken.*;
import lombok.extern.log4j.Log4j2;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Log4j2
public class TokenUtils {
    // @Value(value = "${custom.jwt-secret-key}")
    private static final String jwtSecretKey = "exampleSecretKey";

    public static String generateJwtToken(Member member) {
        JwtBuilder builder = Jwts.builder()
                .setHeader(createHeader())
                .setClaims(createClaims(member))
                .setSubject(String.valueOf(member.getId()))
                .signWith(SignatureAlgorithm.HS256, createSignature())
                .setExpiration(createExpiredDate());
        return builder.compact();
    }

    public static String parseTokenToUserInfo(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public static boolean isValidToken(String token) {
        try {
            Claims claims = getClaimsFormToken(token);

            log.info("expireTime :" + claims.getExpiration());
            log.info("email :" + claims.get("email"));
            log.info("nickname :" + claims.get("nickname"));

            return true;
        } catch (ExpiredJwtException exception) {
            log.error("Token Expired");
            return false;
        } catch (JwtException exception) {
            log.error("Token Tampered");
            return false;
        } catch (NullPointerException exception) {
            log.error("Token is null");
            return false;
        }
    }

    /**
     * Header 내에 토큰 추출
     * @param header
     * @return String
     */
    public static String getTokenFromHeader(String header){
        return header.split(" ")[1];
    }

    /**
     * 토큰의 만료기간을 지정하는 함수
     * @return Calendar
     */
    public static Date createExpiredDate(){
        Calendar c = Calendar.getInstance();
        c.add(Calendar.HOUR, 8); // 8시간
        // c.add(Calendar.DATE, 1); // 1일
        return c.getTime();
    }

    /**
     * JWT의 "헤더" 값을 생성해주는 메서드
     * @return HashMap<String, Object>
     */
    private static Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();

        header.put("typ", "JWT");
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    /**
     * 사용자 정보를 기반으로 클레임을 생성해주는 메서드
     * @param member
     * @return Map<String, Object>
     */
    private static Map<String, Object> createClaims(Member member){
        Map<String, Object> claims = new HashMap<>();

        log.info("email : "+ member.getEmail());
        log.info("nickname : "+ member.getNickname());
        
        return claims;
    }

    /**
     * JWT "서명(Signature)" 발급을 해주는 메서드
     * @return Key
     */
    private static Key createSignature(){
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(jwtSecretKey);
        return new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    /**
     * 토큰 정보를 기반으로 Claims 정보를 반환받는 메서드
     * @param token : 토큰
     * @return Claims : Claims
     */
    private static Claims getClaimsFormToken(String token){
        return Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(jwtSecretKey))
                .parseClaimsJws(token).getBody();
    }

    /**
     * 토큰을 기반으로 사용자 정보를 반환받는 메서드
     * @param token : 토큰
     * @return String : 사용자 아이디
     */
    public static String getmemberIdFromToken(String token){
        Claims claims = getClaimsFormToken(token);
        return claims.get("memberId").toString();
    }

}
