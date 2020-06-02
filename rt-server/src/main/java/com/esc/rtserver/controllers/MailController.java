package com.esc.rtserver.controllers;

import com.esc.rtserver.util.EmailPayload;
import com.esc.rtserver.util.MailAgent;
import com.esc.rtserver.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MailController {

    @Autowired
    MailAgent mailAgent;

    @PostMapping(value = "/generateAndSendEmail")
    public ResponseEntity<com.esc.rtserver.util.Response> generateAndSendEmail(@RequestBody EmailPayload request) throws Exception {
        Response details = mailAgent.generateAndSendEmail(request.getHtmlTemplate(), request.getReceiver());
        return ResponseEntity.ok(details);
    }
}
