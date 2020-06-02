package com.esc.rtserver.util;

import java.io.Serializable;

public class Response implements Serializable {
    private static final Long serialVersionUID = -8065466906283936954L;

    private String responseCode;
    private String responseMessage;

    public Response(){
        this.responseCode = "99";
        this.responseMessage = "Sorry, something went wrong...";
    }

    public Response(String responseCode, String responseMessage){
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
    }

    public String getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(String responseCode) {
        this.responseCode = responseCode;
    }

    public String getResponseMessage() {
        return responseMessage;
    }

    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }

    @Override
    public String toString() {
        return "Response{" +
                "responseCode='" + responseCode + '\'' +
                ", responseMessage='" + responseMessage + '\'' +
                '}';
    }
}
