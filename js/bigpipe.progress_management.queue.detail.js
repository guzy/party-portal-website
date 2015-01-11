function getCommonTime()
{
    return (new Date(new Date().getTime())).toLocaleString();
}

$(document).ready(function(){

    $('input[type=radio],input[type=checkbox]').uniform();

    /*OP准入按钮点击事件*/
    $('#btn_op_pass').click(function(){

        $('#btn_op_pass').text('正在提交...');
        $('#btn_op_pass').attr("disabled", true);
        $('#btn_op_refuse').attr("disabled", true);

        /*要传递到后台的数据*/
        var data = new Object();

        /*准备数据*/
        data.id = $('#id').val();
        data.OPComment = getCommonTime() + ': ' + $('#Comment').val() + '; ';
        data.queueName = $('#queueName').val();
        data.status = 304;//OP确认通过，等待OP开通queue权限 

        $.ajax({
            type : "post", 
            url : "/queue_flow_action/verify",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

                    $('#btn_op_pass').text('OP通过');
                    $('#btn_op_pass').attr("disabled", false);
                    $('#btn_op_refuse').attr("disabled", false);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
                    $('#submit_result').modal();

                    $('#btn_op_pass').text('OP通过');
                    $('#btn_op_pass').attr("disabled", false);
                    $('#btn_op_refuse').attr("disabled", false);
            },
        });
    });

    /*OP拒绝按钮点击事件*/
    $('#btn_op_refuse').click(function(){

        $('#btn_op_refuse').text('正在提交...');
        $('#btn_op_pass').attr("disabled", true);
        $('#btn_op_refuse').attr("disabled", true);

        /*要传递到后台的数据*/
        var data = new Object();

        /*准备数据*/
        data.id = $('#id').val();
        data.OPComment = getCommonTime() + ': ' + $('#Comment').val() + '; ';
        data.status = 313;//OP审核未通过

        $.ajax({
            type : "post", 
            url : "/queue_flow_action/verify",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

                    $('#btn_op_refuse').text('OP拒绝');
                    $('#btn_op_pass').attr("disabled", false);
                    $('#btn_op_refuse').attr("disabled", false);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
                    $('#submit_result').modal();

                    $('#btn_op_refuse').text('OP拒绝');
                    $('#btn_op_pass').attr("disabled", false);
                    $('#btn_op_refuse').attr("disabled", false);
            },
        });
    });

    /*OP开通权限按钮点击事件*/
    $('#btn_op_online').click(function(){

        $('#btn_op_online').text('正在跳转...');
        $('#btn_op_online').attr("disabled", true);

        document.postForm.submit();
    });

    /*RD准入按钮点击事件*/
    $('#btn_rd_pass').click(function(){

        $('#btn_rd_pass').text('正在提交...');
        $('#btn_rd_pass').attr("disabled", true);
        $('#btn_rd_refuse').attr("disabled", true);


        /*要传递到后台的数据*/
        var data = new Object();

        /*准备数据*/
        data.id = $('#id').val();
        data.RDComment = getCommonTime() + ': ' + $('#Comment').val() + '; ';
        data.status = 302;//RD审核通过，等待QA审核

        $.ajax({
            type : "post", 
            url : "/queue_flow_action/verify",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

                    $('#btn_rd_pass').text('RD通过');
                    $('#btn_rd_pass').attr("disabled", false);
                    $('#btn_rd_refuse').attr("disabled", false);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
                    $('#submit_result').modal();

                    $('#btn_rd_pass').text('RD通过');
                    $('#btn_rd_pass').attr("disabled", false);
                    $('#btn_rd_refuse').attr("disabled", false);
            },
        });
    });

    /*RD拒绝按钮点击事件*/
    $('#btn_rd_refuse').click(function(){

        $('#btn_rd_refuse').text('正在提交...');
        $('#btn_rd_pass').attr("disabled", true);
        $('#btn_rd_refuse').attr("disabled", true);

        /*要传递到后台的数据*/
        var data = new Object();

        /*准备数据*/
        data.id = $('#id').val();
        data.RDComment = getCommonTime() + ': ' + $('#Comment').val() + '; ';
        data.status = 311;//RD审核未通过

        $.ajax({
            type : "post", 
            url : "/queue_flow_action/verify",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

                    $('#btn_rd_refuse').text('RD拒绝');
                    $('#btn_rd_pass').attr("disabled", false);
                    $('#btn_rd_refuse').attr("disabled", false);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
                    $('#submit_result').modal();

                    $('#btn_rd_refuse').text('RD拒绝');
                    $('#btn_rd_pass').attr("disabled", false);
                    $('#btn_rd_refuse').attr("disabled", false);

            },
        });
    });

    /*QA准入按钮点击事件*/
    $('#btn_qa_pass').click(function(){

        $('#btn_qa_pass').text('正在提交...');
        $('#btn_qa_pass').attr("disabled", true);
        $('#btn_qa_refuse').attr("disabled", true);

        /*要传递到后台的数据*/
        var data = new Object();

        /*准备数据*/
        data.id = $('#id').val();
        data.QAComment = getCommonTime() + ': ' + $('#Comment').val() + '; ';
        data.status = 303;//QA审核通过，等待OP审核

        $.ajax({
            type : "post", 
            url : "/queue_flow_action/verify",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

                    $('#btn_qa_pass').text('QA通过');
                    $('#btn_qa_pass').attr("disabled", false);
                    $('#btn_qa_refuse').attr("disabled", false);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
                    $('#submit_result').modal();

                    $('#btn_qa_pass').text('QA通过');
                    $('#btn_qa_pass').attr("disabled", false);
                    $('#btn_qa_refuse').attr("disabled", false);
            },
        });
    });

    /*QA拒绝按钮点击事件*/
    $('#btn_qa_refuse').click(function(){

        $('#btn_qa_refuse').text('正在提交...');
        $('#btn_qa_pass').attr("disabled", true);
        $('#btn_qa_refuse').attr("disabled", true);

        /*要传递到后台的数据*/
        var data = new Object();

        /*准备数据*/
        data.id = $('#id').val();
        data.QAComment = getCommonTime() + ': ' + $('#Comment').val() + '; ';
        data.status = 312;//QA审核通过，等待OP审核

        $.ajax({
            type : "post", 
            url : "/queue_flow_action/verify",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

                    $('#btn_qa_refuse').text('QA拒绝');
                    $('#btn_qa_pass').attr("disabled", false);
                    $('#btn_qa_refuse').attr("disabled", false);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
                    $('#submit_result').modal();

                    $('#btn_qa_refuse').text('QA拒绝');
                    $('#btn_qa_pass').attr("disabled", false);
                    $('#btn_qa_refuse').attr("disabled", false);
            },
        });
    });

    /*
    //提交并确认后自动跳转到我的发布
    $('#submit_result').on('hidden', function() {
        window.location.href = "/progress_management";
        
    });
    */
});
