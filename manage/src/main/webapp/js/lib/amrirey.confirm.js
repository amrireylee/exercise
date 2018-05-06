/**
 * 提示框，现在包装的是jquery-confirm
 * 引用此插件需要使用jquery-confirm css js
 * <link rel="stylesheet" href="/plugins/jquery-confirm/jquery-confirm.min.css" />
 * amrirey 2018/01/04.
 */
(function() {
    window.JqueryConfirm = {
        /**
         * 成功样式提示框
         * @param promptMsg 提示信息
         * @param callback 回调事件
         */
    	successConfirm : function (promptMsg,callback) {
    		$.confirm({
    		    title: '提示语',
    		    content: promptMsg,
    		    type: 'blue',
    		    theme: 'material',
    		    buttons: {
    		    	ok: {
    		            text: '确定',
    		            btnClass: 'btn-blue',
    		            action: function(){
    		            	if(callback){
    		            		callback();
    		            	}
    		            }
    		        }
    		    }
    		});
        },
        /**
         * 错误提示框
         * @param promptMsg 提示信息
         */
        errorConfirm : function (promptMsg) {
        	$.confirm({
        	    title: '提示语',
        	    content: promptMsg,
        	    type: 'red',
        	    theme: 'material',
        	    buttons: {
        	    	ok: {
        	            text: '确定',
        	            btnClass: 'btn-red',
        	            action: function(){
        	            }
        	        }
        	    }
        	});
        },
    };
})()
