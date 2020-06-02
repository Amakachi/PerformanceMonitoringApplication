package com.esc.rtserver.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
@Order(SecurityProperties.BASIC_AUTH_ORDER)
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private RESTAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    private RESTAuthenticationFailureHandler authenticationFailureHandler;
    
    @Autowired
    private RESTAuthenticationSuccessHandler authenticationSuccessHandler;

    @Autowired
    private CustomAuthenticationProvider authProvider;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        System.out.println("passing auth manager");
        auth.authenticationProvider(authProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        System.out.println("Are you picking up my config");
        http.authorizeRequests().antMatchers("/api/users/sendEmailOnForgottenPassword").permitAll();
        http.authorizeRequests().antMatchers("/api/users/resetPassword").permitAll();
        http.authorizeRequests().antMatchers("/api/**").authenticated();
        http.csrf().disable();
        http.formLogin().loginPage("/login");

        http.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
        http.formLogin().successHandler(authenticationSuccessHandler);
        http.formLogin().failureHandler(authenticationFailureHandler);
        http.logout()
                .invalidateHttpSession(true)
                .deleteCookies("SESSION")
                .clearAuthentication(true)
                .logoutSuccessHandler((new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK)));
    }


}
