package com.fzk.exercise.manage.controller.portal;

import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.Place;
import com.fzk.exercise.manage.service.IPlaceService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 17:40 2018/4/12
 */
@Controller
@RequestMapping("/place/")
public class PlaceController {
    @Autowired
    private IPlaceService iPlaceService;

    @RequestMapping("detail.do")
    @ResponseBody
    public ServerResponse detail(@RequestBody Place place){
        return iPlaceService.searchPlace(place,1,1);

    }

    /**
     * 搜索
     * @param place
     * @param pageNum
     * @param pageSize
     * @return
     */
    @RequestMapping("list.do")
    @ResponseBody
    public ServerResponse<PageInfo> list(@RequestParam(value = "place",required = true) Place place,
                                         @RequestParam(value = "pageNum",defaultValue = "1") int pageNum,
                                         @RequestParam(value = "pageSize" ,defaultValue = "10") int pageSize){
        return iPlaceService.searchPlace(place,pageNum,pageSize);
    }
}
