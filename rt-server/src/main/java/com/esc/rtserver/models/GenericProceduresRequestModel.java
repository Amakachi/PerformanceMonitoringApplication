package com.esc.rtserver.models;

public class GenericProceduresRequestModel {

    private String partner;
    private String startDate;
    private String endDate;
    private String sourceAffiliate;
    private String destinationAffiliate;
    private String transactionChannel;
    private String sendOrReceive;
    private String ddOrMmOrYy;
    private String affiliate;

    public String getAffiliate() {
        return affiliate;
    }

    public void setAffiliate(String affiliate) {
        this.affiliate = affiliate;
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

    public String getTransactionChannel() {
        return transactionChannel;
    }

    public void setTransactionChannel(String transactionChannel) {
        this.transactionChannel = transactionChannel;
    }

    public String getSendOrReceive() {
        return sendOrReceive;
    }

    public void setSendOrReceive(String sendOrReceive) {
        this.sendOrReceive = sendOrReceive;
    }

    public String getDdOrMmOrYy() {
        return ddOrMmOrYy;
    }

    public void setDdOrMmOrYy(String ddOrMmOrYy) {
        this.ddOrMmOrYy = ddOrMmOrYy;
    }


    @Override
    public String toString() {
        return "GenericProceduresRequestModel{" +
                "partner='" + partner + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", sourceAffiliate='" + sourceAffiliate + '\'' +
                ", destinationAffiliate='" + destinationAffiliate + '\'' +
                ", transactionChannel='" + transactionChannel + '\'' +
                ", sendOrReceive='" + sendOrReceive + '\'' +
                ", ddOrMmOrYy='" + ddOrMmOrYy + '\'' +
                ", affiliate='" + affiliate + '\'' +
                '}';
    }
}