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
            url: basePath + "manage/user/list.do",
            data: {
                id: id
            },
            dataType: "json",
            async : false,
            success: function (data) {
                if (data.status === 0 && data.data) {
                    userList = data.data.list;
                    //console.log(salesData);
                    for(var i = 0;i<userList.length;i++){
                        $("#editUserId").val(userList[i].id);
                        $("#editUsername").val(userList[i].username);
                        $("#editEmail").val(userList[i].email);
                        $("#editPhone").val(userList[i].phone);
                    }
                }
            }
        });
    }

}


var registerValidator = $("#editUserForm").validate({
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
        editUsername :{
            required:true,
            usernameVali:true,
            newUsernameVali:true
        },
        //email
        editEmail : {
            required:true,
            newEmailVali:true
        },
        //密码
        editPassword : {
            required:true,
            usernameVali:true
        },
        //两次密码一致性
        editPassword1 : {
            required:true,
            equalTo:"#newPassword"
        },
        editPhone : {
            PhoneVali:true
        }

    },
    messages:{
        //用户名
        editUsername : {
            required : usernameNotEmptyErrMsg
        },
        //email
        editEmail : {
            required:emailNotEmptyErrMsg
        },
        //密码
        editPassword : {
            required:passwordNotEmptyErrMsg,
            passwordVali:true
        },
        //两次密码一致性
        editPassword1 : {
            required:passwordNotEmptyErrMsg,
            passwordVali:true,
            equalTo:passwordNotRepeatErrMsg
        },
        editPhone : {
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
    //id
    var userId = $("#editUserId").val();
    var username = $("#editUsername").val();
    var password = $("#editPassword").val();
    var email = $("#editEmail").val();
    var phone = $("#editPhone").val();

    return JSON.stringify({
        userId : userId,
        username : username,
        password : password,
        email : email,
        phone : phone
    });
}


function saveUserFun(){
    $("#saveUserBtn").attr('disabled','disabled');
    if($("#editUserForm").valid()){
        // 校验
        var actionUrl = basePath+"user/update_information.do";
        //保存信息
        $.ajax({
            url:actionUrl,
            dataType: "json",
            data:buildReqData(),
            type:"post",
            contentType:"application/json;charset=UTF-8",
            async : false,
            success:function(data){
                $("#saveUserBtn").removeAttr('disabled');
                if (data.status === 0) {
                    JqueryConfirm.successConfirm(data.msg,redirectUserFun());
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

function redirectUserFun(){
    window.location.href = basePath + "../../admin/user/search-user.html";
}
