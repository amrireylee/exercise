package com.fzk.exercise.manage.service.impl;

import com.fzk.exercise.manage.common.ResponseCode;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.dao.CourseMapper;
import com.fzk.exercise.manage.dao.OrderItemMapper;
import com.fzk.exercise.manage.dao.ProjectMapper;
import com.fzk.exercise.manage.dao.UserMapper;
import com.fzk.exercise.manage.dto.CourseProjectDto;
import com.fzk.exercise.manage.model.Course;
import com.fzk.exercise.manage.model.Project;
import com.fzk.exercise.manage.model.User;
import com.fzk.exercise.manage.service.ICourseService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 17:32 2018/4/11
 */
@Service("iCourseService")
public class CourseServiceImpl implements ICourseService {

    @Autowired
    private CourseMapper courseMapper;

    @Autowired
    private ProjectMapper projectMapper;

    @Autowired
    private UserMapper userMapper;


    @Autowired
    private OrderItemMapper orderItemMapper;

    public ServerResponse saveOrUpdateCourse(Course course){
        if (course!=null){
            if (course.getId()!=null){
                int rowCount = courseMapper.updateByPrimaryKeySelective(course);
                if (rowCount>0){
                    return ServerResponse.createBySuccessMessage("更新课程成功");
                }
                return ServerResponse.createByErrorMessage("更新课程失败");
            }else {
                course.setDelFlag(0);
                int rowCount = courseMapper.insertCourse(course);
                if (rowCount>0){
                    return ServerResponse.createBySuccessMessage("新增课程成功");
                }
                return ServerResponse.createByErrorMessage("新增课程失败");
            }
        }
        return ServerResponse.createByErrorMessage("新增或更新课程参数不正确");
    }

    public ServerResponse<PageInfo> searchCourse(Course course, int pageNum, int pageSize){
        PageHelper.startPage(pageNum,pageSize);

        List<Course> courseList = courseMapper.list(course);
        List<CourseProjectDto> courseProjectDtoList = Lists.newArrayList();
        for (Course item : courseList) {
            CourseProjectDto courseProjectDto = assembleCourseProjectDto(item);
            courseProjectDtoList.add(courseProjectDto);
        }

        PageInfo pageResult = new PageInfo(courseList);
        pageResult.setList(courseProjectDtoList);
        return ServerResponse.createBySuccess(pageResult);
    }

    private CourseProjectDto assembleCourseProjectDto(Course course){
        CourseProjectDto courseProjectDto = new CourseProjectDto();
        courseProjectDto.setCourseId(course.getId());
        courseProjectDto.setCourseName(course.getName());
        courseProjectDto.setCourseDesc(course.getDesc());
        courseProjectDto.setStartTime(course.getStartTime());
        courseProjectDto.setEndTime(course.getEndTime());
        courseProjectDto.setMoney(course.getMoney());
        courseProjectDto.setCourseTime(course.getCourseTime());
        courseProjectDto.setPlaceId(course.getPlaceId());
        courseProjectDto.setUserId(course.getUserId());

        User user = userMapper.selectById(course.getUserId());
        courseProjectDto.setUsername(user.getUsername());

        Project project = new Project();
        project.setId(course.getProjectId());
        List<Project> projectList = projectMapper.list(project);
        courseProjectDto.setProjectName(projectList.get(0).getName());
        courseProjectDto.setProjectId(projectList.get(0).getId());

        courseProjectDto.setImg(course.getImg());

        int projectSum= orderItemMapper.sumByProjectId(course.getProjectId());
        courseProjectDto.setProjectSum(projectSum);

        int courseSum= orderItemMapper.sumByCourseId(course.getId());
        courseProjectDto.setCourseSum(courseSum);

        return courseProjectDto;
    }


    public ServerResponse<String> delete(Integer courseId){
        if (courseId==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        Course course = new Course();
        course.setId(courseId);
        course.setDelFlag(1);
        int rowCount = courseMapper.updateByPrimaryKeySelective(course);
        if (rowCount>0){
            return ServerResponse.createBySuccessMessage("课程删除成功");
        }
        return ServerResponse.createByErrorMessage("课程删除失败");
    }
}
