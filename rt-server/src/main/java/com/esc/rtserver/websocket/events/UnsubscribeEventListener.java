package com.esc.rtserver.websocket.events;

import com.esc.rtserver.websocket.services.DashboardConnectionService;
import com.esc.rtserver.websocket.services.LiveSummaryConnectionService;
import com.esc.rtserver.websocket.state.DashboardUpdateState;
import com.esc.rtserver.websocket.state.LiveUpdateState;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

@Service
public class UnsubscribeEventListener implements ApplicationListener<SessionUnsubscribeEvent>
{
    final static Logger LOGGER = LoggerFactory.getLogger(UnsubscribeEventListener.class);

    @Autowired
    private LiveSummaryConnectionService liveSummaryConnectionService;

    @Autowired
    private DashboardConnectionService dashboardConnectionService;

    @Autowired
    private LiveUpdateState liveUpdateState;

    @Autowired
    private DashboardUpdateState dashboardUpdateState;


    @Override
    public void onApplicationEvent(SessionUnsubscribeEvent sessionUnsubscribeEvent)
    {
        String sessionId = (String) sessionUnsubscribeEvent.getMessage().getHeaders().get("simpSessionId");
        System.out.println("Unsubscribe:"+sessionId);

        if (liveSummaryConnectionService.checkSessions(sessionId)){
            liveSummaryConnectionService.removeSession(sessionId);
            LOGGER.info("**********Live Summary: Unsubscribed client successfully removed from client store**********");
            if (liveSummaryConnectionService.getSessionsSize() == 0){
                liveUpdateState.setState(false);
                LOGGER.info("**********Live Update scheduler state set to false**********");
            }
        }


        if (dashboardConnectionService.checkSessions(sessionId)){
            dashboardConnectionService.removeSession(sessionId);
            LOGGER.info("**********Dashboard: Unsubscribed client successfully removed from client store**********");
            if (dashboardConnectionService.getSessionsSize() == 0){
                dashboardUpdateState.setState(false);
                LOGGER.info("**********Dashboard Update scheduler state set to false**********");
            }
        }

    }
}
