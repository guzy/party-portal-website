var tableOption = {
		"bJQueryUI": true,
		"sPaginationType": "full_numbers",
		//"sDom": '<""fl>t<"F"p>',
		//"sDom": '<""l>t<"F"fp>',
        //暂时不提供表格长度选择功能
		"sDom": '<"">t<"F"p>',
        //默认按第一列降序
        //"aaSorting": [[0, "desc"]],

        //显示处理进度条
        //"bProcessing": true

        //显示水平滚动条
        "sScrollX": "100%",
        "bScrollCollapse": false,

        //无限滚动，不分页
        //"bScrollInfinite": true,


        //表格高度
        //"sScrollY": "650px",
};

$(document).ready(function(){

    $('select').select2();

    //载入queue列表
    $.ajax({
        type: "post",
        url: "/queue_flow_action/queue_list",
        dataType: "json",
        success: function(data, textStatus) {
            //alert(data);return ;
            for(var i = 0; i < data.length; i++)
            {
                str = '<tr>';
                str += '<td><input type="radio" name="selQueue"></input></td>';
                str += '<td class="queueName">' + data[i].queueName + '</td>';
                str += '<td class="clusterID">' + data[i].clusterID + '</td>';
                str += '<td class="clusterName">' + data[i].clusterName + '</td>';
                str += '<td class="pipeletName">' + data[i].pipeletName + '</td>';
                str += '</tr>';
                $('#tableContent').append(str);
            }
            //暂不分页
            //$('.data-table').dataTable(tableOption);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            alert('获取queue列表出现错误!');
        }
    });

    $('input[type=radio],input[type=checkbox]').uniform();


    $('#btn_new_verify').click(function(){
        $('#btn_new_verify').attr('disabled',true);
        $('#btn_new_verify').html('正在验证...');
        $('#selCluster').attr('disabled', true);
        $('#ACLUsername').attr('readonly', true);
        $('#ACLPassword').attr('readonly', true);

        var data = new Object();

        data.clusterName = $('#selCluster').find("option:selected").text();
        data.clusterID = $('#selCluster').find("option:selected").val();
        data.ACLUsername = $('#ACLUsername').val();
        data.ACLPassword = $('#ACLPassword').val();
        $.ajax({
            type : "post", 
            url : "/queue_flow_action/pipelet_list",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                if(data.message == '验证通过')
                {
                    $('#btn_new_verify').html('验证通过，请继续填写表单并提交');
                    for(var i=0; i<data.detail.length; i++)
                    {
                        $('#selPipelet').append('<option>' + data.detail[i] + '</option>');
                    }
                    $('#selPipelet').select2();
                    $('#aclYesAreaNew').removeClass('hide');
                }
                else
                {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();

                    $('#btn_new_verify').removeAttr('disabled');
                    $('#btn_new_verify').html('验证');

                    $('#selCluster').attr('disabled', false);
                    $('#ACLUsername').attr('readonly', false);
                    $('#ACLPassword').attr('readonly', false);
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                $('#retMessage').html('错误!');
                $('#retDetail').html('网络故障，请重试!');
                $('#submit_result').modal();

                $('#btn_new_verify').removeAttr('disabled');
                $('#btn_new_verify').html('验证');
            },
        });
    });

    $('#btn_new_submit').click(function(){

        $('#btn_new_submit').attr('disabled',true);
        $('#btn_new_submit').html('正在提交...');

        /*要传递到后台的数据*/
        var data = new Object();
        data.clusterName = $('#selCluster').find("option:selected").text();
        data.clusterID = $('#selCluster').find("option:selected").val();
        data.ACLUsername = $('#ACLUsername').val();
        data.ACLPassword = $('#ACLPassword').val();

        var _selPipelet = $('#selPipelet').select2('data');
        data.pipeletName = '';
        for(var i=0; i<_selPipelet.length; i++)
        {
            if(i != 0)
            {
                data.pipeletName += ',';
            }
            data.pipeletName += _selPipelet[i].text;
        }

        data.queueKeyword = $('#queueKeyword').val();
        data.queueUsage= $('#queueUsage').val();

        $.ajax({
            type : "post", 
            url : "/queue_flow_action/create",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();
                    $('#btn_new_submit').html('提交成功');
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
                    $('#submit_result').modal();
                    $('#btn_new_submit').html('提交');
                    $('#btn_new_submit').attr('disabled',false);
            },
        });
    });

    /*申请queue提交按钮点击事件*/
    $('#btn_apply_submit').click(function(){

        var tr = $('input:radio[name="selQueue"]:checked').parent().parent();
        if(tr.html() == null)
        {
            alert('请选择queue');
            return ;
        }

        $('#btn_apply_submit').attr('disabled',true);
        $('#btn_apply_submit').html('正在提交...');

        /*要传递到后台的数据*/
        var data = new Object();

        
        data.queueName = tr.find('.queueName').html();
        data.clusterID = tr.find('.clusterID').html();
        data.clusterName = tr.find('.clusterName').html();
        data.pipeletName = tr.find('.pipeletName').html();

        data.ACLUsername = $('#ACLUsername_apply').val();
        data.ACLPassword = $('#ACLPassword_apply').val();
        data.queueUsage= $('#queueUsage_apply').val();

        $.ajax({
            type : "post", 
            url : "/queue_flow_action/apply",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                    $('#retMessage').html(data.message);
                    $('#retDetail').html(data.detail);
                    $('#submit_result').modal();
                    if(data.message == 'ACL认证失败')
                    {
                        $('#btn_apply_submit').html('提交');
                        $('#btn_apply_submit').attr('disabled',false);
                    }
                    else
                    {
                        $('#btn_apply_submit').html('提交成功');
                    }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#retMessage').html('错误!');
                    $('#retDetail').html('提交失败，请重试!');
                    $('#submit_result').modal();
                    $('#btn_apply_submit').html('提交');
                    $('#btn_apply_submit').attr('disabled',false);
            },
        });
    });
});
