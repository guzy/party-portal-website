$(document).ready(function(){
    $("#op_validate_tab1").validate({
		rules:{
            cluster_username1: {
                required:true,
            },
            password: {
                required:true,
            },
            cluster_id: {
                required:true,
            },
            broker_name: {
                required:true,
            },
		},
        messages: {
            cluster_username1:{
                required:'请填写',
            },
            password:{
                required:'请填写'
            },
            cluster_id:{
                required:'请选择',
            },
            broker_name:{
                required:'请选择',
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
    $("#op_validate_tab2").validate({
		rules:{
            cluster_username2:{
                required:true,
            },
            password:{
                required:true,
            },
		},
        messages: {
            cluster_username2:{
                required:'请填写',
            },
            password: {
                required:'请填写',
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
    $("#op_validate_tab3").validate({
		rules:{
            cluster_username3: {
                required:true,
            },
            password: {
                required:true,
            },
		},
        messages: {
            cluster_username3:{
                required:'请填写',
            },
            password:{
                required:'请填写'
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
    $("#op_validate_tab4").validate({
		rules:{
            cluster_username4: {
                required:true,
            },
            password: {
                required:true,
            },
		},
        messages: {
            cluster_username4:{
                required:'请填写',
            },
            password:{
                required:'请填写'
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
    $("#op_validate_tab5").validate({
		rules:{
            cluster_username5: {
                required:true,
            },
            password: {
                required:true,
            },
		},
        messages: {
            cluster_username5:{
                required:'请填写',
            },
            password:{
                required:'请填写'
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
    $("#op_validate_tab6").validate({
		rules:{
            cluster_username6: {
                required:true,
            },
            password: {
                required:true,
            },
		},
        messages: {
            cluster_username6:{
                required:'请填写',
            },
            password:{
                required:'请填写'
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
    $("#op_validate_tab7").validate({
		rules:{
            cluster_username7: {
                required:true,
            },
            password: {
                required:true,
            },
		},
        messages: {
            cluster_username7:{
                required:'请填写',
            },
            password:{
                required:'请填写'
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
    $("#op_validate_tab8").validate({
		rules:{
            cluster_username8: {
                required:true,
            },
            password: {
                required:true,
            },
		},
        messages: {
            cluster_username8:{
                required:'请填写',
            },
            password:{
                required:'请填写'
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
