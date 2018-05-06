

var validator = $("#login-form").validate({
    ignore:"",
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
        if(error.text() != "" && error.text() != null){
            $("#"+element.attr("name")+"_tip").text(error.text());
        }
    },
    rules:{
        //用户名
        loginUsername :{
            required:true,
            loginUsernameVali:true
        },
        //密码
        loginPassword : {
            required:true
        }

    },
    messages:{
        //用户名
        loginUsername:{
            required : usernameNotEmptyErrMsg
        },
        //密码
        loginPassword: {
            required:passwordNotEmptyErrMsg
        }
    }
});


$.validator.addMethod("loginUsernameVali", function (value, element) {
    var poin;
    $.ajax({
        type : "post",
        url : "/user/username_vali.do",
        dataType: "json",           //接受数据格式
        data : {username : $("#loginUsername").val()},
        async : false,
        success : function(data){
            poin = !data;
        },
        delay: 2000

    });
    return poin;
},usernameNotExistErrMsg);


//密码验证规则
$.validator.addMethod("passwordVali", function (value, element) {
    var length = value.length;
    if(length > 0){
        return loginUsernameRegex.test(value);
    }else{
        return true;
    }
},passwordValiErrMsg);


//拼装表单数据
function buildReqData(){
    //用户名
    var name = $("#loginUsername").val();
    //密码
    var password = $("#loginPassword").val();

    return JSON.stringify({
        username : name,
        password : password
    });
}

function login(){
    $("#loginBtn").attr('disabled','disabled');
    if($("#login-form").valid()){
        // 校验
        var actionUrl = basePath+"manage/user/login.do";
        //保存信息
        $.ajax({
            url:actionUrl,
            dataType: "json",
            data:buildReqData(),
            type:"post",
            contentType:"application/json;charset=UTF-8",
            async : false,
            success:function(data){
                $("#loginBtn").removeAttr('disabled');
                if (data.status === 0) {
                    JqueryConfirm.successConfirm(data.msg,redirectManageFun());
                }else if(data.status === 1){
                    JqueryConfirm.errorConfirm(data.msg);
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                $("#loginBtn").removeAttr('disabled');
            }
        })
    }else{
        $("#loginBtn").removeAttr('disabled');
    }
}

function redirectManageFun(){
    window.location.href = basePath + "admin/index.html";
}


/*----------------------------------*/
/*忘记密码验证*/


var userId = "";
var forgetPasswordValidator = $("#forget-password-form").validate({
    ignore:"",
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
        if(error.text() != "" && error.text() != null){
            $("#"+element.attr("name")+"_tip").text(error.text());
        }
    },
    rules:{
        //用户名
        forgetUsername :{
            required:true,
            forgetUsernameVali:true
        },
        //email
        forgetEmail : {
            required:true,
            emailVali:true
        },
        //forgetCode
        forgetCode : {
            required:true,
            CodeVali:true
        },
        //密码
        forgetPassword : {
            required:true
        },
        //两次密码一致性
        forgetNewPassword : {
            required:true,
            equalTo:"#forgetPassword"
        }

    },
    messages:{
        //用户名
        forgetUsername : {
            required : usernameNotEmptyErrMsg
        },
        //email
        forgetEmail : {
            required:emailNotEmptyErrMsg
        },
        //forgetCode
        forgetCode : {
            required:codeNotEmptyErrMsg
        },
        //密码
        forgetPassword : {
            required:passwordNotEmptyErrMsg
        },
        //两次密码一致性
        forgetNewPassword : {
            required:passwordNotEmptyErrMsg,
            equalTo:passwordNotRepeatErrMsg
        }
    }
});

$.validator.addMethod("forgetUsernameVali", function (value, element) {
    var poin;
    $.ajax({
        type : "post",
        url : "/user/username_vali.do",
        dataType: "json",           //接受数据格式
        data : {username : $("#forgetUsername").val()},
        async : false,
        success : function(data){
            poin = !data;
        },
        delay: 2000

    });
    return poin;
},usernameNotExistErrMsg);

//email验证规则
$.validator.addMethod("emailVali", function (value, element) {
    var length = value.length;
    if(length > 0){
        return emailRegex.test(value);
    }else{
        return true;
    }
},emailValiErrMsg);


//验证码验证规则
$.validator.addMethod("CodeVali", function (value, element) {
    var temp = false;
    $.ajax({
        type : "post",
        url : "/user/verify.do",
        dataType: "json",
        data : {
            sid : $("#forgetCode").val(),
            email : $("#forgetEmail").val()
        },
        async : false,
        success : function(data){
            console.info(data);
            console.info(data.status);
            console.info(temp);
            if (data.status===0){
                temp = true;
            }else{
                console.info(temp);
                temp = false;
            }
            // poin = data.status === 0;
            if (temp){
                userId = data.data;
            }else{
                userId = data.data;
            }
        },
        delay: 2000
    });
    console.info(temp);
    return temp;
},codeValiErrMsg);

//拼装表单数据
function forgetBuildReqData(){
    //用户名
    if (userId===null){
        $("#forgetUpdate").attr('disabled','disabled');

    }
    var getUserId = userId;
    //密码
    var password = $("#forgetPassword").val();

    return JSON.stringify({
        userId : getUserId,
        passwordNew : password
    });
}

