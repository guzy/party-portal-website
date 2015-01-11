var tableOption = {
		"bJQueryUI": true,
		"sPaginationType": "full_numbers",
		//"sDom": '<""fl>t<"F"p>',
		//"sDom": '<""l>t<"F"fp>',
        //暂时不提供表格长度选择功能
		"sDom": '<"">t<"F"fp>',

        //显示处理进度条
        //"bProcessing": true

        //显示水平滚动条
        "sScrollX": "100%",
        "bScrollCollapse": false,

        //无限滚动，不分页
        //"bScrollInfinite": true,


        //表格高度
        "sScrollY": "350px",
};

$(document).ready(function(){

	$('.data-table').dataTable(tableOption);
	$('select').select2();
});
