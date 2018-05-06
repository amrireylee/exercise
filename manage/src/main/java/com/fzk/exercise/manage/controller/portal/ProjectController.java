package com.fzk.exercise.manage.controller.portal;

import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.Project;
import com.fzk.exercise.manage.service.IProjectService;
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
 * @Date: Created in 18:49 2018/4/12
 */
@Controller
@RequestMapping("/project/")
public class ProjectController {


    @Autowired
    private IProjectService iProjectService;

    @RequestMapping("detail.do")
    @ResponseBody
    public ServerResponse detail(@RequestBody Project project){
        return iProjectService.searchProject(project,1,1);

    }

    /**
     * 搜索
     * @param project
     * @param pageNum
     * @param pageSize
     * @return
     */
    @RequestMapping("list.do")
    @ResponseBody
    public ServerResponse<PageInfo> list(@RequestParam(value = "project",required = true) Project project,
                                         @RequestParam(value = "pageNum",defaultValue = "1") int pageNum,
                                         @RequestParam(value = "pageSize" ,defaultValue = "10") int pageSize){
        return iProjectService.searchProject(project,pageNum,pageSize);
    }

}
