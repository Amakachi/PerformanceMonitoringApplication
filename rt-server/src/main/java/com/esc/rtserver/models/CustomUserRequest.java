package com.esc.rtserver.models;

import com.esc.rtserver.entities.Role;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.List;

public class CustomUserRequest {
    private String email;
    private String firstName;
    private String lastName;
    private String username;
    private String userAffiliate;
    private String password;
    private String accessiblePartners;
    private String phoneNumber;
    private String contactAddress;
    private String role;
    private List<String> accessRight;
    private String approvalStatus;
    private String deleteFlag;
    private String RejectStatus;
    private String remark;


    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getContactAddress() {
        return contactAddress;
    }

    public void setContactAddress(String contactAddress) {
        this.contactAddress = contactAddress;
    }

    public String getRejectStatus() {
        return RejectStatus;
    }

    public void setRejectStatus(String rejectStatus) {
        RejectStatus = rejectStatus;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public String getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(String deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getAccessiblePartners() {
        return accessiblePartners;
    }

    public void setAccessiblePartners(String accessiblePartners) {
        this.accessiblePartners = accessiblePartners;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<String> getAccessRight() {
        return accessRight;
    }

    public void setAccessRight(List<String> accessRight) {
        this.accessRight = accessRight;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserAffiliate() {
        return userAffiliate;
    }

    public void setUserAffiliate(String userAffiliate) {
        this.userAffiliate = userAffiliate;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
