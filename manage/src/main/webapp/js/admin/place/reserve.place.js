var userId='';
var placeId = '';
jQuery(function($) {
    placeId = $Utils.getUrlParameters().id;

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

    /* initialize the external events
        -----------------------------------------------------------------*/

    $('#external-events div.external-event').each(function() {

        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        var eventObject = {
            title: $.trim($(this).text()) // use the element's text as the event title
        };

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject);

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });

    });




    /* initialize the calendar
    -----------------------------------------------------------------*/

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();


    var calendar = $('#calendar').fullCalendar({
        buttonText: {
            prev: '<i class="icon-chevron-left"></i>',
            next: '<i class="icon-chevron-right"></i>'
        },

        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events:function(start, end, callback) {
            $.ajax({
                url: basePath+"manage/place_reserve/list.do",
                type: 'get',
                dataType: 'json',
                data: {
                    placeId : placeId,
                    // our hypothetical feed requires UNIX timestamps
                    startTimeFrom: new Date().format('YYYY-MM-dd hh:mm')
                },
                success: function(data) {
                    var events = [];
                    var list = data.data.list;
                    //console.log(salesData);
                    for(var i = 0;i<list.length;i++){
                        console.info(list[i].startTime);
                        events.push({
                            id : list[i].id,
                            title: list[i].name,
                            start: list[i].startTime, // will be parsed
                            end: list[i].endTime
                        });
                    }
                    callback(events);
                }
            });
        },
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!
        drop: function(date, allDay) { // this function is called when something is dropped

            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');
            var $extraEventClass = $(this).attr('data-class');


            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);

            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
            if($extraEventClass) copiedEventObject['className'] = [$extraEventClass];

            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                $(this).remove();
            }

        },
        selectable: true,
        selectHelper: true,
        select: function(start, end, allDay) {
            console.log('select触发的开始时间为：', start.format('YYYY-MM-dd hh:mm'));
            console.log('select触发的结束时间为：', end.format("YYYY-MM-dd hh:mm"));

            var allDayStatus = false;
            console.info(start.getTime()===end.getTime());
            console.info(start.getTime());
            console.info(end.getTime());
            if (start.getTime()===end.getTime()){
                allDayStatus = true;
                end = start.getTime()+ 24*60*60*1000-1;
            }
            /*var startTime = start.format('YYYY-MM-dd hh:mm');
            var endTime = end.format("YYYY-MM-dd hh:mm");*/
            bootbox.prompt("内容:", function(title) {
                if (title !== null) {
                    var params = JSON.stringify({name: title,
                        startTime : start.format('YYYY-MM-dd hh:mm'),
                        endTime : new Date(parseInt(end,10)).format("YYYY-MM-dd hh:mm"),
                        userId : userId,
                        placeId : placeId
                    });
                    $.ajax({
                        url:basePath+"manage/place_reserve/save.do",
                        type:"post",
                        data:params,
                        dataType: 'json',
                        async : false,
                        contentType:"application/json;charset=UTF-8",
                        success: function(res){
                            if(res.status === 0){
                                JqueryConfirm.successConfirm(res.msg);

                            }else{
                                JqueryConfirm.errorConfirm(data.msg);
                            }
                            $('#calendar').fullCalendar('renderEvent',
                                {
                                    title: title,
                                    start: start,
                                    end: end,
                                    allDay: allDayStatus
                                });
                        },
                        err:function(res){
                            JqueryConfirm.errorConfirm(data.msg);
                        }
                    });//insert
                }
            });
            calendar.fullCalendar('unselect');

        },
        eventClick: function(calEvent, jsEvent, view) {
            console.log('eventClick中选中Event的id属性值为：', calEvent.id);
            console.log('eventClick中选中Event的title属性值为：', calEvent.title);
            console.log('eventClick中选中Event的start属性值为：', calEvent.start.format('YYYY-MM-dd hh:mm'));
            console.log('eventClick中选中Event的end属性值为：', calEvent.end.format('YYYY-MM-dd hh:mm'));
            console.log('eventClick中选中Event的color属性值为：', calEvent.color);
            console.log('eventClick中选中Event的className属性值为：', calEvent.className);

            var form = $("<form class='form-inline'><label>修改 &nbsp;</label></form>");
            form.append("<input class='middle' autocomplete=off type=text value='" + calEvent.title + "' /> ");
            form.append("<button type='submit' class='btn btn-sm btn-success'><i class='icon-ok'></i> 保存</button>");

            var div = bootbox.dialog({
                message: form,

                buttons: {
                    "delete" : {
                        "label" : "<i class='icon-trash'></i> 删除",
                        "className" : "btn-sm btn-danger",
                        "callback": function() {
                            $.ajax({
                                url:basePath+"manage/place_reserve/delete.do",
                                dataType: "json",           //接受数据格式
                                data:JSON.stringify({
                                    id : calEvent.id
                                }),
                                type:"POST",
                                async : false,
                                success:function(data){
                                    if (data.status === 0) {
                                        JqueryConfirm.successConfirm(data.msg);
                                    } else if (data.status === 1) {
                                        JqueryConfirm.errorConfirm(data.msg);
                                    }
                                },
                                error:function(data){
                                    JqueryConfirm.errorConfirm(data.msg);
                                }
                            });
                            calendar.fullCalendar('removeEvents' , function(ev){
                                return (ev._id == calEvent._id);
                            })
                        }
                    } ,
                    "close" : {
                        "label" : "<i class='icon-remove'></i> 关闭",
                        "className" : "btn-sm"
                    }
                }

            });

            form.on('submit', function(){
                calEvent.title = form.find("input[type=text]").val();
                $.ajax({
                    url:basePath+"manage/place_reserve/save.do",
                    dataType: "json",
                    data:JSON.stringify({
                        id :calEvent.id,
                        name : calEvent.title
                    }),
                    type:"post",
                    contentType:"application/json;charset=UTF-8",
                    async : false,
                    success:function(data){
                        if (data.status === 0) {
                            JqueryConfirm.successConfirm(data.msg);
                        }else if(data.status === 1){
                            JqueryConfirm.errorConfirm(data.msg);
                        }
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                        JqueryConfirm.errorConfirm("错误");
                    }
                });
                calendar.fullCalendar('updateEvent', calEvent);
                div.modal("hide");
                return false;
            });


            //console.log(calEvent.id);
            //console.log(jsEvent);
            //console.log(view);

            // change the border color just for fun
            //$(this).css('border-color', 'red');

        }

    });


});