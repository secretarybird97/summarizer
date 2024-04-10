package com.summarizer.backend.dataloader;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.summarizer.backend.entity.User;
import com.summarizer.backend.repository.UserRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create users and save them in the database
        User user1 = new User("username1", "password1");
        User user2 = new User("username2", "password2");
        if (!userRepository.existsByUsername(user1.getUsername())) {
            userRepository.save(user1);
        }
        if (!userRepository.existsByUsername(user2.getUsername())) {
            userRepository.save(user2);
        }
    }
}
