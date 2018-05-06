package com.fzk.exercise.manage.dto;

import java.math.BigDecimal;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 13:40 2018/4/12
 */
public class OrderItemDto {
    private Integer userId;

    private Long orderNo;

    private Integer projectId;

    private String projectName;

    private Integer courseId;

    private BigDecimal currentUnitPrice;

    public OrderItemDto() {

    }

    public OrderItemDto(Integer userId, Long orderNo, Integer projectId, String projectName, Integer courseId, BigDecimal currentUnitPrice){
        this.userId = userId;
        this.orderNo = orderNo;
        this.projectId = projectId;
        this.projectName = projectName;
        this.courseId = courseId;
        this.currentUnitPrice = currentUnitPrice;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Long getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Long orderNo) {
        this.orderNo = orderNo;
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

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public BigDecimal getCurrentUnitPrice() {
        return currentUnitPrice;
    }

    public void setCurrentUnitPrice(BigDecimal currentUnitPrice) {
        this.currentUnitPrice = currentUnitPrice;
    }

}
