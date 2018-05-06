package com.fzk.exercise.manage.dao;

import com.fzk.exercise.manage.model.Course;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CourseMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Course record);

    int insertSelective(Course record);

    Course selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Course record);

    int updateByPrimaryKey(Course record);

    List<Course> list(Course course);

    int insertCourse(Course course);

    List<Course> selectById(@Param("Ids") List<Integer> courseListIdsList);

}