package com.esc.rtserver.websocket.controller;

import com.esc.rtserver.models.GenericProceduresModel;
import com.esc.rtserver.websocket.services.LiveUpdateService;
import com.esc.rtserver.websocket.state.LiveUpdateState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class LiveUpdateController {

    @Autowired
    private LiveUpdateService liveUpdateService;

    @Autowired
    private LiveUpdateState liveUpdateState;

//    @SubscribeMapping("/liveupdate/{id}")
//    public List<GenericProceduresModel> publishToTopic(@DestinationVariable String transPartner)
//    {
//        System.out.println("Subscribe mapping working");
//        liveUpdateState.setState(true);
//        return liveUpdateService.publishUpdate(transPartner);
//    }


}
