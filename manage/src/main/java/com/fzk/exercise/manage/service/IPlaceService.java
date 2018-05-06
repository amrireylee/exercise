package com.fzk.exercise.manage.service;

import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.Place;
import com.github.pagehelper.PageInfo;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 18:42 2018/4/11
 */
public interface IPlaceService {
    ServerResponse saveOrUpdatePlace(Place place);

    ServerResponse<PageInfo> searchPlace(Place place, int pageNum, int pageSize);

    ServerResponse<String> delete(Integer placeId);

    ServerResponse<String> enableOrDisableUse(Place place);
}
