
var  imgUri= '';

$(function() {

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

    $("#newStartDate").datetimepicker({
        language: "zh-CN",
        autoclose: true,//选中之后自动隐藏日期选择框
        clearBtn: true,//清除按钮
        todayBtn: true,//今日按钮
        startView: 2,
        minView: 0,
        minuteStep: 1,
        startDate: new Date(),
        initialDate: new Date(),
        format: "yyyy-mm-dd hh:ii:ss"//日期格式
    }).on("click", function () {
        $("#newStartDate").datetimepicker("setEndDate", $("#newEndDate").val())
    });

    $("#newEndDate").datetimepicker({
        language: "zh-CN",
        autoclose: true,//选中之后自动隐藏日期选择框
        clearBtn: true,//清除按钮
        todayBtn: true,//今日按钮
        startView: 2,
        minView: 0,
        minuteStep: 1,
        startDate: new Date(),
        initialDate: new Date(),
        format: "yyyy-mm-dd hh:ii:ss"//日期格式
    }).on("click", function () {
        $("#newEndDate").datetimepicker("setStartDate", $("#newStartDate").val())
    });
    // initFileInput("upload_file", basePath+"manage/course/img_upload.do");
    $('#upload_file').ace_file_input({
        style: 'well',
        btn_choose: '选择',
        btn_change: null,
        no_icon: 'icon-cloud-upload',
        droppable: true,
        thumbnail: 'small'//large | fit
        //,icon_remove:null//set null, to hide remove/reset button
        /**,before_change:function(files, dropped) {
						//Check an example below
						//or examples/file-upload.html
						return true;
					}*/
        /**,before_remove : function() {
						return true;
					}*/
        ,
        preview_error: function (filename, error_code) {
            //name of the file that failed
            //error_code values
            //1 = 'FILE_LOAD_FAILED',
            //2 = 'IMAGE_LOAD_FAILED',
            //3 = 'THUMBNAIL_FAILED'
            //alert(error_code);
        }

    }).on('change', function () {
        //console.log($(this).data('ace_input_files'));
        //console.log($(this).data('ace_input_method'));
    });

});

function ajaxFileUpload(){
    var fileObj = document.getElementById("upload_file").files[0]; // js 获取文件对象
    var formFile = new FormData();
    // formFile.append("action", "UploadVMKImagePath");
    formFile.append("upload_file", fileObj); //加入文件对象
    var data = formFile;
    $.ajax({
        url: basePath+"manage/course/img_upload.do",
        data: data,
        type: "Post",
        dataType: "json",
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        success: function (result) {
            imgUri = result.data.uri;
            alert("上传完成!");
        }
    });
}


/*---------------------------------*/

//拼装表单数据
function buildReqData(){
    var name = $("#newCourseName").val();
    var desc = $("#newCourseDesc").val();
    var projectId = $("#newProjectID").val();
    var startTime = $("#newStartDate").val();
    var endTime = $("#newEndDate").val();
    var placeId = $("#newPlaceId").val();
    var courseTime = $("#newCourseTime").val();
    var userId = $("#newUserId").val();
    var money = $("#newMoney").val();
    var img = imgUri;

    return JSON.stringify({
        name : name,
        desc : desc,
        projectId : projectId,
        startTime : startTime,
        endTime : endTime,
        placeId : placeId,
        courseTime : courseTime,
        userId : userId,
        money : money,
        img : img
    });
}


function saveCourseFun(){
    $("#saveCourseBtn").attr('disabled','disabled');
    if($("#saveCourseForm").valid()){
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
                    JqueryConfirm.successConfirm(data.msg,redirectCourseFun());
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

function redirectCourseFun(){
    window.location.href = basePath + "../../admin/course/search-course.html";
}
