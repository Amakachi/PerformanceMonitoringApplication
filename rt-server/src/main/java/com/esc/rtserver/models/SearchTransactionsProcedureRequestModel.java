package com.esc.rtserver.models;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class SearchTransactionsProcedureRequestModel {
    private String senderId;
    private String receiverId;
    private Double transId;
    private String partner;
    private String startDate;
    private String endDate;
    private BigDecimal recordLimit;
    private String searchText;
    private String referenceNo;
    private String transactionChannel;
    private String status;
    private String sendOrReceive;

    public String getSendOrReceive() {
        return sendOrReceive;
    }

    public void setSendOrReceive(String sendOrReceive) {
        this.sendOrReceive = sendOrReceive;
    }

    public String getReferenceNo() {
        return referenceNo;
    }

    public void setReferenceNo(String referenceNo) {
        this.referenceNo = referenceNo;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public Double getTransId() {
        return transId;
    }

    public void setTransId(Double transId) {
        this.transId = transId;
    }

    public String getPartner() {
        return partner;
    }

    public void setPartner(String partner) {
        this.partner = partner;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getRecordLimit() {
        return recordLimit;
    }

    public void setRecordLimit(BigDecimal recordLimit) {
        this.recordLimit = recordLimit;
    }

    public String getSearchText() {
        return searchText;
    }

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    public String getTransactionChannel() {
        return transactionChannel;
    }

    public void setTransactionChannel(String transactionChannel) {
        this.transactionChannel = transactionChannel;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "SearchTransactionsProcedureRequestModel{" +
                "senderId='" + senderId + '\'' +
                ", receiverId='" + receiverId + '\'' +
                ", transId=" + transId +
                ", partner='" + partner + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", recordLimit=" + recordLimit +
                ", searchText='" + searchText + '\'' +
                ", referenceNo='" + referenceNo + '\'' +
                ", transactionChannel='" + transactionChannel + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}

