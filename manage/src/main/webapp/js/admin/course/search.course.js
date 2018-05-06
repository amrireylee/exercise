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
        url: basePath+"manage/course/list.do",
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
            {field: 'courseId', title: '课程ID', valign: 'middle',align: 'center',formatter : 'idFormatter'},
            {field: 'courseName', title: '课程名称', valign: 'middle',align: 'center'},
            {field: 'courseDesc', title: '课程描述', valign: 'middle',align: 'center'},
            {field: 'startTime', title: '开始时间', valign: 'middle',align: 'center'},
            {field: 'endTime', title: '结束时间', valign: 'middle',align: 'center'},
            {field: 'projectName', title: '项目名称', valign: 'middle',align: 'center'},
            {field: 'courseTime', title: '课时', valign: 'middle',align: 'center'},
            {field: 'placeId', title: '场地ID', valign: 'middle',align: 'center',formatter : 'placeIdFormatter'},
            {field: 'username', title: '教练名字', valign: 'middle',align: 'center'},
            {field: 'money', title: '价格/元', valign: 'middle',align: 'center'},
            {field: 'projectSum', title: '项目选择次数', valign: 'middle',align: 'center'},
            {field: 'courseSum', title: '课程选择次数', valign: 'middle',align: 'center'},
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
        id : $('#txt_search_id').val(),
        placeId : $('#txt_search_place_id').val(),
        projectId : $('#txt_search_project_id').val(),
        desc : $('#txt_search_desc').val(),
        moneyFrom : $('#txt_search_moneyFrom').val(),
        moneyTo : $('#txt_search_moneyTo').val()
    };
    return temp;
}

//todo 目前不需要
function idFormatter(index, row) {
    return [
        '<a class="btn btn-link" target="_blank" href='+row.courseId+'"../../../admin/user/search-user.html?id=">'+row.courseId+'</a>'
    ].join('');
}

function actionFormatter(value, row, index) {
    var html = [];
    //console.info(row.activityStatus);
    html.push('<button id="btn_edit" type="button" class="btn btn-primary btn-sm" onclick="editCourseFun('+row.courseId+')">',
        '<span class="icon-edit" aria-hidden="true"></span>编辑</button>');
    html.push('<button id="btn_receive" type="button" class="btn btn-primary btn-sm" onclick="receiveCourseFun('+row.courseId+')">',
        '<span class="icon-zoom-in" aria-hidden="true"></span>查看</button>');
    html.push('<button id="btn_delete" type="button" class="btn btn-primary btn-sm" onclick="deleteCourseFun('+row.courseId+')">',
        '<span class="icon-edit" aria-hidden="true"></span>删除</button>');

    return html.join('');
}

function placeIdFormatter(index, row) {
    return [
        '<a class="btn btn-link" target="_blank" href='+row.placeId+'"../../../admin/user/search-user.html?id=">'+row.placeId+'</a>'
    ].join('');
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
function editCourseFun(id){
    window.location.href = basePath + "../../admin/course/edit-course.html?courseId="+id;
}
//查看项目
function receiveCourseFun(id){
    window.location.href = basePath + "../../admin/course/detail-course.html?courseId="+id;
}
//删除
function deleteCourseFun(id){
    var actionUrl = basePath+"manage/course/delete.do";
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

function saveCourseFun(){
    window.location.href = basePath + "../../admin/course/save-course.html";
}