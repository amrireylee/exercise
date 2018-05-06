package com.fzk.exercise.manage.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

public class CourseProjectDto {
    private Integer projectSum;

    private Integer courseSum;

    private Integer courseId;

    private String courseName;

    private String courseDesc;

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date startTime;

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date endTime;

    private Integer projectId;

    private String projectName;

    private Integer placeId;

    private Integer courseTime;

    private Integer userId;

    private String username;

    private BigDecimal money;

    private String img;

    public CourseProjectDto() {
    }

    public CourseProjectDto(Integer projectSum, Integer courseSum, Integer courseId, String courseName, String courseDesc, Date startTime, Date endTime, Integer projectId, String projectName, Integer placeId, Integer courseTime, Integer userId, String username, BigDecimal money, String img) {
        this.projectSum = projectSum;
        this.courseSum = courseSum;
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseDesc = courseDesc;
        this.startTime = startTime;
        this.endTime = endTime;
        this.projectId = projectId;
        this.projectName = projectName;
        this.placeId = placeId;
        this.courseTime = courseTime;
        this.userId = userId;
        this.username = username;
        this.money = money;
        this.img = img;
    }

    public Integer getProjectSum() {
        return projectSum;
    }

    public void setProjectSum(Integer projectSum) {
        this.projectSum = projectSum;
    }

    public Integer getCourseSum() {
        return courseSum;
    }

    public void setCourseSum(Integer courseSum) {
        this.courseSum = courseSum;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseDesc() {
        return courseDesc;
    }

    public void setCourseDesc(String courseDesc) {
        this.courseDesc = courseDesc;
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

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
}