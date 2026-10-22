package com.renovadora.Crud.controller;

import com.renovadora.Crud.infra.security.TokenService;
import com.renovadora.Crud.repositories.UserRepository;
import com.renovadora.Crud.user.AuthenticationDTO;
import com.renovadora.Crud.user.LoginResponseDTO;
import com.renovadora.Crud.user.RegisterDTO;
import com.renovadora.Crud.user.User;
import com.renovadora.Crud.user.UserRole;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final UserRepository repository;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationController(
            UserRepository repository,
            AuthenticationManager authenticationManager,
            TokenService tokenService,
            PasswordEncoder passwordEncoder
    ) {
        this.repository = repository;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody AuthenticationDTO data
    ) {
        var usernamePassword =
                new UsernamePasswordAuthenticationToken(data.login(), data.password());

        var auth = authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }


    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Validated RegisterDTO data) {

        if (repository.findByLogin(data.login()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        String encryptedPassword = passwordEncoder.encode(data.password());

        User newUser = new User(
                data.login(),
                encryptedPassword,
                UserRole.USER
        );

        repository.save(newUser);
        return ResponseEntity.ok().build();
    }



}
