
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


var registerValidator = $("#saveUserForm").validate({
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
        //用户名
        newUsername :{
            required:true,
            usernameVali:true,
            newUsernameVali:true
        },
        //email
        newEmail : {
            required:true,
            newEmailVali:true
        },
        //密码
        newPassword : {
            required:true,
            usernameVali:true
        },
        //两次密码一致性
        newPassword1 : {
            required:true,
            equalTo:"#newPassword"
        },
        newPhone : {
            PhoneVali:true
        }

    },
    messages:{
        //用户名
        newUsername : {
            required : usernameNotEmptyErrMsg
        },
        //email
        newEmail : {
            required:emailNotEmptyErrMsg
        },
        //密码
        newPassword : {
            required:passwordNotEmptyErrMsg,
            passwordVali:true
        },
        //两次密码一致性
        newPassword1 : {
            required:passwordNotEmptyErrMsg,
            passwordVali:true,
            equalTo:passwordNotRepeatErrMsg
        },
        newPhone : {
            required:phoneNotEmptyErrMsg
        }
    }
});


//验证规则

//用户名验证规则
$.validator.addMethod("usernameVali", function (value, element) {
    var length = value.length;
    if(length > 0){
        return loginUsernameRegex.test(value);
    }else{
        return true;
    }
},usernameValiErrMsg);


//用户名验证规则
$.validator.addMethod("newUsernameVali", function (value, element) {
    var poin;
    $.ajax({
        type : "post",
        url : "/user/username_vali.do",
        dataType: "json",           //接受数据格式
        data : {username : $("#newUsername").val()},
        async : false,
        success : function(data){
            poin = data;
        },
        delay: 2000

    });
    return poin;
},usernameNotRepeatErrMsg);


//email验证规则

//用户名验证规则
$.validator.addMethod("emailVali", function (value, element) {
    var length = value.length;
    if(length > 0){
        return emailRegex.test(value);
    }else{
        return true;
    }
},emailValiErrMsg);

$.validator.addMethod("newEmailVali", function (value, element) {
    var poin;
    $.ajax({
        type : "post",
        url : "/user/email_vali.do",
        data : {
            email : $("#newEmail").val()
        },
        async : false,
        success : function(data){
            poin = data;
        }
    });
    return poin;
},emailNotRepeatErrMsg);


//手机号码规则
$.validator.addMethod("PhoneVali", function (value, element) {
    var length = value.length;
    if(length > 0){
        return mobileOrGhRegex.test(value);
    }else{
        return true;
    }
},phoneValiErrMsg);


/*---------------------------------*/

//拼装表单数据
function buildReqData(){
    //账号
    var username = $("#newUsername").val();
    //密码
    var password = $("#newPassword").val();
    //邮箱
    var email = $("#newEmail").val();
    //手机号码
    var phone = $("#newPhone").val();

    return JSON.stringify({
        username : username,
        password : password,
        email : email,
        phone : phone,
        role : 0
    });
}


function saveUserFun(){
    $("#saveUserBtn").attr('disabled','disabled');
    if($("#saveUserForm").valid()){
        // 校验
        var actionUrl = basePath+"user/register.do";
        //保存信息
        $.ajax({
            url:actionUrl,
            data:buildReqData(),
            type:"post",
            contentType:"application/json;charset=UTF-8",
            success:function(data){
                $("#saveUserBtn").removeAttr('disabled');
                if (data.status === 0) {
                    JqueryConfirm.successConfirm(data.msg,redirectManageFun);
                }else if(data.status === 1){
                    JqueryConfirm.errorConfirm(data.msg);
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                $("#saveUserBtn").removeAttr('disabled');
            }
        })
    }else{
        $("#saveUserBtn").removeAttr('disabled');
    }
}

function redirectManageFun(){
    window.location.href = basePath + "admin/user/search-user.html";
}