function updatePassword(){
    $("#forgetUpdate").attr('disabled','disabled');
    if(forgetPasswordValidator.valid()){
        // 校验
        var actionUrl = basePath+"user/forget_reset_password.do";
        //保存信息
        $.ajax({
            type:"post",
            url:actionUrl,
            dataType: "json",
            data:forgetBuildReqData(),
            contentType:"application/json;charset=UTF-8",
            success:function(data){
                $("#forgetUpdate").removeAttr('disabled');
                if (data.status === 0) {
                    JqueryConfirm.successConfirm(data.msg,redirectLoginFun());
                }else if(data.status === 1){
                    JqueryConfirm.errorConfirm(data.msg);
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                $("#forgetUpdate").removeAttr('disabled');
            }
        })
    }else{
        $("#forgetUpdate").removeAttr('disabled');
    }
}

function pushCodeTo() {

    var InterValObj; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount;//当前剩余秒数

        curCount = count;
        //设置button效果，开始计时
        $("#pushCode").attr("disabled", "true");
        $("#pushCode").val(curCount);
        $("#pushCode").text(curCount);
        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
        //向后台发送处理数据
        $.ajax({
            type : "post",
            url : "/user/find_pwd.do",
            dataType: "json",           //接受数据格式
            data : {
                username : $("#forgetUsername").val(),
                email : $("#forgetEmail").val()
            },
            async : false,
            success : function(data){
                if(data.status===0){
                    $("#pushCode").val("发送成功！");
                    $("#pushCode").text("发送成功！");
                }
            }
        });

    //timer处理函数
    function SetRemainTime() {
        if (curCount === 0) {
            window.clearInterval(InterValObj);//停止计时器
            $("#pushCode").removeAttr("disabled");//启用按钮
            $("#pushCode").val("重新发送");
            $("#pushCode").text("重新发送");
        }
        else {
            curCount--;
            $("#pushCode").val("发送成功!"+curCount);
            $("#pushCode").text("发送成功!"+curCount);
        }
    }
   // $("#pushCode").attr('disabled','disabled');

}



/*--------------------------------------------*/
/*注册验证*/


var registerValidator = $("#register-form").validate({
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
        regUsername :{
            required:true,
            regUsernameVali:true
        },
        //email
        regEmail : {
            required:true,
            regEmailVali:true
        },
        //密码
        regPassword : {
            required:true
        },
        //两次密码一致性
        regNewPassword : {
            required:true,
            equalTo:"#regPassword"
        },
        regPhone : {
            PhoneVali:true
        },
        regAgree : {
            required:true,
            isSelect:true
        }

    },
    messages:{
        //用户名
        regUsername : {
            required : usernameNotEmptyErrMsg
        },
        //email
        regEmail : {
            required:emailNotEmptyErrMsg
        },
        //密码
        regPassword : {
            required:passwordNotEmptyErrMsg,
            passwordVali:true
        },
        //两次密码一致性
        regNewPassword : {
            required:passwordNotEmptyErrMsg,
            passwordVali:true,
            equalTo:passwordNotRepeatErrMsg
        },
        regPhone : {
            required:phoneNotEmptyErrMsg
        },
        regAgree : {
            required:agreementNotEmptyErrMsg
}
    }
});

//用户名验证规则
$.validator.addMethod("regUsernameVali", function (value, element) {
    var poin;
    $.ajax({
        type : "post",
        url : "/user/username_vali.do",
        dataType: "json",           //接受数据格式
        data : {username : $("#regUsername").val()},
        async : false,
        success : function(data){
            poin = data;
        },
        delay: 2000

    });
    return poin;
},usernameNotRepeatErrMsg);

//email验证规则
$.validator.addMethod("regEmailVali", function (value, element) {
    var length = value.length;
    if(length > 0){
        if(emailRegex.test(value)){
            var poin;
            $.ajax({
                type : "post",
                url : "/user/email_vali.do",
                data : {
                    email : $("#regEmail").val()
                },
                async : false,
                success : function(data){
                    poin = data;
                }
            });
            return poin;
        }
    }else{
        return true;
    }
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

$.validator.addMethod("isSelect",function(value,element){

    return element.checked

},agreementNotEmptyErrMsg);


//拼装表单数据
function registerBuildReqData(){
    //用户名
    var username = $("#regUsername").val();
    //邮箱
    var email = $("#regEmail").val();
    //密码
    var password = $("#regPassword").val();
    //phone
    var phone = $("#regPhone").val();


    return JSON.stringify({
        username : username,
        email : email,
        password : password,
        phone : phone
    });
}

function register(){
    $("#registerBtn").attr('disabled','disabled');
    if($("#register-form").valid()){
        // 校验
        var actionUrl = basePath+"user/register.do";
        //保存信息
        $.ajax({
            url:actionUrl,
            dataType: "json",
            data:registerBuildReqData(),
            type:"post",
            contentType:"application/json;charset=UTF-8",
            success:function(data){
                $("#registerBtn").removeAttr('disabled');
                if (data.status === 0) {
                    JqueryConfirm.successConfirm(data.msg,redirectLoginFun);
                }else if(data.status === 1){
                    JqueryConfirm.errorConfirm(data.msg);
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                $("#registerBtn").removeAttr('disabled');
            }
        })
    }else{
        $("#registerBtn").removeAttr('disabled');
    }
}


var v = jQuery("#register-form").validate({
    submitHandler: function(form) {
        jQuery(form).ajaxSubmit({
            target: "register-reset"
        });
    }
});

jQuery("#register-reset").click(function() {
    v.resetForm();
});

function redirectLoginFun(){
    show_box('login-box');
    return false;
}