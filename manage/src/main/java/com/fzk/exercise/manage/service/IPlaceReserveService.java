package com.fzk.exercise.manage.service;

import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.PlaceReserve;
import com.github.pagehelper.PageInfo;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 16:57 2018/4/19
 */
public interface IPlaceReserveService {
    ServerResponse saveOrUpdatePlace(PlaceReserve placeReserve);

    ServerResponse<PageInfo> search(PlaceReserve placeReserve, int pageNum, int pageSize);

    ServerResponse<String> delete(Integer Id);
}
