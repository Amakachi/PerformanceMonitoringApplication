package com.esc.rtserver.configs;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        if(SecurityContextHolder.getContext().getAuthentication() != null) {
            return Optional.of((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
            //can use spring security to return logged in user, out of scope ??
        }
        else {
            return Optional.of("SYSTEM");
        }
    }


}
