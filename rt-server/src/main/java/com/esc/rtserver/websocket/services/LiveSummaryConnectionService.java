package com.esc.rtserver.websocket.services;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LiveSummaryConnectionService {

    private final Map<String, SessionSubscribeEvent> sessions = new ConcurrentHashMap();

    public void addSession(String sessionId,SessionSubscribeEvent event) {
        sessions.put(sessionId, event);
    }

    public SessionSubscribeEvent getSession(String sessionid) {
        return sessions.get(sessionid);
    }

    public SessionSubscribeEvent removeSession(String sessionid) {
        return sessions.remove(sessionid);
    }

    public int getSessionsSize() {
        return sessions.size();
    }

    public boolean checkSessions(String sessionId){
        if (sessions.containsKey(sessionId)){
            return true;
        }
        return false;
    }

}
