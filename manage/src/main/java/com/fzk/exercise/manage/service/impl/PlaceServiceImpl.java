package com.fzk.exercise.manage.service.impl;

import com.fzk.exercise.manage.common.ResponseCode;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.dao.PlaceMapper;
import com.fzk.exercise.manage.model.Place;
import com.fzk.exercise.manage.service.IPlaceService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 18:42 2018/4/11
 */
@Service("iPlaceService")
public class PlaceServiceImpl implements IPlaceService {

    @Autowired
    private PlaceMapper placeMapper;


    public ServerResponse saveOrUpdatePlace(Place place){
        if (place!=null){
            if (place.getId()!=null){
                int rowCount = placeMapper.updateByPrimaryKeySelective(place);
                if (rowCount>0){
                    return ServerResponse.createBySuccessMessage("更新场地成功");
                }
                return ServerResponse.createByErrorMessage("更新场地失败");
            }else {
                place.setDelFlag(0);
                int rowCount = placeMapper.insertPlace(place);
                if (rowCount>0){
                    return ServerResponse.createBySuccessMessage("新增场地成功");
                }
                return ServerResponse.createByErrorMessage("新增场地失败");
            }
        }
        return ServerResponse.createByErrorMessage("新增或更新场地参数不正确");
    }

    public ServerResponse<PageInfo> searchPlace(Place place, int pageNum, int pageSize){
        PageHelper.startPage(pageNum,pageSize);

        List<Place> placeList = placeMapper.list(place);
        PageInfo pageResult = new PageInfo(placeList);
        return ServerResponse.createBySuccess(pageResult);
    }


    public ServerResponse<String> delete(Integer placeId){
        if (placeId==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        Place place = new Place();
        place.setId(placeId);
        place.setDelFlag(1);
        int rowCount = placeMapper.updateByPrimaryKeySelective(place);
        if (rowCount>0){
            return ServerResponse.createBySuccessMessage("场地删除成功");
        }
        return ServerResponse.createByErrorMessage("场地删除失败");
    }

    public ServerResponse<String> enableOrDisableUse(Place place){
        if (place.getId()==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        int rowCount = placeMapper.updateByPrimaryKeySelective(place);
        if (rowCount>0){
            return ServerResponse.createBySuccessMessage("状态设置成功");
        }
        return ServerResponse.createByErrorMessage("状态设置失败");
    }
}
