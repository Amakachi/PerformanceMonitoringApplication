package com.esc.rtserver.models;

import java.math.BigDecimal;
import java.util.Date;

public class SearchTransactionsProcedureModel {
    private BigDecimal serial;
    private BigDecimal transactionId;
    private String senderId;
    private String receiverId;
    private String transactionDate;
    private String transactionChannel;
    private String receiveChannel;
    private String amount;
    private String sourceCurrency;
    private String destinationCurrency;
    private String sourceAffiliate;
    private String destinationAffiliate;
    private String transactionStatus;
    private String responseMessage;
    private String referenceNo;
    // private String partner;
    // private String externalReferenceNo;
    private String receiveDate;
    private String sendAmount;
    private String receiveAmount;

    public String getReceiveAmount() {
        return receiveAmount;
    }

    public void setReceiveAmount(String receiveAmount) {
        this.receiveAmount = receiveAmount;
    }

    public String getReferenceNo() {
        return referenceNo;
    }

    public void setReferenceNo(String referenceNo) {
        this.referenceNo = referenceNo;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public String getReceiveChannel() {
        return receiveChannel;
    }

    public void setReceiveChannel(String receiveChannel) {
        this.receiveChannel = receiveChannel;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getDestinationCurrency() {
        return destinationCurrency;
    }

    public void setDestinationCurrency(String destinationCurrency) {
        this.destinationCurrency = destinationCurrency;
    }

    public String getTransactionStatus() {
        return transactionStatus;
    }

    public void setTransactionStatus(String transactionStatus) {
        this.transactionStatus = transactionStatus;
    }

    public String getResponseMessage() {
        return responseMessage;
    }

    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }

    public BigDecimal getSerial() {
        return serial;
    }

    public void setSerial(BigDecimal serial) {
        this.serial = serial;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public BigDecimal getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(BigDecimal transactionId) {
        this.transactionId = transactionId;
    }

    public String getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(String transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getTransactionChannel() {
        return transactionChannel;
    }

    public void setTransactionChannel(String transactionChannel) {
        this.transactionChannel = transactionChannel;
    }

    public String getSourceCurrency() {
        return sourceCurrency;
    }

    public void setSourceCurrency(String sourceCurrency) {
        this.sourceCurrency = sourceCurrency;
    }

    // public String getPartner() {
    //     return partner;
    // }

    // public void setPartner(String partner) {
    //     this.partner = partner;
    // }

    // public String getExternalReferenceNo() {
    //     return externalReferenceNo;
    // }

    // public void setExternalReferenceNo(String externalReferenceNo) {
    //     this.externalReferenceNo = externalReferenceNo;
    // }

    public String getReceiveDate() {
        return receiveDate;
    }

    public void setReceiveDate(String receiveDate) {
        this.receiveDate = receiveDate;
    }

    public String getSendAmount() {
        return sendAmount;
    }

    public void setSendAmount(String sendAmount) {
        this.sendAmount = sendAmount;
    }

    public String getSourceAffiliate() {
        return sourceAffiliate;
    }

    public void setSourceAffiliate(String sourceAffiliate) {
        this.sourceAffiliate = sourceAffiliate;
    }

    public String getDestinationAffiliate() {
        return destinationAffiliate;
    }

    public void setDestinationAffiliate(String destinationAffiliate) {
        this.destinationAffiliate = destinationAffiliate;
    }

    @Override
    public String toString() {
        return "SearchTransactionsProcedureModel{" +
                "serial=" + serial +
                ", transactionId=" + transactionId +
                ", senderId='" + senderId + '\'' +
                ", receiverId='" + receiverId + '\'' +
                ", transactionDate='" + transactionDate + '\'' +
                ", transactionChannel='" + transactionChannel + '\'' +
                ", receiveChannel='" + receiveChannel + '\'' +
                ", amount='" + amount + '\'' +
                ", transactionStatus='" + transactionStatus + '\'' +
                ", responseMessage='" + responseMessage + '\'' +
                ", referenceNo='" + referenceNo + '\'' +
                // ", partner='" + partner + '\'' +
                // ", externalReferenceNo='" + externalReferenceNo + '\'' +
                ", receiveDate='" + receiveDate + '\'' +
                ", sendAmount=" + sendAmount +
                ", sourceAffiliate='" + sourceAffiliate + '\'' +
                ", destinationAffiliate='" + destinationAffiliate + '\'' +
                '}';
    }
}
