package com.fzk.exercise.manage.controller.backend;

import com.fzk.exercise.manage.common.Const;
import com.fzk.exercise.manage.common.ResponseCode;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.Course;
import com.fzk.exercise.manage.model.User;
import com.fzk.exercise.manage.service.ICourseService;
import com.fzk.exercise.manage.service.IUserService;
import com.google.common.collect.Maps;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 14:14 2018/4/13
 */
@Controller
@RequestMapping("/manage/course/")
public class CourseManageController {

    Logger logger = LoggerFactory.getLogger(CourseManageController.class);

    @Autowired
    private ICourseService iCourseService;

    @Autowired
    private IUserService iUserService;

    @RequestMapping(value = "save.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse save(HttpSession session,@RequestBody Course course){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iCourseService.saveOrUpdateCourse(course);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "get_detail.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse getDetail(HttpSession session,@RequestBody Course course){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");

        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iCourseService.searchCourse(course,1,1);
        }else{
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "list.do",method = RequestMethod.GET)
    @ResponseBody
    public ServerResponse getList(HttpSession session,
                                  Course course,
                                  @RequestParam(value = "pageNum",defaultValue = "1") int pageNum,
                                  @RequestParam(value = "pageSize",defaultValue = "10") int pageSize)
    {
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");

        }
        if (iUserService.checkAdminRole(user).isSuccess()){
//            添加分页
            return iCourseService.searchCourse(course,pageNum,pageSize);
        }else{
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "delete.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse delete(HttpSession session,Course course){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iCourseService.delete(course.getId());
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    /**
     * 文件上传
     * @param session
     * @param file
     * @param request
     * @return
     */
    @RequestMapping(value = "img_upload.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse upLoad(HttpSession session,
                                 @RequestParam(value = "upload_file",required = false) MultipartFile file,
                                 HttpServletRequest request){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            Map fileMap = Maps.newHashMap();
            //如果文件不为空，写入上传路径
            if(!file.isEmpty()) {
                //上传文件路径

                String path = "F:" + File.separator + "apache-tomcat-8.0.47" + File.separator + "upload" +File.separator + "images";
                //上传文件名
                String fileName = file.getOriginalFilename();
                //扩展名
                String fileExtensionName = fileName.substring(fileName.lastIndexOf(".")+1);
                String uploadFileName = UUID.randomUUID().toString()+"."+fileExtensionName;
                File fileDir = new File(path);
                if (!fileDir.exists()){
                    fileDir.setWritable(true);//可写权限
                    fileDir.mkdirs();
                }
                File targetFile = new File(path,uploadFileName);

                try {
                    //上传文件的关键方法transferTo
                    file.transferTo(targetFile);
                    //文件上传成功
                } catch (IOException e) {
                    logger.error("上传文件异常",e);
                    e.printStackTrace();
                    return null;
                }
                fileMap.put("uri",targetFile.getName());
                fileMap.put("url",targetFile.getAbsolutePath());
            } else {
                return ServerResponse.createByErrorMessage("上传失败");
            }
            return ServerResponse.createBySuccess(fileMap);
        }else{
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }


}
