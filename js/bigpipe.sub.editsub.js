$(document).ready(function(){
    $("#sub_edit_form").validate({
		rules:{
            dataUsage :{
				required: true,
			},
            subNum :{
                required: true,
            },
		},
        messages: {
            dataUsage :{
                required: '必填项',
            },
            subNum :{
                required: '必填项',
            },
        },
		errorClass: "help-inline",
		errorElement: "span",
		highlight:function(element, errorClass, validClass) {
			$(element).parents('.control-group').addClass('error');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).parents('.control-group').removeClass('error');
			$(element).parents('.control-group').addClass('success');
		}
	});

    $('input[type=radio],input[type=checkbox]').uniform();


    $('#aclYes').click(function(){
        $('#aclYesArea').css("display", "block");
        $('#aclNoArea').css("display", "none");
    });
    $('#aclNo').click(function(){
        $('#aclNoArea').css("display", "block");
        $('#aclYesArea').css("display", "none");
    });

    /*提交按钮点击事件*/
    $('#btn_submit').click(function(){
        if(false == $('#sub_edit_form').valid()) {
            return;
        }
        if($('#accept').attr('checked') != 'checked')
        {
            alert('提示：您必须接受全部条件，才能提交申请。');
            return ;
        }

        var idcNumArray = $('.idcNum');
        var bAllzero = true;
        for(var i=0; i<idcNumArray.length; i++)
        {
            if(idcNumArray[i].value != '' && idcNumArray[i].value != 0 )
            {
                bAllzero = false;
                break;
            }
        }
        if(bAllzero)
        {
            alert('提示：IDC不能全部为0');
            return ;
        }

        $('#btn_submit').text('正在提交...');
        $('#btn_save').attr("disabled", true);
        $('#btn_submit').attr("disabled", true);

        /*要传递到后台的数据*/
        var data = new Object();

        /*准备数据*/
        data.id = $('#id').val();
        data.clusterName = $('#clusterName').val();
        data.hasACL = $('input:radio[name="hasACL"]:checked').val();
        data.ACLUsername = $('#ACLUsername').val();
        data.ACLPassword = $('#ACLPassword').val();
        data.ACLKeyword = $('#ACLKeyword').val();
        data.productline = $('#productline').val();
        data.productRD = $('#productRD').val();
        data.productRDM = $('#productRDM').val();
        data.productRDMail = $('#productRDMail').val();
        data.productOP = $('#productOP').val();
        data.productOPM = $('#productOPM').val();
        data.productOPMail = $('#productOPMail').val();
        data.subType= $('input:radio[name="subType"]:checked').val();
        data.dataName = $('#dataName').val();
        data.dataUsage = $('#dataUsage').val();
        data.idcNum = new Array();
        for(var i=0; i<idcNumArray.length; i++)
        {
            data.idcNum.push( new Array(idcNumArray[i].name, idcNumArray[i].value) );
        }
        data.delay= $('input:radio[name="delay"]:checked').val();
        data.subNum = $('#subNum').val();
        if($('#accept').attr('checked') == 'checked')
        {
            data.accept = 1;
        }
        else
        {
            data.accept = 0;
        }
        

        $.ajax({
            type : "post", 
            url : "/sub_flow_action/edit_submit",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                $('#retMessage').html(data.message);
                $('#retDetail').html(data.detail);
                $('#submit_result').modal();

                $('#btn_submit').text('提交');
                $('#btn_save').attr("disabled", false);
                $('#btn_submit').attr("disabled", false);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                $('#retMessage').html('错误!');
                $('#retDetail').html('提交失败，请重试!');
                $('#submit_result').modal();

                $('#btn_submit').text('提交');
                $('#btn_save').attr("disabled", false);
                $('#btn_submit').attr("disabled", false);
            },
        });
    });

    /*保存按钮点击事件*/
    $('#btn_save').click(function(){

        $('#btn_save').text('正在保存...');
        $('#btn_save').attr("disabled", true);
        $('#btn_submit').attr("disabled", true);

        /*要传递到后台的数据*/
        var data = new Object();

        /*准备数据*/
        data.id = $('#id').val();
        data.hasACL = $('input:radio[name="hasACL"]:checked').val();
        data.ACLUsername = $('#ACLUsername').val();
        data.ACLKeyword = $('#ACLKeyword').val();
        data.productline = $('#productline').val();
        data.productRD = $('#productRD').val();
        data.productRDM = $('#productRDM').val();
        data.productRDMail = $('#productRDMail').val();
        data.productOP = $('#productOP').val();
        data.productOPM = $('#productOPM').val();
        data.productOPMail = $('#productOPMail').val();
        data.subType= $('input:radio[name="subType"]:checked').val();
        data.dataName = $('#dataName').val();
        data.dataUsage = $('#dataUsage').val();
        data.idcNum = new Array();
        var idcNumArray = $('.idcNum');
        for(var i=0; i<idcNumArray.length; i++)
        {
            data.idcNum.push( new Array(idcNumArray[i].name, idcNumArray[i].value) );
        }
        data.delay= $('input:radio[name="delay"]:checked').val();
        data.subNum = $('#subNum').val();
        if($('#accept').attr('checked') == 'checked')
        {
            data.accept = 1;
        }
        else
        {
            data.accept = 0;
        }
        

        $.ajax({
            type : "post", 
            url : "/sub_flow_action/edit_save",
            data : data,
            dataType : "json",
            success : function(data, textStatus) {
                $('#retMessage').html(data.message);
                $('#retDetail').html(data.detail);
                $('#submit_result').modal();

                $('#btn_save').text('保存');
                $('#btn_save').attr("disabled", false);
                $('#btn_submit').attr("disabled", false);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                $('#retMessage').html('错误!');
                $('#retDetail').html('提交失败，请重试!');
                $('#submit_result').modal();

                $('#btn_save').text('保存');
                $('#btn_save').attr("disabled", false);
                $('#btn_submit').attr("disabled", false);
            },
        });
    });

    /*
    //提交并确认后自动跳转到我的订阅
    $('#submit_result').on('hidden', function() {
        window.location.href = "/my_sub";
        
    });
    */

});
