$(document).ready(function(){

    $("#validate_tab1").validate({
		rules:{
            acl_user_name: {
                required:true,
            },
		},
        messages: {
            acl_user_name:{
                required:'请填写acl用户名',
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
    $("#validate_tab2").validate({
		rules:{
            pipe_name:{
                required:true,
            },
		},
        messages: {
            pipe_name:{
                required:'请填写pipe名',
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
