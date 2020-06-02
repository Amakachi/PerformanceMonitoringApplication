package com.esc.rtserver.websocket.config;

import com.esc.rtserver.websocket.state.DashboardUpdateState;
import com.esc.rtserver.websocket.state.LiveUpdateState;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
public class SchedulerConfig {

    @Bean
    public LiveUpdateState liveSummarySchedulerState(){
        return new LiveUpdateState();
    }

    @Bean
    public DashboardUpdateState dashboardSchedulerState(){
        return new DashboardUpdateState();
    }


}
