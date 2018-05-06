package com.fzk.exercise.manage.dao;

import com.fzk.exercise.manage.model.Place;

import java.util.List;

public interface PlaceMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Place record);

    int insertSelective(Place record);

    Place selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Place record);

    int updateByPrimaryKey(Place record);

    int insertPlace(Place place);

    List<Place> list(Place place);
}