package com.summarizer.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.summarizer.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByUsername(String username);

    boolean existsByUsername(String username);
}
