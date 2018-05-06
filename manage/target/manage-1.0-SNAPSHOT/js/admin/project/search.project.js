
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
        url: basePath+"manage/project/list.do",
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
            {field: 'id', title: '项目ID', valign: 'middle',align: 'center',formatter : 'idFormatter'},
            {field: 'name', title: '项目名称', valign: 'middle',align: 'center'},
            {field: 'desc', title: '项目描述', valign: 'middle',align: 'center'},
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
        name : $('#txt_search_name').val(),
        id : $('#txt_search_id').val()
    };
    return temp;
}

//todo 目前不需要
function idFormatter(index, row) {
    return [
        '<a class="btn btn-link" target="_blank" href='+row.id+'"../../../admin/user/search-user.html?id=">'+row.id+'</a>'
    ].join('');
}

function actionFormatter(value, row, index) {
    var html = [];
    //console.info(row.activityStatus);
    html.push('<button id="btn_edit" type="button" class="btn btn-primary btn-sm" onclick="editProjectFun('+row.id+')">',
        '<span class="icon-edit" aria-hidden="true"></span>编辑</button>');
    html.push('<button id="btn_receive" type="button" class="btn btn-primary btn-sm" onclick="receivProjectFun('+row.id+')">',
        '<span class="icon-zoom-in" aria-hidden="true"></span>查看</button>');
    html.push('<button id="btn_delete" type="button" class="btn btn-primary btn-sm" onclick="deleteProjectFun('+row.id+')">',
        '<span class="icon-edit" aria-hidden="true"></span>删除</button>');

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


//编辑项目
function editProjectFun(id){
    window.location.href = basePath + "../../admin/project/project-edit.html?id="+id;
}
//查看项目
function receivProjectFun(id){
    window.location.href = basePath + "../../admin/project/project-detail.html?id="+id;
}
//删除
function deleteProjectFun(id){
    var actionUrl = basePath+"manage/project/delete.do";
    $.ajax({
        url:actionUrl,
        dataType: "json",           //接受数据格式
        data:{
            id : id
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

function saveProjectFun(){
    window.location.href = basePath + "../../admin/project/save-project.html";
}