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
            url : "/pub_flow_action?action=apply_online",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
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
            url : "/pub_flow_action?action=issueID",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
                    $('#submit_result').modal();
            },
        });
    });


    /*取消按钮点击事件*/
    $('.btn_cancel').click(function(){

        $(this).attr("disabled", true);

        /*要传递到后台的数据*/
        var data = new Object();
        data.id = $(this).parent().parent().find('.id').html();

        $.ajax({
            type : "post", 
            url : "/pub_flow_action?action=cancel",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
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
