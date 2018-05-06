var id = '';
var imgPathPre = 'http://localhost:8080/img/';
$(function() {
    id = $Utils.getUrlParameters().courseId;
    fillDataFun(id);
    console.info(id);

    $.ajax({
        url:basePath+'manage/user/getUserInfo.do',
        type:'POST', //GET
        async:true,
        timeout:5000,    //超时时间
        dataType:'json',
        success:function(data){
            $("#loginUsername").text(data.data.username);
        }
    });
});


function fillDataFun(id){
    //请求展示数据
    if(id){
        $.ajax({
            type: "get",
            url: basePath + "manage/course/list.do",
            data: {
                id: id
            },
            dataType: "json",
            async : false,
            success: function (data) {
                if (data.status === 0 && data.data) {
                    courseList = data.data.list;
                    //console.log(salesData);
                    for(var i = 0;i<courseList.length;i++){
                        $("#editCourseId").val(courseList[i].courseId);
                        $("#editCourseName").val(courseList[i].courseName);
                        $("#editCourseDesc").val(courseList[i].courseDesc);
                        $("#editProjectId").val(courseList[i].projectId);
                        $("#startTime").val(courseList[i].startTime);
                        $("#endTime").val(courseList[i].endTime);
                        $("#editPlaceId").val(courseList[i].placeId);
                        $("#editCourseTime").val(courseList[i].courseTime);
                        $("#editCourseUserId").val(courseList[i].userId);
                        $("#editCourseMoney").val(courseList[i].money);
                        $("#editImg").html("<img src="+imgPathPre+courseList[i].img+" class='col-xs-10'>");

                    }
                }
            }
        });
    }

}


var Validator = $("#editCourseForm").validate({
    debug:true,
    ignore:"",
    onsubmit:true,
    //光标离开时校验
    onfocusout:function(element){
        $(element).valid();
    },
    //获取到焦点时去除错误提示信息
    onfocusin:function(element){
        if(this.settings.focusCleanup){
            $("#"+$(element).attr("name")+"_tip").text('');
        }
    },
    focusCleanup:true, //clear the error message when the error element get focus again.
    onkeyup:false,
    highlight: function(element, errorClass){
        /*$(element).fadeOut(function() {
            $(element).fadeIn();
        });*/
    },
    errorPlacement: function(error, element) {
        //element是form表单中出错的元素的jquery对象
        if(error.text() !== "" && error.text() !== null){
            $("#"+element.attr("name")+"_tip").text(error.text());
        }
    },
    rules:{
        editCourseName :{
            required:true,
            courseNameVali:true
        },
        editCourseDesc : {
            required:true,
            crojectDescVali:true
        }


    },
    messages:{
        editCourseName : {
            required : courseNameNotEmptyErrMsg
        },
        editCourseDesc : {
            required:courseDescNotEmptyErrMsg
        }
    }
});

$.validator.addMethod("courseNameVali", function (value, element) {
    var length = value.length;
    if(length > 0){
        return one2HundredStrRegex.test(value);
    }else{
        return true;
    }
},courseNameValiErrMsg);

$.validator.addMethod("courseDescVali", function (value, element) {
    var length = value.length;
    if(length > 0){
        return one2TwoHundredFortyStrRegex.test(value);
    }else{
        return true;
    }
},courseDescValiErrMsg);


/*---------------------------------*/

//拼装表单数据
function buildReqData(){
    //id
    var id = $("#editCourseId").val();
    var name = $("#editCourseName").val();
    var desc = $("#editCourseDesc").val();
    var projectId = $("#editProjectId").val();
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    var placeId = $("#editPlaceId").val();
    var courseTime = $("#editCourseTime").val();
    var userId = $("#editCourseUserId").val();
    var money = $("#editCourseMoney").val();

    return JSON.stringify({
        id : id,
        name : name,
        desc : desc,
        projectId : projectId,
        startTime : startTime,
        endTime : endTime,
        placeId : placeId,
        courseTime : courseTime,
        userId : userId,
        money : money
    });
}


function saveCourseFun(){
    $("#saveCourseBtn").attr('disabled','disabled');
    if($("#editCourseForm").valid()){
        // 校验
        var actionUrl = basePath+"manage/course/save.do";
        //保存信息
        $.ajax({
            url:actionUrl,
            dataType: "json",
            data:buildReqData(),
            type:"post",
            contentType:"application/json;charset=UTF-8",
            async : false,
            success:function(data){
                $("#saveCourseBtn").removeAttr('disabled');
                if (data.status === 0) {
                    JqueryConfirm.successConfirm(data.msg,redirectUserFun());
                }else if(data.status === 1){
                    JqueryConfirm.errorConfirm(data.msg);
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                $("#saveCourseBtn").removeAttr('disabled');
            }
        })
    }else{
        $("#saveCourseBtn").removeAttr('disabled');
    }
}

function redirectUserFun(){
    window.location.href = basePath + "../../admin/course/search-course.html";
}

function backBtnFun(){
    window.history.go(-1);
}