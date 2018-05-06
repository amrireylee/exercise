
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

    // bootstrap table初始化
    $table.bootstrapTable({
        url: basePath+"manage/user_card/list.do",
        method:'get',
        queryParamsType:'', //传递参数（*）
        striped: true,
        search: false,
        searchOnEnterKey: true,
        showRefresh: true,
        showToggle: false,
        showColumns: true,
        minimumCountColumns: 2,
        showPaginationSwitch: false,
        clickToSelect: true,
        detailView: false,
        pagination: true,
        paginationLoop: false,
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        classes: 'table table-hover table-no-bordered',
        sidePagination: 'server',
        queryParams: queryParams, //参数
        //silentSort: false,
        smartDisplay: false,
        idField: 'id',
        sortName: 'id',
        sortOrder: 'desc',
        escape: true,
        maintainSelected: true,
        toolbar: '#toolbar',
        responseHandler: function(res) {
            return {
                "total": res.data.total,//总页数
                "rows": res.data.list   //数据
            };
        },
        columns: [
            /*{field: 'Number', title: '序号', halign: 'center', formatter: 'numberFormatter'},*/
            {field: 'id', title: '会员卡ID', valign: 'middle',align: 'center'},
            {field: 'userId', title: '用户ID', valign: 'middle',align: 'center',formatter : 'userIdFormatter'},
            {field: 'startTime', title: '开始时间', valign: 'middle',align: 'center'},
            {field: 'endTime', title: '截止时间', valign: 'middle',align: 'center'},
            {field: 'lostStatus', title: '挂失', valign: 'middle',align: 'center',formatter : 'lostStatusFormatter'},
            {field: 'useStatus', title: '可用', valign: 'middle',align: 'center',formatter : 'useStatusFormatter'},
            {field: 'action', title: '操作', valign: 'middle', align: 'left', formatter: 'actionFormatter', clickToSelect: false}
        ]
    }).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();//提示工具
        $('[data-toggle="popover"]').popover();//弹出框工具
    });

    $('#saveModal').on('hide.modal', function () {
        // 执行一些动作...
        $("#table").bootstrapTable('refresh');
    });



    $("#txt_card_start_time").datetimepicker({
        language: "zh-CN",
        autoclose: true,//选中之后自动隐藏日期选择框
        clearBtn: true,//清除按钮
        todayBtn: true,//今日按钮
        startView:2,
        minView:0,
        minuteStep:1,
        startDate:"2016-08-01",
        initialDate:new Date(),
        format: "yyyy-mm-dd hh:ii:ss"//日期格式
    }).on("click",function(){
        $("#txt_card_start_time").datetimepicker("setEndDate",$("#txt_card_end_time").val())
    });

    $("#txt_card_end_time").datetimepicker({
        language: "zh-CN",
        autoclose: true,//选中之后自动隐藏日期选择框
        clearBtn: true,//清除按钮
        todayBtn: true,//今日按钮
        startView:2,
        minView:0,
        minuteStep:1,
        startDate:"2016-08-01",
        initialDate:new Date(),
        format: "yyyy-mm-dd hh:ii:ss"//日期格式
    }).on("click",function(){
        $("#txt_card_end_time").datetimepicker("setStartDate",$("#txt_card_start_time").val())
    });


});

function queryParams(params) {  //bootstrapTable自带参数
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize : params.pageSize,   //页面大小
        pageNum : params.pageNumber,  //页码
        sort : params.sort,  //排序列名
        sortOrder : params.order,//排位命令（desc，asc）
        lostStatus : $('#txt_card_lost_status').val(),
        userId : $('#txt_card_user_id').val(),
        id : $('#txt_card_id').val(),
        useStatus : $('#txt_card_use').val(),
        startTimeFrom : $('#txt_card_start_time').val(),
        startTimeTo : $('#txt_card_end_time').val()
    };
    return temp;
}

//查看该卡用户信息
function userIdFormatter(index, row) {
    return [
        '<a class="btn btn-link" target="_blank" href='+row.userId+'"../../../admin/user/search-user.html?id=">'+row.userId+'</a>'
    ].join('');
}

