package com.fzk.exercise.manage.service;

import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.Project;
import com.github.pagehelper.PageInfo;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 17:07 2018/4/11
 */
public interface IProjectService {
    ServerResponse saveOrUpdateProject(Project project);

    ServerResponse<PageInfo> searchProject(Project project, int pageNum, int pageSize);

    ServerResponse<String> delete(Integer projectId);
}
