package com.renovadora.Crud;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CrudApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {
	}

	@ParameterizedTest
	@ValueSource(strings = {
			"http://localhost:5173",
			"https://ordem-servico-system.vercel.app",
			"https://ordem-servico-system-git-main-montes-projects.vercel.app"
	})
	void corsAllowsPreflightFromConfiguredFrontendOrigins(String origin) throws Exception {
		mockMvc.perform(options("/cadastros")
						.header("Origin", origin)
						.header("Access-Control-Request-Method", "PATCH")
						.header("Access-Control-Request-Headers", "authorization,content-type"))
				.andExpect(status().isOk())
				.andExpect(header().string("Access-Control-Allow-Origin", origin))
				.andExpect(header().string("Access-Control-Allow-Credentials", "true"));
	}

	@Test
	void corsHeadersArePresentOnProtectedResourceResponses() throws Exception {
		mockMvc.perform(get("/cadastros")
						.header("Origin", "http://localhost:5173"))
				.andExpect(status().isUnauthorized())
				.andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"));
	}

	@Test
	void corsRejectsPreflightFromUnconfiguredOrigin() throws Exception {
		mockMvc.perform(options("/cadastros")
						.header("Origin", "https://untrusted.example")
						.header("Access-Control-Request-Method", "GET"))
				.andExpect(status().isForbidden())
				.andExpect(header().doesNotExist("Access-Control-Allow-Origin"));
	}

}
