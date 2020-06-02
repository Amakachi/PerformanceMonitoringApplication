package com.esc.rtserver;

import com.esc.rtserver.configs.CorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class RtServerApplication{

    public static void main(String[] args) {
        SpringApplication.run(RtServerApplication.class, args);
    }

//    @Bean
//    public FilterRegistrationBean corsFilterRegistration(){
//        FilterRegistrationBean registrationBean =
//                new FilterRegistrationBean(new CorsFilter());
//        registrationBean.setName("CORS FILTER");
//        registrationBean.addUrlPatterns("/*");
//        registrationBean.setOrder(1);
//        return registrationBean;
//
//    }

}
