package com.esc.rtserver.util;


//import com.ecobank.report.mobile4_models.shared.EmailPayLoad;

import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.TrustStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;


import javax.net.ssl.SSLContext;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;

@Component
@PropertySource("classpath:integration.properties")
public class MailAgent {

    private final static Logger LOGGER = LoggerFactory.getLogger(MailAgent.class);
    private final Environment environment;

    public MailAgent(Environment environment){
        this.environment = environment;
    }

    @Value("${mailServer}")
    String URL;

    public Response generateAndSendEmail(String htmlTemplate, String receiver) throws Exception{
        System.out.println("HTML TEMPLATE +++" + htmlTemplate);
        EmailPayload request = new EmailPayload();

        String[] emails = {receiver};

        request.setSenderAddress(environment.getRequiredProperty("emailSenderAddress"));
        request.setSenderDisplayName("Ecobank");
        request.setSubject("RT_Settlement Monitoring/Report");
        request.setEmails(emails);
        request.setMessage(htmlTemplate);

        Response response = new Response();
        try{
            HttpHeaders requestHeaders = new HttpHeaders();
            requestHeaders.setContentType(MediaType.APPLICATION_JSON);
            requestHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            HttpEntity<EmailPayload> requestEntity = new HttpEntity<>(request, requestHeaders);
            System.out.println("XML +++" + requestEntity.getBody());
            ResponseEntity<Response> responseEntity = getRestTemplate().postForEntity(URL, requestEntity, Response.class);

            if (responseEntity.hasBody()) {
                System.out.println("MAIL RESPONSE ++++" + responseEntity.toString());
                System.out.println("MAIL ENTITY BODY ++++" + responseEntity.getBody());
                return responseEntity.getBody();
            }
        }catch (HttpClientErrorException e) {
            System.out.println("Status code " + e.getStatusCode() + " Status Message = " + e.getResponseBodyAsString());
            ResponseEntity.BodyBuilder builder;
            builder = ResponseEntity.status(e.getStatusCode());
            response.setResponseCode(e.getStatusCode().toString());
            response.setResponseMessage(builder.toString());
            return response;
        }catch (Exception e){
            e.printStackTrace();
            ResponseEntity.BodyBuilder builder;
            builder = ResponseEntity.status(500);
            response.setResponseCode("500");
            response.setResponseMessage(builder.toString());
            return response;
        }
        return new Response("99", "Oops... Something Happened. Failed to send Mail!");
    }

    private RestTemplate getRestTemplate() throws NoSuchAlgorithmException, KeyManagementException, KeyStoreException {

        TrustStrategy acceptingTrustStrategy = (x509Certificates, s) -> true;
        SSLContext sslContext = org.apache.http.ssl.SSLContexts.custom().loadTrustMaterial(null, acceptingTrustStrategy)
                .build();
        SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(sslContext, new NoopHostnameVerifier());
        CloseableHttpClient httpClient = HttpClients.custom().setSSLSocketFactory(csf).build();
        HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
        requestFactory.setHttpClient(httpClient);
        return new RestTemplate(requestFactory);
    }
}
