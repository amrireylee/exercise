package com.fzk.exercise.manage.dao;

import com.fzk.exercise.manage.model.PlaceReserve;

import java.util.List;

public interface PlaceReserveMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(PlaceReserve record);

    int insertSelective(PlaceReserve record);

    PlaceReserve selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PlaceReserve record);

    int updateByPrimaryKey(PlaceReserve record);

    int insertPlaceReserve(PlaceReserve placeReserve);

    List<PlaceReserve> list(PlaceReserve placeReserve);
}