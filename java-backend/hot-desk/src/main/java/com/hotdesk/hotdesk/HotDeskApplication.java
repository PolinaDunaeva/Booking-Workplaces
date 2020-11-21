package com.hotdesk.hotdesk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.time.LocalDate;
import java.time.LocalTime;

@SpringBootApplication
@EnableOpenApi
public class HotDeskApplication {

	public static void main(String[] args) {
		SpringApplication.run(HotDeskApplication.class, args);
	}

//	@Bean
//	public Docket hotDeskApi() {
//		return new Docket(DocumentationType.OAS_30)
//				.directModelSubstitute(LocalDate.class, java.sql.Date.class)
//				.directModelSubstitute(LocalTime.class, Long.class);
//	}
}
