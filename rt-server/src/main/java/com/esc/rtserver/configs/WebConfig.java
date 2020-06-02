package com.esc.rtserver.configs;

import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.*;

@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        System.out.println("adding view controllers");
        registry.addViewController("/login").setViewName("index");
        registry.addViewController("/**").setViewName("index");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }
}
