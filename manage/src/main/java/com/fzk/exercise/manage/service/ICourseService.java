package com.fzk.exercise.manage.service;

import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.Course;
import com.github.pagehelper.PageInfo;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 17:32 2018/4/11
 */
public interface ICourseService {

    ServerResponse saveOrUpdateCourse(Course course);

    ServerResponse<PageInfo> searchCourse(Course course, int pageNum, int pageSize);

    ServerResponse<String> delete(Integer courseId);

}
