package com.ssaky.swus.config;

import com.ssaky.swus.config.filter.CustomAuthenticationFilter;
import com.ssaky.swus.config.filter.JwtAuthorizationFilter;
import com.ssaky.swus.config.handler.CustomAuthenticationProvider;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        // 정적 자원에 대해 Security 적용 X
        return (web) -> web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    // http에 빨간 줄 에러 아님 (작성자 : 임혜진)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        // 서버에 인증 정보를 저장하지 않음 -> csrf 사용 X
        http.csrf().disable();

        // form 기반의 로그인 비활성화 -> 커스텀으로 구성한 필터 사용
        http.formLogin().disable();

//        // 토큰 활용 시, 모든 요청을 '인가'에 대해서 사용
//        http.authorizeHttpRequests((authz) -> authz.anyRequest().permitAll());
        
        // CORS 허가
        http.cors().configurationSource(corsConfigurationSource());

        // JWT를 이용해 인증할 예정
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Spring Security JWT Filter load
        http.addFilterBefore(jwtAuthorizationFilter(), BasicAuthenticationFilter.class);

        // auth 열어두기
//        http.antMatcher("/**")
//                .authorizeRequests()
//                .antMatchers("/auth/**").permitAll();

        return http.build();
    }

    /**
     * authentication의 인증 메서드를 제공하는 매니저
     * Provider의 인터페이스
     * @return AuthenticationManager
     */
    @Bean
    public AuthenticationManager authenticationManager(){
        return new ProviderManager(customAuthenticationProvider());
    }

    /**
     * 인증 제공자. 사용자의 이름, 비밀번호 요구
     * @return CustomAuthenticationProvider
     */
    @Bean
    public CustomAuthenticationProvider customAuthenticationProvider(){
        return new CustomAuthenticationProvider(bCryptPasswordEncoder());
    }

    /**
     * 비밀번호 암호화를 위한 BCrypt 인코딩을 통해, 비밀번호에 대한 암호화 수행
     * @return BCryptPasswordEncoder
     */
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CustomAuthenticationFilter customAuthenticationFilter(){
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager());
        customAuthenticationFilter.setFilterProcessesUrl("auth/login");
        customAuthenticationFilter.afterPropertiesSet();
        return customAuthenticationFilter;
    }

    @Bean
    public JwtAuthorizationFilter jwtAuthorizationFilter(){
        return new JwtAuthorizationFilter();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
