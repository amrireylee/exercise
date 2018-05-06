var id = '';
$(function() {
    id = $Utils.getUrlParameters().id;
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
            url: basePath + "manage/project/list.do",
            data: {
                id: id
            },
            dataType: "json",
            async : false,
            success: function (data) {
                if (data.status === 0 && data.data) {
                    projectList = data.data.list;
                    //console.log(salesData);
                    for(var i = 0;i<projectList.length;i++){
                        $("#editProjectId").val(projectList[i].id);
                        $("#editProjectName").val(projectList[i].name);
                        $("#editProjectDesc").val(projectList[i].desc);
                    }
                }
            }
        });
    }

}


var Validator = $("#editProjectForm").validate({
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
        editProjectName :{
            required:true,
            projectNameVali:true
        },
        editProjectDesc : {
            required:true,
            projectDescVali:true
        }


    },
    messages:{
        editProjectName : {
            required : projectNameNotEmptyErrMsg
        },
        editProjectDesc : {
            required:projectDescNotEmptyErrMsg
        }
    }
});

$.validator.addMethod("projectNameVali", function (value, element) {
    var length = value.length;
    if(length > 0){
        return one2HundredStrRegex.test(value);
    }else{
        return true;
    }
},projectNameValiErrMsg);

$.validator.addMethod("projectDescVali", function (value, element) {
    var length = value.length;
    if(length > 0){
        return one2TwoHundredFortyStrRegex.test(value);
    }else{
        return true;
    }
},projectDescValiErrMsg);


/*---------------------------------*/

//拼装表单数据
function buildReqData(){
    //id
    var id = $("#editProjectId").val();
    var name = $("#editProjectName").val();
    var desc = $("#editProjectDesc").val();

    return JSON.stringify({
        id : id,
        name : name,
        desc : desc
    });
}


function saveProjectFun(){
    $("#saveProjectBtn").attr('disabled','disabled');
    if($("#editProjectForm").valid()){
        // 校验
        var actionUrl = basePath+"manage/project/save.do";
        //保存信息
        $.ajax({
            url:actionUrl,
            dataType: "json",
            data:buildReqData(),
            type:"post",
            contentType:"application/json;charset=UTF-8",
            async : false,
            success:function(data){
                $("#saveProjectBtn").removeAttr('disabled');
                if (data.status === 0) {
                    JqueryConfirm.successConfirm(data.msg,redirectUserFun());
                }else if(data.status === 1){
                    JqueryConfirm.errorConfirm(data.msg);
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                $("#saveProjectBtn").removeAttr('disabled');
            }
        })
    }else{
        $("#saveProjectBtn").removeAttr('disabled');
    }
}

function redirectUserFun(){
    window.location.href = basePath + "../../admin/project/search-project.html";
}
