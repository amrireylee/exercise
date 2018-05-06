package com.fzk.exercise.manage.model;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 10:28 2018/4/12
 */
public class Time {

    private Integer id;

    private String desc;

    public Time() {
    }

    public Time(Integer id, String desc) {
        this.id = id;
        this.desc = desc;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
