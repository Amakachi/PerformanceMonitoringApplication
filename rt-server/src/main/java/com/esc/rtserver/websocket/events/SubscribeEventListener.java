package com.esc.rtserver.websocket.events;

import com.esc.rtserver.websocket.services.*;
import com.esc.rtserver.websocket.state.DashboardUpdateState;
import com.esc.rtserver.websocket.state.LiveUpdateState;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class SubscribeEventListener implements ApplicationListener<SessionSubscribeEvent> {

    final static Logger LOGGER = LoggerFactory.getLogger(SubscribeEventListener.class);

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private LiveSummaryConnectionService liveSummaryConnectionService;

    @Autowired
    private DashboardConnectionService dashboardConnectionService;

    @Autowired
    private LiveUpdateService liveUpdateService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private DashStatsService dashStatsService;

    @Autowired
    private DashboardUpdateState dashboardUpdateState;

    @Autowired
    private LiveUpdateState liveUpdateState;

    private static String transPartner;

    private static String partner;

    @Override
    public void onApplicationEvent(SessionSubscribeEvent sessionSubscribeEvent) {
        String sessionId = (String) sessionSubscribeEvent.getMessage().getHeaders().get("simpSessionId");
        String simpDestination = (String) sessionSubscribeEvent.getMessage().getHeaders().get("simpDestination");
        System.out.println("Subscribe: " + sessionId);
        System.out.println("Topic: " + simpDestination);
        String currDate = new SimpleDateFormat("dd-MMM-yyyy").format(new Date());
        System.out.println(currDate);

        // Live Summary page
        if (simpDestination.contains("/topic/liveupdate/")){
            String[] text = simpDestination.split("/");
            transPartner = text[text.length - 1];
            System.out.println("transPartner: "+transPartner);

            if (liveSummaryConnectionService.getSessionsSize() == 0) {
                liveUpdateState.setState(true);
                LOGGER.info("**********Live Update Scheduler state set to true**********");
            }
            liveSummaryConnectionService.addSession(sessionId, sessionSubscribeEvent);
            LOGGER.info("**********Live summary connected client successfully added to client store**********");
//            template.convertAndSend("/topic/liveupdate/" + transPartner,
//                                liveUpdateService.publishUpdate("01-JAN-2019","30-MAR-2020"));
            LOGGER.info("**********Live summary: Web Socket Client Subscription successful**********");
        }


        // Dashboard page
//        if (simpDestination.contains("/topic/dashboardupdate/")){
//
//            String[] text = simpDestination.split("/");
//
//            partner = text[text.length - 1];
//            if (partner.equals("dashstats") || partner.equals("trans")){
//                partner = "";
//            }
//
//            System.out.println("partner: "+partner);
//
//            if (dashboardConnectionService.getSessionsSize() == 0) {
//                dashboardUpdateState.setState(true);
//                LOGGER.info("**********Dashboard Update Scheduler state set to true**********");
//            }
//            dashboardConnectionService.addSession(sessionId, sessionSubscribeEvent);
//            LOGGER.info("**********Dashboard connected client successfully added to client store**********");
//            if (simpDestination.contains("trans")){
//                template.convertAndSend("/topic/dashboardupdate/trans/"+ partner, transactionService.publishUpdate(partner));
//            }
//            else {
//                template.convertAndSend("/topic/dashboardupdate/dashstats/"+ partner, dashStatsService.publishUpdate(partner));
//            }
//
//            LOGGER.info("**********Dashboard: Web Socket Client Subscription successful**********");
//        }
    }

//    @Scheduled(fixedDelay = 20000)
//    public void publishForLiveSummary() {
//        if (liveUpdateState.getState()) {
//            template.convertAndSend("/topic/liveupdate/" + transPartner,
//                    liveUpdateService.publishUpdate("01-JAN-2019","30-MAR-2020",transPartner));
//        }
//    }

//    @Scheduled(fixedDelay = 20000)
//    public void publishForDashboard() {
//        if (dashboardUpdateState.getState()) {
//            template.convertAndSend("/topic/dashboardupdate/dashstats/"+ partner, dashStatsService.publishUpdate(partner));
//        }
//    }
//
//    @Scheduled(fixedDelay = 20000)
//    public void publishForDashboardTrans() {
//        if (dashboardUpdateState.getState() && partner.equals("")) {
//            template.convertAndSend("/topic/dashboardupdate/trans/"+ partner, transactionService.publishUpdate(partner));
//        }
//    }


}
