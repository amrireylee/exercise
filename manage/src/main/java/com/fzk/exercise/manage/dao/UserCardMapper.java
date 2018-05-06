package com.fzk.exercise.manage.dao;

import com.fzk.exercise.manage.model.UserCard;

import java.util.List;

public interface UserCardMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(UserCard record);

    int insertSelective(UserCard record);

    UserCard selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserCard record);

    int updateByPrimaryKey(UserCard record);

    List<UserCard> list(UserCard userCard);

    int grantCard(UserCard userCard);

    int updateCard(UserCard userCard);

    int cardLostStatus(Integer id);

    int cardUseStatus(Integer id);

    int cardDelStatus(Integer id);
}