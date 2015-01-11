$(document).ready(function(){

    $('input[type=radio],input[type=checkbox]').uniform();

    /*用户申请上线按钮点击事件*/
    $('.btn_apply_online').click(function(){
        $(this).attr("disabled", true);

        /*要传递到后台的数据*/
        var data = new Object();
        data.id = $(this).parent().parent().find('.id').html();

        $.ajax({
            type : "post", 
            url : "/pub_flow_action?action=issueID",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();
            },
        });
    });

    /*填写issueid按钮点击事件*/
    $('.btn_issue_id').click(function(){
        $(this).attr("disabled", true);

        /*要传递到后台的数据*/
        var data = new Object();
        data.id = $(this).parent().parent().find('.id').html();
        data.issueID = $('#issueID').val();

        $.ajax({
            type : "post", 
            url : "/sub_flow_action/issueID",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();
            },
        });
    });


    /*取消按钮点击事件*/
    $('.btn_cancel').click(function(){

        /*要传递到后台的数据*/
        var data = new Object();
        data.id = $(this).parent().parent().find('.id').html();

        $.ajax({
            type : "post", 
            url : "/sub_flow_action/cancel",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();
            },
        });
    });

    //用户申请跳过work流程点击事件
    $('.btn-skipWork').click(function(){

        /*要传递到后台的数据*/
        var data = new Object();
        data.id = $(this).parent().parent().find('.id').html();

        $.ajax({
            type : "post", 
            url : "/sub_flow_action/apply_skip_work",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();
            },
        });

    });

    /*
    //提交并确认后自动跳转到我的发布
    $('#submit_result').on('hidden', function() {
        window.location.href = "/my_pub";
        
    });
    */

});
