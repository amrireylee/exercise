package com.fzk.exercise.manage.dao;

import com.fzk.exercise.manage.model.Project;

import java.util.List;

public interface ProjectMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Project record);

    int insertSelective(Project record);

    Project selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Project record);

    int updateByPrimaryKey(Project record);

    int insertProject(Project project);

    List<Project> list(Project project);

}