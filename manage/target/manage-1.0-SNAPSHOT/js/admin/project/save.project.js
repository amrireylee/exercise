
var $table = $('#table');
var userId='';
$(function () {
    $(document).on('focus', 'input[type="text"]', function() {
        $(this).parent().find('label').addClass('active');
    }).on('blur', 'input[type="text"]', function() {
        if ($(this).val() === '') {
            $(this).parent().find('label').removeClass('active');
        }
    });

    $.ajax({
        url:basePath+'manage/user/getUserInfo.do',
        type:'POST', //GET
        async:true,
        timeout:5000,    //超时时间
        dataType:'json',
        success:function(data){
            userId = data.data.id;
            $("#loginUsername").text(data.data.username);
        }
    });
});


var Validator = $("#saveProjectForm").validate({
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
        newProjectName :{
            required:true,
            projectNameVali:true
        },
        newProjectDesc : {
            required:true,
            projectDescVali:true
        }


    },
    messages:{
        newProjectName : {
            required : projectNameNotEmptyErrMsg
        },
        newProjectDesc : {
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
    var name = $("#newProjectName").val();
    var desc = $("#newProjectDesc").val();

    return JSON.stringify({
        name : name,
        desc : desc
    });
}


function saveProjectFun(){
    $("#saveProjectBtn").attr('disabled','disabled');
    if($("#saveProjectForm").valid()){
        // 校验
        var actionUrl = basePath+"manage/project/save.do";
        //保存信息
        $.ajax({
            url:actionUrl,
            dataType: "json",
            data:buildReqData(),
            type:"post",
            async : false,
            contentType:"application/json;charset=UTF-8",
            success:function(data){
                $("#saveProjectBtn").removeAttr('disabled');
                if (data.status === 0) {
                    JqueryConfirm.successConfirm(data.msg,redirectManageFun());
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

function redirectManageFun(){
    window.location.href = basePath + "../../admin/project/search-project.html";
}
