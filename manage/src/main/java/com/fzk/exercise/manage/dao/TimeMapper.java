package com.fzk.exercise.manage.dao;

import com.fzk.exercise.manage.model.Time;

import java.util.List;

public interface TimeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Time time);

    int insertSelective(Time record);

    Time selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Time record);

    int updateByPrimaryKey(Time record);

    List<Time> list(Time time);
}