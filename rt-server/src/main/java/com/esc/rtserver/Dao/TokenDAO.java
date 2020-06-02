package com.esc.rtserver.Dao;

import com.esc.rtserver.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface TokenDAO extends JpaRepository<Token, Long> {
    Optional<Token> findByToken(String token);
}
