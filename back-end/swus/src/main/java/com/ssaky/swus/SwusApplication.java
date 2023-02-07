package com.ssaky.swus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableJpaAuditing
@SpringBootApplication
public class SwusApplication {
	public static void main(String[] args) {
		SpringApplication.run(SwusApplication.class, args);
	}

}
