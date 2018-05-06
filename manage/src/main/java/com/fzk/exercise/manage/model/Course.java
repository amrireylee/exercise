package com.fzk.exercise.manage.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

public class Course {

    //冗余字段，查询使用
    private BigDecimal moneyFrom;

    private BigDecimal moneyTo;

    private Integer id;

    private String name;

    private String desc;

    private Integer projectId;

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date startTime;

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date endTime;

    private Integer placeId;

    private Integer courseTime;

    private Integer userId;

    private BigDecimal money;

    private String img;

    private Integer delFlag;

    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createTime;

    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updateTime;

    public Course() {
    }

    public Course(Integer id, String name, String desc, Integer projectId, Date startTime, Date endTime, Integer placeId, Integer courseTime, Integer userId, BigDecimal money, String img, Integer delFlag, Date createTime, Date updateTime) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.projectId = projectId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.placeId = placeId;
        this.courseTime = courseTime;
        this.userId = userId;
        this.money = money;
        this.img = img;
        this.delFlag = delFlag;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public BigDecimal getMoneyFrom() {
        return moneyFrom;
    }

    public void setMoneyFrom(BigDecimal moneyFrom) {
        this.moneyFrom = moneyFrom;
    }

    public BigDecimal getMoneyTo() {
        return moneyTo;
    }

    public void setMoneyTo(BigDecimal moneyTo) {
        this.moneyTo = moneyTo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc == null ? null : desc.trim();
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Integer getPlaceId() {
        return placeId;
    }

    public void setPlaceId(Integer placeId) {
        this.placeId = placeId;
    }

    public Integer getCourseTime() {
        return courseTime;
    }

    public void setCourseTime(Integer courseTime) {
        this.courseTime = courseTime;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public BigDecimal getMoney() {
        return money;
    }

    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Integer getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Integer delFlag) {
        this.delFlag = delFlag;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        return "Course{" +
                "moneyFrom=" + moneyFrom +
                ", moneyTo=" + moneyTo +
                ", id=" + id +
                ", name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                ", projectId=" + projectId +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", placeId=" + placeId +
                ", courseTime=" + courseTime +
                ", userId=" + userId +
                ", money=" + money +
                ", img='" + img + '\'' +
                ", delFlag=" + delFlag +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                '}';
    }
}