package com.renovadora.Crud.repositories;

import com.renovadora.Crud.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, String> {
   Optional<User> findByLogin(String login);
}

