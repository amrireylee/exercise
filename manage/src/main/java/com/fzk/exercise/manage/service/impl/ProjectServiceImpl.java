package com.fzk.exercise.manage.service.impl;

import com.fzk.exercise.manage.common.ResponseCode;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.dao.ProjectMapper;
import com.fzk.exercise.manage.model.Project;
import com.fzk.exercise.manage.service.IProjectService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 17:07 2018/4/11
 */
@Service("iProjectService")
public class ProjectServiceImpl implements IProjectService {

    @Autowired
    private ProjectMapper projectMapper;

    public ServerResponse saveOrUpdateProject(Project project){
        if (project!=null){
            if (project.getId()!=null){
                int rowCount = projectMapper.updateByPrimaryKeySelective(project);
                if (rowCount>0){
                    return ServerResponse.createBySuccessMessage("更新项目成功");
                }
                return ServerResponse.createByErrorMessage("更新项目失败");
            }else {
                project.setDelFlag(0);
                int rowCount = projectMapper.insertProject(project);
                if (rowCount>0){
                    return ServerResponse.createBySuccessMessage("新增项目成功");
                }
                return ServerResponse.createByErrorMessage("新增项目失败");
            }
        }
        return ServerResponse.createByErrorMessage("新增或更新项目参数不正确");
    }

    public ServerResponse<PageInfo> searchProject(Project project,int pageNum, int pageSize){
        PageHelper.startPage(pageNum,pageSize);

        List<Project> productList = projectMapper.list(project);
        PageInfo pageResult = new PageInfo(productList);
        return ServerResponse.createBySuccess(pageResult);
    }


    public ServerResponse<String> delete(Integer projectId){
        if (projectId==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        Project project = new Project();
        project.setId(projectId);
        project.setDelFlag(1);
        int rowCount = projectMapper.updateByPrimaryKeySelective(project);
        if (rowCount>0){
            return ServerResponse.createBySuccessMessage("项目删除成功");
        }
        return ServerResponse.createByErrorMessage("项目删除失败");
    }
}
