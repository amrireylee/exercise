
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
        url: basePath+"manage/user/list.do",
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
            {field: 'vipStatus', title: '是否办卡', valign: 'middle',align: 'center',formatter : 'vipStatusFormatter'},
            {field: 'id', title: '用户ID', valign: 'middle',align: 'center',formatter : 'idFormatter'},
            {field: 'username', title: '用户名', valign: 'middle',align: 'center'},
            {field: 'email', title: '邮箱', valign: 'middle',align: 'center'},
            {field: 'phone', title: '手机号码', valign: 'middle',align: 'center'},
            {field: 'role', title: '用户角色', valign: 'middle',align: 'center',formatter : 'roleFormatter'},
            {field: 'action', title: '操作', valign: 'middle', align: 'left', formatter: 'actionFormatter', clickToSelect: false}
        ]
    }).on('all.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();//提示工具
        $('[data-toggle="popover"]').popover();//弹出框工具
    });

    $('#saveModal').on('hide.bs.modal', function () {
        // 执行一些动作...
        $("#table").bootstrapTable('refresh');
    });

});

function queryParams(params) {  //bootstrapTable自带参数
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize : params.pageSize,   //页面大小
        pageNum : params.pageNumber,  //页码
        sort : params.sort,  //排序列名
        sortOrder : params.order,//排位命令（desc，asc）
        vipStatus : $('#txt_vip_status').val(),
        username : $('#txt_search_name').val(),
        id : $('#txt_search_id').val(),
        role : $('#txt_role').val()
    };
    return temp;
}

//todo 目前不需要
function idFormatter(index, row) {
    return [
        '<a class="btn btn-link" target="_blank" href='+row.id+'"../../../admin/user/search-user.html?id=">'+row.id+'</a>'
    ].join('');
}

function  vipStatusFormatter(value, row, index) {
    if(value === 0){
        return '<span class="label label-success">已办理</span>';
    }else if(value === "0"){
        return '<span class="label label-success">已办理</span>';
    }else if(value === 1){
        return '<span class="label label-default">未办理</span>';
    }else if(value === "1"){
        return '<span class="label label-default">未办理</span>';
    }
}

//roleFormatter
function  roleFormatter(value, row, index) {
    if(value === 0){
        return '<span class="label label-success">管理员</span>';
    }else if(value === 1){
        return '<span class="label label-default">会员</span>';
    }
}

function actionFormatter(value, row, index) {
    var html = [];
    //console.info(row.activityStatus);
    if(row.vipStatus === "1" || row.vipStatus === 1) {
        html.push('<button id="btn_save" type="button" class="btn btn-primary btn-sm" onclick="saveCardFun('+row.id+')">',
            '<span class="icon-zoom-in" aria-hidden="true"></span>发卡</button>');
    }
    html.push('<button id="btn_edit" type="button" class="btn btn-primary btn-sm" onclick="editUserFun('+row.id+')">',
        '<span class="icon-edit" aria-hidden="true"></span>编辑</button>');
    html.push('<button id="btn_detail" type="button" class="btn btn-primary btn-sm" onclick="receiveUserFun('+row.id+')">',
        '<span class="icon-zoom-in" aria-hidden="true"></span>查看</button>');

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


//编辑用户
function editUserFun(id){
    window.location.href = basePath + "../../admin/user/user-edit.html?id="+id;
}
//查看用户
function receiveUserFun(id){
    window.location.href = basePath + "../../admin/user/user-detail.html?id="+id;
}
//发卡
function saveCardFun(id){
    window.location.href = basePath + "../../admin/usercard/save-card.html?userId="+id;
}


function saveUserFun(){
    window.location.href = basePath + "../../admin/user/save-user.html";
}