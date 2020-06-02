    package com.esc.rtserver.configs;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class CustomUserObj extends UsernamePasswordAuthenticationToken {

   private static final long serialVersionUID = 500L;

    public CustomUserObj(Object principal, Object credentials) {
        super(principal, credentials);
    }

    public CustomUserObj(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(principal, credentials, authorities);
    }
}
