package com.esc.rtserver.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
@PropertySource("classpath:integration.properties")
public class MailUtil {

    private final Environment environment;

    private final static Logger LOGGER = LoggerFactory.getLogger(MailUtil.class);

    @Autowired
    public MailUtil(Environment environment){
        this.environment = environment;
    }

    public String getOtpValidationTemplate(String firstName, String otpMessage) {

        String email = environment.getRequiredProperty("otpValidationEmail");
        LOGGER.info("++++++++ EMAIL TEMPLATE ++++++++" + email);

        return email.replace("{firstName}", firstName)
                .replace("{otpMessage}", otpMessage);
    }

    public static String confirmRegistration (String filePath, String actionUrl, String firstName, String userName, String password) {

        StringBuilder responseSB = new StringBuilder();
        LOGGER.info("++++++++ Show me Filepath ++++++++" + filePath);

        try {
            Files.lines(Paths.get(filePath), StandardCharsets.UTF_8).forEach(responseSB::append);
        } catch (IOException e) { e.printStackTrace();
            LOGGER.error("++++++++  Oops! Something went wrong ++++++++" + e);
        }

        return responseSB.toString().replace("[actionUrl]", actionUrl).replace("[firstName]", firstName).replace("[userName]", userName)
                .replace("[password]", password);
    }

    public static String notifySignUp (String url, String filePath, String username) {

        StringBuilder responseSB = new StringBuilder();

        LOGGER.info("++++++++ Show me Filepath ++++++++" + filePath);

        try {
            Files.lines(Paths.get(filePath), StandardCharsets.UTF_8).forEach(responseSB::append);
        } catch (IOException e) { e.printStackTrace();
            LOGGER.error("++++++++  Oops! Something went wrong ++++++++" + e);
        }

        return
                responseSB.toString().replace("[userName]", username)
                        .replace("[VerificationURL]",url);
    }
}
