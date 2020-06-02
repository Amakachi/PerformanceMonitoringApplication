package com.esc.rtserver.models;

public class Remark {
    public String remark;

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public String toString() {
        return "Remark{" +
                "remark='" + remark + '\'' +
                '}';
    }
}
