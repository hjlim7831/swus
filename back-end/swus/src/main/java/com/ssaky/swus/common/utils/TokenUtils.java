package com.ssaky.swus.common.utils;

import com.ssaky.swus.common.codes.AuthConstants;
import com.ssaky.swus.common.error.exception.BusinessException;
import com.ssaky.swus.common.error.exception.ErrorCode;
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
                .setSubject(String.valueOf(member.getEmail()))
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
            Claims claims = getClaimsFromToken(token);

            log.info("expireTime :" + claims.getExpiration());
            log.info("email :" + claims.get("email"));

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
        if (header != null && header.startsWith(AuthConstants.TOKEN_TYPE)){
            return header.split(" ")[1];
        }else{
            throw new BusinessException("TOKEN TYPE doesn't match", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        }
    }

    /**
     * 토큰의 만료기간을 지정하는 함수
     * @return Calendar
     */
    public static Date createExpiredDate(){
        Calendar c = Calendar.getInstance();
//        c.add(Calendar.HOUR, 8); // 8시간
         c.add(Calendar.DATE, 1); // 1일
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
        claims.put("email", member.getEmail());
        claims.put("memberId", member.getId());
        //여기에 JWT에 필요한 user data 추가할 수 있음
        claims.put("nickname", member.getNickname());

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
    public static Claims getClaimsFromToken(String token){
        return Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(jwtSecretKey))
                .parseClaimsJws(token).getBody();
    }

    /**
     * 토큰을 기반으로 사용자 정보를 반환받는 메서드
     * @param claims : claims
     * @return String : 사용자 아이디
     */
    public static int getmemberIdFromToken(Claims claims){
        return Integer.parseInt(claims.get("memberId").toString());
    }

    /**
     * 토큰을 기반으로 사용자 정보를 반환받는 메서드
     * @param claims : claims
     * @return String : 닉네임
     */
    public static String getMemberNicknameFromToken(Claims claims){
        return claims.get("memberId").toString();
    }


    public static void checkExistenceOfMemberId(Claims claims){
        String memberId = claims.get("memberId").toString();
        if (memberId == null || memberId.equalsIgnoreCase("")){
            throw new BusinessException("TOKEN isn't memberId", ErrorCode.BUSINESS_EXCEPTION_ERROR);
        }
    }


}
