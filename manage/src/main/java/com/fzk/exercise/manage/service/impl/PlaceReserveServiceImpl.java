package com.fzk.exercise.manage.service.impl;

import com.fzk.exercise.manage.common.ResponseCode;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.dao.PlaceReserveMapper;
import com.fzk.exercise.manage.model.PlaceReserve;
import com.fzk.exercise.manage.service.IPlaceReserveService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 16:57 2018/4/19
 */
@Service("iPlaceReserveService")
public class PlaceReserveServiceImpl implements IPlaceReserveService {

    @Autowired
    private PlaceReserveMapper placeReserveMapper;


    public ServerResponse saveOrUpdatePlace(PlaceReserve placeReserve){
        if (placeReserve!=null){
            if (placeReserve.getId()!=null){
                int rowCount = placeReserveMapper.updateByPrimaryKeySelective(placeReserve);
                if (rowCount>0){
                    return ServerResponse.createBySuccessMessage("更新场地成功");
                }
                return ServerResponse.createByErrorMessage("更新场地失败");
            }else {
                placeReserve.setUseStatus(0);
                int rowCount = placeReserveMapper.insertPlaceReserve(placeReserve);
                if (rowCount>0){
                    return ServerResponse.createBySuccessMessage("新增场地成功");
                }
                return ServerResponse.createByErrorMessage("新增场地失败");
            }
        }
        return ServerResponse.createByErrorMessage("新增或更新场地参数不正确");
    }

    public ServerResponse<PageInfo> search(PlaceReserve placeReserve, int pageNum, int pageSize){
        PageHelper.startPage(pageNum,pageSize);

        List<PlaceReserve> placeList = placeReserveMapper.list(placeReserve);
        PageInfo pageResult = new PageInfo(placeList);
        return ServerResponse.createBySuccess(pageResult);
    }


    public ServerResponse<String> delete(Integer Id){
        if (Id==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        PlaceReserve placeReserve = new PlaceReserve();
        placeReserve.setId(Id);
        placeReserve.setUseStatus(1);
        int rowCount = placeReserveMapper.updateByPrimaryKeySelective(placeReserve);
        if (rowCount>0){
            return ServerResponse.createBySuccessMessage("场地删除成功");
        }
        return ServerResponse.createByErrorMessage("场地删除失败");
    }
}
