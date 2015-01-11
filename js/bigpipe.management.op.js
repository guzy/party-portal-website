$(document).ready(function(){
     $('#selCluster1').select2({
        placeholder: "选择一个集群",
    });
    $('#selBroker').select2({
        placeholder: "选择一个broker",
    });

    //初始时未选择cluster，broker列表和submit按钮禁用
    $('#selBroker').select2("enable", false);
    $('#submit').attr('disabled', true);

    //当cluster列表选项改变时的响应函数
    $('#selCluster1').change(function(){

        //获取下级列表过程中禁用下级选择框和提交按钮
        $('#selBroker').select2("enable", false);
        $('#submit').attr('disabled', true);
        $('#s2id_selBroker > a > span').html('正在读取列表...');

        var selClusterId = document.getElementById('selCluster').value;

        if(window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {
            // code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {

                //alert(xmlhttp.responseText);
                var ret = xmlhttp.responseText;
                var selBroker = document.getElementById('selBroker');
                selBroker.innerHTML = ret;

                if(selBroker.length > 0)
                {
                    selBroker[0].selected = true;
                    $('#s2id_selBroker> a > span').html(selBroker[0].value);

                    $('#selBroker').select2("enable", true);
                    $('#submit').attr('disabled', false);
                }
                else
                {
                    $('#s2id_selBroker > a > span').html('没有项目');
                    $('#submit').attr('disabled', true);
                }
            }
            //读取列表失败
        }
        var parse_string = "/history_broker_list?cluster_id=" + selClusterId;
        xmlhttp.open("get", parse_string, true);
        xmlhttp.send();
    });

    $('.command').change(function(){
        if($('#command1').val() == 'dump_topic'){
            $('.selectArea1').addClass('hide');
            $('#dumpTopicArea').removeClass('hide');
        }
        else if($('#command1').val() == 'fix_disk'){
            $('.selectArea1').addClass('hide');
            $('#fixDiskArea').removeClass('hide');
        }
        else if($('#command1').val() == 'fix_topic'){
            $('.selectArea1').addClass('hide');
            $('#fixTopicArea').removeClass('hide');
        }
        else {
            $('.selectArea1').addClass('hide');
        }

        if($('#command2').val() == 'start_cluster' || $('#command2').val() == 'stop_cluster') {
            $('.selectArea2').addClass('hide');
        }
        else if($('#command2').val() == 'migrate_pipelet') {
            $('.selectArea2').addClass('hide');
            $('#migratePipeletArea').removeClass('hide');
        }

        if($('#command3').val() == 'create_group') {
            $('.selectArea3').addClass('hide');
            $('#createGroupArea').removeClass('hide');
        }
        else if($('#command3').val() == 'delete_group') {
            $('.selectArea3').addClass('hide');
            $('#deleteGroupArea').removeClass('hide');
        }
        else if($('#command3').val() == 'undel_group') {
            $('.selectArea3').addClass('hide');
            $('#undelGroupArea').removeClass('hide');
        }
        else if($('#command3').val() == 'repair_group') {
            $('.selectArea3').addClass('hide');
            $('#repairGroupArea').removeClass('hide');
        }
        else if($('#command3').val() == 'dump_group') {
            $('.selectArea3').addClass('hide');
            $('#dumpGroupArea').removeClass('hide');
        }

        if($('#command4').val() == 'create_common_group') {
            $('.selectArea4').addClass('hide');
            $('#createCommonGroupArea').removeClass('hide');
        }
        else if($('#command4').val() == 'delete_common_group') {
            $('.selectArea4').addClass('hide');
            $('#deleteCommonGroupArea').removeClass('hide');
        }
        else if($('#command4').val() == 'add_common_broker') {
            $('.selectArea4').addClass('hide');
            $('#addCommonBrokerArea').removeClass('hide');
        }
        else if($('#command4').val() == 'delete_common_broker') {
            $('.selectArea4').addClass('hide');
            $('#deleteCommonBrokerArea').removeClass('hide');
        }
        
        if($('#command5').val() == 'create_pipe') {
            $('.selectArea5').addClass('hide');
            $('#createPipeArea').removeClass('hide');
        }
        else if($('#command5').val() == 'delete_pipe') {
            $('.selectArea5').addClass('hide');
            $('#deletePipeArea').removeClass('hide');
        }
        else if($('#command5').val() == 'undel_pipe') {
            $('.selectArea5').addClass('hide');
            $('#undelPipeArea').removeClass('hide');
        }
        else if($('#command5').val() == 'suspend_pipe') {
            $('.selectArea5').addClass('hide');
            $('#suspendPipeArea').removeClass('hide');
        }
        else if($('#command5').val() == 'resume_pipe') {
            $('.selectArea5').addClass('hide');
            $('#resumePipeArea').removeClass('hide');
        }
        else if($('#command5').val() == 'modify_pipe') {
            $('.selectArea5').addClass('hide');
            $('#modifyPipeArea').removeClass('hide');
        }

        if($('#command6').val() == 'create_user') {
            $('.selectArea6').addClass('hide');
            $('#createUserArea').removeClass('hide');
        }
        else if($('#command6').val() == 'delete_user') {
            $('.selectArea6').addClass('hide');
            $('#deleteUserArea').removeClass('hide');
        }
        else if($('#command6').val() == 'alter_user') {
            $('.selectArea6').addClass('hide');
            $('#alterUserArea').removeClass('hide');
        }
        else if($('#command6').val() == 'grant_authority') {
            $('.selectArea6').addClass('hide');
            $('#grantAuthorityArea').removeClass('hide');
        }
        else if($('#command6').val() == 'revoke_authority') {
            $('.selectArea6').addClass('hide');
            $('#revokeAuthorityArea').removeClass('hide');
        }

        if($('#command8').val() == 'set_config') {
            $('.selectArea8').addClass('hide');
            $('#setConfigArea').removeClass('hide');
        }
        else if($('#command8').val() == 'set_workload_table') {
            $('.selectArea8').addClass('hide');
            $('#setWorkloadTableArea').removeClass('hide');
        }
        else if($('#command8').val() == 'set_strategy') {
            $('.selectArea8').addClass('hide');
            $('#setStrategyArea').removeClass('hide');
        }

        if($('#command9').val() == 'create_queue') {
            $('.selectArea9').addClass('hide');
            $('#createQueueArea').removeClass('hide');
        }
        else if($('#command9').val() == 'del_queue') {
            $('.selectArea9').addClass('hide');
            $('#deleteQueueArea').removeClass('hide');
        }
        else if($('#command9').val() == 'modify_queue') {
            $('.selectArea9').addClass('hide');
            $('#modifyQueueArea').removeClass('hide');
        }
    });
    $('#submit1').click(function(){
        $('#submit_result1').modal();
        var command1 = $("#command1").val();
        $('#retDetail1').html("command: " + command1 + "</br>确定进行此操作吗？");
    });
    $('#submit2').click(function(){
        $('#submit_result2').modal();
        var command2 = $("#command2").val();
        $('#retDetail2').html("command: " + command2 + "</br>确定进行此操作吗？");
    });
    $('#submit3').click(function(){
        $('#submit_result3').modal();
        var command3 = $("#command3").val();
        $('#retDetail3').html("command: " + command3 + "</br>确定进行此操作吗？");
    });
    $('#submit4').click(function(){
        $('#submit_result4').modal();
        var command4 = $("#command4").val();
        $('#retDetail4').html("command: " + command4 + "</br>确定进行此操作吗？");
    });
    $('#submit5').click(function(){
        $('#submit_result5').modal();
        var command5 = $("#command5").val();
        $('#retDetail5').html("command: " + command5 + "</br>确定进行此操作吗？");
    });
    $('#submit6').click(function(){
        $('#submit_result6').modal();
        var command6 = $("#command6").val();
        $('#retDetail6').html("command: " + command6 + "</br>确定进行此操作吗？");
    });
    $('#submit7').click(function(){
        $('#submit_result7').modal();
        var command7 = $("#command7").val();
        $('#retDetail7').html("command: " + command7 + "</br>确定进行此操作吗？");
    });
    $('#submit8').click(function(){
        $('#submit_result8').modal();
        var command8 = $("#command8").val();
        $('#retDetail8').html("command: " + command8 + "</br>确定进行此操作吗？");
    });
    $('#submit9').click(function(){
        $('#submit_result9').modal();
        var command9 = $("#command9").val();
        $('#retDetail9').html("command: " + command9 + "</br>确定进行此操作吗？");
    });
});
