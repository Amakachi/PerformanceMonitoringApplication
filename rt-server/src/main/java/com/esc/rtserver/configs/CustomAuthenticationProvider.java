package com.esc.rtserver.configs;

import com.esc.rtserver.services.AuthenticateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    
    @Autowired
    private AuthenticateService authenticateService;

    @Override
    public Authentication authenticate(Authentication auth) throws AuthenticationException {
        // The authentication object contains the username and password credentials supplied by the user
        // In this case, the username is the email address from the user
        String email = auth.getName();
        String password = auth.getCredentials().toString();

        //Checks if internal or external user and performs authentication based on the kind of user
        if (authenticateService.doAuthenticate(email, password)) {
            // returns a fully populated authentication object i.e with full credentials
            return new CustomUserObj(email, password, new ArrayList<>());
        } else {
            throw new BadCredentialsException("External system authentication failed");
        }
    }


        @Override
        public boolean supports (Class <?> auth){
            return auth.equals(UsernamePasswordAuthenticationToken.class);
        }

}
