package com.fzk.exercise.manage.service;

import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.UserCard;
import com.github.pagehelper.PageInfo;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 10:05 2018/4/11
 */
public interface IUserCardService {
    ServerResponse<PageInfo> list(UserCard userCard, int pageNum, int pageSize);

    ServerResponse<UserCard> addNewUserCard(UserCard userCard);

    ServerResponse<UserCard> lostUserCard(Integer cardId);

    ServerResponse<UserCard> replaceUserCard(Integer cardId);

    ServerResponse<UserCard> deleteUserCard(Integer cardId);


}
