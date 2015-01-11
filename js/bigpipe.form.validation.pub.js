$(document).ready(function(){

    $('#pub_flow_form').validate({
        rules: {
            pubQuota: {
                required: true,
            },
        },
    });

    $("#validate_tab1").validate({
		rules:{
            cluster_name:{
				required:true,
			},
		},
        messages: {
            cluster_name:{
                required:'请填写cluster，支持模糊查询',
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
	}),

    
    $("#validate_tab2").validate({
		rules:{
            pipe: {
                required:true,
            },
		},
        messages: {
            pipe:{
                required:'请填写pipe，支持模糊查询',
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
    }),
    $("#validate_tab3").validate({
		rules:{
            pipelet: {
                required:true,
            },
		},
        messages: {
            pipelet:{
                required:'请填写pipelet，支持模糊查询',
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
    }),
    $("#validate_tab4").validate({
		rules:{
            stripe: {
                required:true,
            },
		},
        messages: {
            stripe:{
                required:'请填写stripe，支持模糊查询',
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
    }),
    $("#validate_tab5").validate({
		rules:{
            broker_group: {
                required:true,
            },
		},
        messages: {
            broker_group:{
                required:'请填写broker group，支持模糊查询',
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
    }),
    $("#validate_tab6").validate({
		rules:{
            broker: {
                required:true,
            },
		},
        messages: {
            broker:{
                required:'请填写broker，支持模糊查询',
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
    }),
    $("#validate_tab7").validate({
		rules:{
            pipelet: {
                required:true,
            },
            message_number: {
                required:true,
                number:true,
            },
		},
        messages: {
            pipelet:{
                required:'请填写pipelet，支持模糊查询',
            },
            message_number:{
                required:'请填写message number',
                number:'请填写数字',
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
    })
});
