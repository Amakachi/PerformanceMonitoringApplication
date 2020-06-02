package com.esc.rtserver.models;

import java.math.BigDecimal;

public class TransactionRespCountModel {
    private String responseCode;
    private String responseMessage;
    private BigDecimal errorCount;
    private BigDecimal responsePercentage;
    private  String sendOrReceive;
    private  BigDecimal responseCount;
    private String responseValue;
    private String transactionChannel;

    public String getTransactionChannel() {
        return transactionChannel;
    }

    public void setTransactionChannel(String transactionChannel) {
        this.transactionChannel = transactionChannel;
    }

    public BigDecimal getResponseCount() {
        return responseCount;
    }

    public void setResponseCount(BigDecimal responseCount) {
        this.responseCount = responseCount;
    }

    public String getResponseValue() {
        return responseValue;
    }

    public void setResponseValue(String responseValue) {
        this.responseValue = responseValue;
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

    public BigDecimal getErrorCount() {
        return errorCount;
    }

    public void setErrorCount(BigDecimal errorCount) {
        this.errorCount = errorCount;
    }

    public BigDecimal getResponsePercentage() {
        return responsePercentage;
    }

    public void setResponsePercentage(BigDecimal responsePercentage) {
        this.responsePercentage = responsePercentage;
    }

    public String getSendOrReceive() {
        return sendOrReceive;
    }

    public void setSendOrReceive(String sendOrReceive) {
        this.sendOrReceive = sendOrReceive;
    }

    @Override
    public String toString() {
        return "TransactionRespCountModel{" +
                "responseCode='" + responseCode + '\'' +
                ", responseMessage='" + responseMessage + '\'' +
                ", errorCount=" + errorCount +
                ", responsePercentage=" + responsePercentage +
                ", sendOrReceive='" + sendOrReceive + '\'' +
                ", responseCount=" + responseCount +
                ", responseValue='" + responseValue + '\'' +
                '}';
    }
}
