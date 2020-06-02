package com.esc.rtserver.models;


import java.math.BigDecimal;

public class ReportDetailsModel {
    private String transactionPartner;
    private String totalValue;
    private BigDecimal transactionCount;
    private BigDecimal totalVolume;
    private BigDecimal successCount;
    private BigDecimal failedCount;
    private BigDecimal pendingCount;
    private String successAmount;
    private String failedAmount;
    private String pendingAmount;
    private String sendOrReceive;

    public String getTransactionPartner() {
        return transactionPartner;
    }

    public void setTransactionPartner(String transactionPartner) {
        this.transactionPartner = transactionPartner;
    }

    public String getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(String totalValue) {
        this.totalValue = totalValue;
    }

    public BigDecimal getTransactionCount() {
        return transactionCount;
    }

    public void setTransactionCount(BigDecimal transactionCount) {
        this.transactionCount = transactionCount;
    }

    public BigDecimal getTotalVolume() {
        return totalVolume;
    }

    public void setTotalVolume(BigDecimal totalVolume) {
        this.totalVolume = totalVolume;
    }

    public BigDecimal getSuccessCount() {
        return successCount;
    }

    public void setSuccessCount(BigDecimal successCount) {
        this.successCount = successCount;
    }

    public BigDecimal getFailedCount() {
        return failedCount;
    }

    public void setFailedCount(BigDecimal failedCount) {
        this.failedCount = failedCount;
    }

    public BigDecimal getPendingCount() {
        return pendingCount;
    }

    public void setPendingCount(BigDecimal pendingCount) {
        this.pendingCount = pendingCount;
    }

    public String getSuccessAmount() {
        return successAmount;
    }

    public void setSuccessAmount(String successAmount) {
        this.successAmount = successAmount;
    }

    public String getFailedAmount() {
        return failedAmount;
    }

    public void setFailedAmount(String failedAmount) {
        this.failedAmount = failedAmount;
    }

    public String getPendingAmount() {
        return pendingAmount;
    }

    public void setPendingAmount(String pendingAmount) {
        this.pendingAmount = pendingAmount;
    }

    public String getSendOrReceive() {
        return sendOrReceive;
    }

    public void setSendOrReceive(String sendOrReceive) {
        this.sendOrReceive = sendOrReceive;
    }

    @Override
    public String toString() {
        return "ReportDetailsModel{" +
                "transactionPartner='" + transactionPartner + '\'' +
                ", totalValue='" + totalValue + '\'' +
                ", transactionCount=" + transactionCount +
                ", totalVolume=" + totalVolume +
                ", successCount=" + successCount +
                ", failedCount=" + failedCount +
                ", pendingCount=" + pendingCount +
                ", successAmount='" + successAmount + '\'' +
                ", failedAmount='" + failedAmount + '\'' +
                ", pendingAmount='" + pendingAmount + '\'' +
                ", sendOrReceive='" + sendOrReceive + '\'' +
                '}';
    }
}