function  lostStatusFormatter(value, row, index) {
    if(value === 0){
        return '<span class="label label-success">没有挂失</span>';
    }else if(value === "0"){
        return '<span class="label label-success">没有挂失</span>';
    }else if(value === 1){
        return '<span class="label label-danger">挂失</span>';
    }else if(value === "1"){
        return '<span class="label label-danger">挂失</span>';
    }
}

//useStatusFormatter
function  useStatusFormatter(value, row, index) {
    if(value === 0){
        return '<span class="label label-success">可用</span>';
    }else if(value === 1){
        return '<span class="label label-danger">不可用</span>';
    }
}

function actionFormatter(value, row, index) {
    var html = [];
    //console.info(row.activityStatus);
    html.push('<button id="btn_plus" type="button" class="btn btn-primary btn-sm" onclick="updateCardFun('+row.userId+')">',
        '<span class="icon-plus" aria-hidden="true"></span>续卡</button>');
    if(row.lostStatus === "0" || row.lostStatus === 0) {
        html.push('<button id="btn_lost" type="button" class="btn btn-primary btn-sm" onclick="lostCardFun('+row.id+')">',
            '<span class="icon-lock" aria-hidden="true"></span>挂失</button>');
    }
    if(row.lostStatus === "1" || row.lostStatus === 1) {
        html.push('<button id="btn_replace" type="button" class="btn btn-primary btn-sm" onclick="replaceCardFun('+row.id+')">',
            '<span class="icon-flag" aria-hidden="true"></span>补卡</button>');
    }
    html.push('<button id="btn_delete" type="button" class="btn btn-primary btn-sm" onclick="deleteCardFun('+row.id+')">',
        '<span class="icon-remove" aria-hidden="true"></span>退卡</button>');

    return html.join('');
}

function queryBtnFun(){
    $("#table").bootstrapTable('refresh');
}




//拼装表单数据
function buildReqData1(id){
    return JSON.stringify({
        id : id
    });
}


//续卡
function updateCardFun(id){
    window.location.href = basePath + "../../admin/usercard/update-card.html?userId="+id;


}
//挂失
function lostCardFun(id){
    var actionUrl = basePath+"manage/user_card/lost.do";
    $.ajax({
        url:actionUrl,
        dataType: "json",           //接受数据格式
        data:{
                cardId : id
            },
        type:"POST",
        async : false,
        success:function(data){
            if (data.status === 0) {
                JqueryConfirm.successConfirm(data.msg);
            } else if (data.status === 1) {
                JqueryConfirm.errorConfirm(data.msg);
            }
            queryBtnFun();
        },
        error:function(data){
            JqueryConfirm.errorConfirm(data.msg);
            queryBtnFun();
        }
    })
}
//补卡
function replaceCardFun(id){
    var actionUrl = basePath+"manage/user_card/replace.do";
    $.ajax({
        url:actionUrl,
        dataType: "json",           //接受数据格式
        data:{
            cardId : id
        },
        type:"POST",
        async : false,
        success:function(data){
            if (data.status === 0) {
                JqueryConfirm.successConfirm(data.msg);
            } else if (data.status === 1) {
                JqueryConfirm.errorConfirm(data.msg);
            }
            queryBtnFun();
        },
        error:function(data){
            JqueryConfirm.errorConfirm(data.msg);
            queryBtnFun();
        }
    })
}
//退卡
function deleteCardFun(id){
    var actionUrl = basePath+"manage/user_card/delete.do";
    $.ajax({
        url:actionUrl,
        dataType: "json",           //接受数据格式
        data:{
            cardId : id
        },
        type:"POST",
        async : false,
        success:function(data){
            if (data.status === 0) {
                JqueryConfirm.successConfirm(data.msg);
            } else if (data.status === 1) {
                JqueryConfirm.errorConfirm(data.msg);
            }
            queryBtnFun();
        },
        error:function(data){
            JqueryConfirm.errorConfirm(data.msg);
            queryBtnFun();
        }
    })
}
