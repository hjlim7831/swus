package com.ssaky.swus.config;

import com.ssaky.swus.common.codes.AuthConstants;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.List;

@Configuration
public class SwaggerConfig {

    private static final String REFERENCE = AuthConstants.TOKEN_TYPE+" "+"토큰 값";

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30)
//        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.withClassAnnotation(RestController.class))
//                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .securityContexts(List.of(securityContext()))
                .securitySchemes(List.of(bearerAuthSecurityScheme()));
//                .securitySchemes(List.of(apiKey()));
    }

    private SecurityContext securityContext(){
        return springfox.documentation
                .spi.service.contexts
                .SecurityContext
                .builder()
                .securityReferences(defaultAuth())
                .operationSelector(operationContext -> true)
                .build();
//        return SecurityContext.builder()
//                .securityReferences(defaultAuth())
//                .build();
    }

    private List<SecurityReference> defaultAuth(){
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = new AuthorizationScope("global", "accessEverything");
        return List.of(new SecurityReference(REFERENCE, authorizationScopes));
    }

    private ApiKey apiKey(){
        return new ApiKey(AuthConstants.AUTH_HEADER, AuthConstants.AUTH_HEADER, "header");
    }

    private HttpAuthenticationScheme bearerAuthSecurityScheme(){
        return HttpAuthenticationScheme.JWT_BEARER_BUILDER.name(REFERENCE).build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Study With Us REST API")
                .version("1.0.0")
                .description("스윗어스 swagger api")
                .build();
    }
}
