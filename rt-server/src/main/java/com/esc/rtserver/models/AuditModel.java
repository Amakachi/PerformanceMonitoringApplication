package com.esc.rtserver.models;


import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

import static javax.persistence.TemporalType.TIMESTAMP;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AuditModel<U>implements Serializable {

    public  AuditModel(){

    }

    public AuditModel(String remark, String approvalStatus, String rejectStatus, String deleteFlag) {
        this.remark = remark;
        this.approvalStatus = approvalStatus;
        this.rejectStatus = rejectStatus;
        this.deleteFlag = deleteFlag;

    }

    @CreatedBy
    protected String createdBy;
    @CreatedDate
    @Temporal(TIMESTAMP)
    protected Date creationDate;
    @LastModifiedBy
    protected String  lastModifiedBy;
    @LastModifiedDate
    @Temporal(TIMESTAMP)
    protected Date lastModifiedDate;

    @Column(name = "deletedBy")
    private String deletedBy;

    @Temporal(TIMESTAMP)
    @Column(name = "deleteDate")
    private Date deletedDate;

    @Column(name = "deleteFlag")
    private String deleteFlag = "N";

    @Column(name = "approvedBy")
    private String approvedBy = null;

    @Column(name = "approvalStatus")
    private String approvalStatus = "N";

    @Temporal(TIMESTAMP)
    @Column(name = "approvedDate")
    private Date approvedDate = null;

    @Column(name = "rejectedBy")
    private String rejectedBy = null;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "rejectDate")
    private Date rejectDate = null;

    @Column(name = "rejectStatus")
    private String rejectStatus = "N";

    @Column(name = "remark")
    private String remark;





    public String getCreatedBy() {
        return createdBy;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public String getDeletedBy() {
        return deletedBy;
    }

    public void setDeletedBy(String deletedBy) {
        this.deletedBy = deletedBy;
    }

    public Date getDeletedDate() {
        return deletedDate;
    }

    public void setDeletedDate(Date deletedDate) {
        this.deletedDate = deletedDate;
    }

    public String getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(String deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public String getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(String approvedBy) {
        this.approvedBy = approvedBy;
    }

    public Date getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(Date approvedDate) {
        this.approvedDate = approvedDate;
    }

    public String getRejectedBy() {
        return rejectedBy;
    }

    public void setRejectedBy(String rejectedBy) {
        this.rejectedBy = rejectedBy;
    }

    public Date getRejectDate() {
        return rejectDate;
    }

    public void setRejectDate(Date rejectDate) {
        this.rejectDate = rejectDate;
    }

    public String getRejectStatus() {
        return rejectStatus;
    }

    public void setRejectStatus(String rejectStatus) {
        this.rejectStatus = rejectStatus;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
