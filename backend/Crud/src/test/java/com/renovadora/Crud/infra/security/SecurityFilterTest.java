package com.renovadora.Crud.infra.security;

import com.renovadora.Crud.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class SecurityFilterTest {

    @Test
    void invalidBearerTokenReturnsUnauthorized() throws Exception {
        TokenService tokenService = mock(TokenService.class);
        UserRepository userRepository = mock(UserRepository.class);
        when(tokenService.validateToken("invalid-token")).thenReturn(null);

        SecurityFilter filter = new SecurityFilter(tokenService, userRepository);
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setServletPath("/cadastros");
        request.addHeader("Authorization", "Bearer invalid-token");
        MockHttpServletResponse response = new MockHttpServletResponse();

        filter.doFilter(request, response, (servletRequest, servletResponse) ->
                fail("The request chain must not run for an invalid token")
        );

        assertEquals(401, response.getStatus());
    }
}
