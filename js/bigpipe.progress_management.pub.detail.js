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
        data.clusterName = $('#selCluster').find("option:selected").text();
        data.clusterID = $('#selCluster').find("option:checked").val();
        data.ACLUsername = $('#ACLUsername').val();
        data.pipeName = $('#pipeName').val();
        data.OPComment = $('#historyComment').val() + getCommonTime() + ': ' + $('#Comment').val() + '; ';
        data.status = 132;//OP确认通过，等待用户提交issueID

        $.ajax({
            type : "post", 
            url : "/pub_flow_action?action=verify",
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
        data.clusterName = $('#selCluster').find("option:selected").text();
        data.clusterID = $('#selCluster').find("option:checked").val();
        data.OPComment = $('#historyComment').val() + getCommonTime() + ': ' + $('#Comment').val() + '; ';
        data.status = 210;//OP拒绝，用户重新填写文档

        $.ajax({
            type : "post", 
            url : "/pub_flow_action?action=verify",
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

    /*OP创建pipe按钮点击事件*/
    $('#btn_op_create_pipe').click(function(){

        $('#btn_op_create_pipe').text('正在提交...');
        $('#btn_op_create_pipe').attr("disabled", true);

        /*要传递到后台的数据*/
        var data = new Object();
        /*准备数据*/
        data.id = $('#id').val();
        data.clusterName = $('#selCluster').find("option:selected").text();
        data.clusterID = $('#selCluster').find("option:checked").val();
        data.hasACL = $('#hasACL').val();
        data.ACLUsername = $('#ACLUsername').val();
        if(data.hasACL == '否')
        {
            data.ACLPassword = $('#ACLPassword').val();
        }
        data.OPACLUsername = $('#OPACLUsername').val();
        data.OPACLPassword = $('#OPACLPassword').val();
        data.pipeName = $('#pipeName').val();
        data.pipeletNum = $('#pipeletNum').val();
        data.pubToken = $('#pubToken').val();
        data.subToken = $('#subToken').val();
        data.forwardCap = $('#forwardCap').val();
        data.group = $('#group').val();

        $.ajax({
            type : "post", 
            url : "/pub_flow_action/online/" + data.id + "/createPipe",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

                    $('#btn_op_create_pipe').text('建立pipe');
                    $('#btn_op_create_pipe').attr("disabled", false);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
                    $('#submit_result').modal();

                    $('#btn_op_create_pipe').text('建立pipe');
                    $('#btn_op_create_pipe').attr("disabled", false);
            },
        });

    });

    /*OP创建acl用户按钮点击事件*/
    $('#btn_op_create_acl').click(function(){

        $('#btn_op_create_acl').text('正在提交...');
        $('#btn_op_create_acl').attr("disabled", true);

        /*要传递到后台的数据*/
        var data = new Object();
        /*准备数据*/
        data.id = $('#id').val();
        data.clusterName = $('#selCluster').find("option:selected").text();
        data.clusterID = $('#selCluster').find("option:checked").val();
        data.ACLUsername = $('#ACLUsername').val();
        data.ACLPassword = $('#ACLPassword').val();
        data.OPACLUsername = $('#OPACLUsername').val();
        data.OPACLPassword = $('#OPACLPassword').val();

        $.ajax({
            type : "post", 
            url : "/pub_flow_action/online/" + data.id + "/createACL",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

                    $('#btn_op_create_acl').text('创建ACL用户');
                    $('#btn_op_create_acl').attr("disabled", false);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
                    $('#submit_result').modal();

                    $('#btn_op_create_acl').text('创建ACL用户');
                    $('#btn_op_create_acl').attr("disabled", false);
            },
        });

    });

    /*OP开通权限按钮点击事件*/
    $('#btn_op_grant_acl').click(function(){

        $('#btn_op_grant_acl').text('正在提交...');
        $('#btn_op_grant_acl').attr("disabled", true);

        /*要传递到后台的数据*/
        var data = new Object();
        /*准备数据*/
        data.id = $('#id').val();
        data.clusterName = $('#selCluster').find("option:selected").text();
        data.clusterID = $('#selCluster').find("option:checked").val();
        data.pipeName = $('#pipeName').val();
        data.ACLUsername = $('#ACLUsername').val();
        data.OPACLUsername = $('#OPACLUsername').val();
        data.OPACLPassword = $('#OPACLPassword').val();

        if($('#gPubAuthority').attr('checked') == 'checked')
        {
            data.gPubAuthority = 'PUB';
        }

        if($('#gSubAuthority').attr('checked') == 'checked')
        {
            data.gSubAuthority = 'SUB';
        }

        if($('#gCreateAuthority').attr('checked') == 'checked')
        {
            data.gCreateAuthority = 'CREATE';
        }

        if($('#gModifyAuthority').attr('checked') == 'checked')
        {
            data.gModifyAuthority = 'MODIFY';
        }

        $.ajax({
            type : "post", 
            url : "/pub_flow_action/online/" + data.id + "/grantACL",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

                    $('#btn_op_grant_acl').text('开通权限');
                    $('#btn_op_grant_acl').attr("disabled", false);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
                    $('#submit_result').modal();

                    $('#btn_op_grant_acl').text('开通权限');
                    $('#btn_op_grant_acl').attr("disabled", false);
            },
        });

    });

    /*OP结束流程按钮点击事件*/
    $('#btn_op_close_flow').click(function(){

        $('#btn_op_close_flow').text('正在提交...');
        $('#btn_op_close_flow').attr("disabled", true);

        /*要传递到后台的数据*/
        var data = new Object();
        /*准备数据*/
        data.id = $('#id').val();
        data.status = 300;
        data.clusterName = $('#selCluster').find("option:selected").text();
        data.clusterID = $('#selCluster').find("option:checked").val();

        $.ajax({
            type : "post", 
            url : "/pub_flow_action?action=verify",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

                    $('#btn_op_close_flow').text('结束流程');
                    $('#btn_op_close_flow').attr("disabled", false);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
                    $('#submit_result').modal();

                    $('#btn_op_close_flow').text('结束流程');
                    $('#btn_op_close_flow').attr("disabled", false);
            },
        });

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
        data.RDComment = $('#historyComment').val() + getCommonTime() + ': ' + $('#Comment').val() + '; ';
        data.hostQps = $('#hostQps').val();
        data.pubNum = $('#pubNum').val();
        data.queueClientNum = $('#queueClientNum').val();
        data.batchNum = $('#batchNum').val();
        data.bandwidth = $('#bandwidth').val();
        data.status = 140;//RD确认通过,等待QA确认

        $.ajax({
            type : "post", 
            url : "/pub_flow_action?action=verify",
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
        data.RDComment = $('#historyComment').val() + getCommonTime() + ': ' + $('#Comment').val() + '; ';
        data.status = 220;//RD代码review未通过，需要重新提交issueid

        $.ajax({
            type : "post", 
            url : "/pub_flow_action?action=verify",
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

        /*要传递到后台的数据*/
        var data = new Object();

        /*准备数据*/
        data.id = $('#id').val();
        data.QAComment = $('#historyComment').val() + getCommonTime() + ': ' + $('#Comment').val() + '; ';
        data.status = 150;//QA确认通过，等待用户申请上线

        $.ajax({
            type : "post", 
            url : "/pub_flow_action?action=verify",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

                    $('#btn_qa_pass').text('QA通过');
                    $('#btn_qa_pass').attr("disabled", false);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
                    $('#submit_result').modal();

                    $('#btn_qa_pass').text('QA通过');
                    $('#btn_qa_pass').attr("disabled", false);
            },
        });
    });

    //提交并确认后自动跳转到我的发布
    /*
    $('#submit_result').on('hidden', function() {
        window.location.href = "/progress_management";
        
    });
    */
});
