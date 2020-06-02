package com.esc.rtserver.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class LdapConfiguration {
    @Autowired
    Environment env;

    @Bean
    @Lazy
    public LdapContextSource contextSource () {
        LdapContextSource contextSource= new LdapContextSource();
        contextSource.setUrl(env.getRequiredProperty("ldap.url"));
        contextSource.setBase(env.getRequiredProperty("ldap.base"));
        contextSource.setUserDn(env.getRequiredProperty("ldap.username"));
        contextSource.setPassword(env.getRequiredProperty("ldap.password"));
        return contextSource;
    }

    @Bean
    @Lazy
    public LdapTemplate ldapTemplate() {
        return new LdapTemplate(contextSource());
    }


    @Lazy
    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}
