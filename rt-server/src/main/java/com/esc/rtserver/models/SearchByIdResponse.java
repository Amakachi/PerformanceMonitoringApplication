package com.esc.rtserver.models;

import java.math.BigDecimal;

public class SearchByIdResponse {

    private BigDecimal tranId;
    private String externalRef;
    private String sourceAffiliate;
    private String sendAmount;
    private String sourceCurrency;
    private String receiveAmount;
    private String receiveDate;
    private String destinationCurrency;
    private String queueState;

    public BigDecimal getTranId() {
        return tranId;
    }

    public void setTranId(BigDecimal tranId) {
        this.tranId = tranId;
    }

    public String getExternalRef() {
        return externalRef;
    }

    public void setExternalRef(String externalRef) {
        this.externalRef = externalRef;
    }

    public String getSourceAffiliate() {
        return sourceAffiliate;
    }

    public void setSourceAffiliate(String sourceAffiliate) {
        this.sourceAffiliate = sourceAffiliate;
    }

    public String getSendAmount() {
        return sendAmount;
    }

    public void setSendAmount(String sendAmount) {
        this.sendAmount = sendAmount;
    }

    public String getSourceCurrency() {
        return sourceCurrency;
    }

    public void setSourceCurrency(String sourceCurrency) {
        this.sourceCurrency = sourceCurrency;
    }

    public String getReceiveAmount() {
        return receiveAmount;
    }

    public void setReceiveAmount(String receiveAmount) {
        this.receiveAmount = receiveAmount;
    }

    public String getReceiveDate() {
        return receiveDate;
    }

    public void setReceiveDate(String receiveDate) {
        this.receiveDate = receiveDate;
    }

    public String getDestinationCurrency() {
        return destinationCurrency;
    }

    public void setDestinationCurrency(String destinationCurrency) {
        this.destinationCurrency = destinationCurrency;
    }

    public String getQueueState() {
        return queueState;
    }

    public void setQueueState(String queueState) {
        this.queueState = queueState;
    }
}
