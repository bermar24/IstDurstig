package istdurstig.service;

import istdurstig.dto.AuthResponse;
import istdurstig.dto.LoginRequest;
import istdurstig.dto.RegisterRequest;
import istdurstig.model.User;
import istdurstig.repository.UserRepository;
import istdurstig.security.JwtUtils;
import istdurstig.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();

        return new AuthResponse(jwt, userDetails.getId(), userDetails.getEmail(), 
                               getUserFirstName(userDetails.getId()), getUserLastName(userDetails.getId()));
    }

    public AuthResponse registerUser(RegisterRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User user = new User(signUpRequest.getEmail(),
                           encoder.encode(signUpRequest.getPassword()),
                           signUpRequest.getFirstName(),
                           signUpRequest.getLastName());

        userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), signUpRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();

        return new AuthResponse(jwt, userDetails.getId(), userDetails.getEmail(),
                               signUpRequest.getFirstName(), signUpRequest.getLastName());
    }

    private String getUserFirstName(String userId) {
        return userRepository.findById(userId)
                .map(User::getFirstName)
                .orElse("");
    }

    private String getUserLastName(String userId) {
        return userRepository.findById(userId)
                .map(User::getLastName)
                .orElse("");
    }
}