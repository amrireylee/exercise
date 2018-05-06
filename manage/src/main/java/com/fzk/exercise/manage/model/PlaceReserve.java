package com.fzk.exercise.manage.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class PlaceReserve {

    //冗余字段。供查询使用
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    private Date startTimeFrom;

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    private Date startTimeTo;

    private Integer id;

    private Integer placeId;

    private String name;

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date startTime;

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date endTime;

    private Integer useStatus;

    private Integer userId;

    public PlaceReserve(Integer id, Integer placeId, String name, Date startTime, Date endTime, Integer useStatus, Integer userId) {
        this.id = id;
        this.placeId = placeId;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.useStatus = useStatus;
        this.userId = userId;
    }

    public PlaceReserve() {
        super();
    }


    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    public Date getStartTimeFrom() {
        return startTimeFrom;
    }

    public void setStartTimeFrom(Date startTimeFrom) {
        this.startTimeFrom = startTimeFrom;
    }

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    public Date getStartTimeTo() {
        return startTimeTo;
    }

    public void setStartTimeTo(Date startTimeTo) {
        this.startTimeTo = startTimeTo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPlaceId() {
        return placeId;
    }

    public void setPlaceId(Integer placeId) {
        this.placeId = placeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Integer getUseStatus() {
        return useStatus;
    }

    public void setUseStatus(Integer useStatus) {
        this.useStatus = useStatus;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}