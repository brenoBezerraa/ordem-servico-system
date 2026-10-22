package com.renovadora.Crud.controller;

import com.renovadora.Crud.infra.security.TokenService;
import com.renovadora.Crud.repositories.UserRepository;
import com.renovadora.Crud.user.RegisterDTO;
import com.renovadora.Crud.user.User;
import com.renovadora.Crud.user.UserRole;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AuthenticationControllerTest {

    @Test
    void registrationAlwaysAssignsTheUserRole() {
        UserRepository repository = mock(UserRepository.class);
        AuthenticationManager authenticationManager = mock(AuthenticationManager.class);
        TokenService tokenService = mock(TokenService.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);

        when(repository.findByLogin("new-admin")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password")).thenReturn("encoded-password");

        AuthenticationController controller = new AuthenticationController(
                repository,
                authenticationManager,
                tokenService,
                passwordEncoder
        );

        controller.register(new RegisterDTO("new-admin", "password", UserRole.ADMIN));

        var savedUser = ArgumentCaptor.forClass(User.class);
        verify(repository).save(savedUser.capture());
        assertEquals(UserRole.USER, savedUser.getValue().getRole());
    }
}
