        package org.example.backend.service;

        import org.example.backend.entity.User;
        import org.example.backend.repository.UserRepo;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;

        @Service
        public class UserServiceImp implements UserService {

            @Autowired
            private UserRepo userRepo;

            @Override
            public User findByUsername(String username) {
                return userRepo.findByUsername(username)
                        .orElse(null); // Handle if user is not found
            }
        }
