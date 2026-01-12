package com.lockin.lock_in_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication

@EnableScheduling
public class LockInApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(LockInApiApplication.class, args);
	}

}
