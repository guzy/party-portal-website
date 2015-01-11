//通用选项结构，使用前应先设置.chart.renderTo选项
var options = {
    chart: {
        type: 'spline',
        zoomType: 'x'
    },
    plotOptions: {
        areaspline: {
            lineWidth: 1.5,
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true,
                        radius: 2
                    }
                }
            },
            shadow: false
        },
        spline: {
            lineWidth: 1.5,
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true,
                        radius: 2
                    }
                }
            },
            shadow: false
        }
    },
    title: {
        text: ''
    },
    credits: {
        enabled: true,
        href: 'javascript:alert("感谢您的使用!")',
        text: 'bigpipe管理平台'
    },
    xAxis: {
        text: '时间',
        type: 'datetime'
    },
    yAxis: {
        text: 'Value'
    },
    exporting: {
        enabled: 'true',

    },
    /*
    tooltip: {
        formatter: function() {
            return '<b>'+ this.series.name +'</b><br/>'+
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                Highcharts.numberFormat(this.y, 2);
        }
    },
    */
    series: []
};

var chart_pub_qps = null;
var chart_pub_flowrate = null;
var chart_sub_flowrate = null;
var chart_bandwidth_in = null;
var chart_bandwidth_out = null;
var chart_connection_number = null;
var chart_workload = null;
var chart_avg_disk_idle = null;
var chart_lowest_disk_idle = null;
//是否开启自动刷新，默认关闭
var auto_refresh = false;
//自动刷新定时器
var timer_refresh = null;

//载入趋势图数据
function load_chart()
{
    //获取并显示表格数据
    if($('#s2id_selCluster').css("display") != "none")
    {
        var selClusterName = $('#selCluster').find("option:selected").text();
    }
    else
    {
        var selClusterName = $('#inputCluster').attr("value");
    }
    if($('#s2id_selBroker').css("display") != "none")
    {
        var selBrokerName = $('#selBroker').find("option:selected").text();
    }
    else
    {
        var selBrokerName = $('#inputBroker').attr("value");
    }

    if(selClusterName == '')
    {
        alert('请填写cluster');
        return ;
    }
    if(selBrokerName == '')
    {
        alert('请填写broker');
        return ;
    }

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

            var ret = xmlhttp.responseText;
            //alert(ret);
            
            $('#tableContent').html(ret);
            $('#tableContent').find("table").dataTable(tableOption);
        }
    }
    var dateInputStart = $('#dateInputStart').val();
    var dateInputEnd = $('#dateInputEnd').val();
    var utime_start = get_unixtime(dateInputStart);
    var utime_end = get_unixtime(dateInputEnd);

    var parse_string = "/history_data?type=broker";
    parse_string += "&cluster_name=" + selClusterName;
    parse_string += "&broker_name=" + selBrokerName;
    parse_string += "&stime=" + utime_start;
    parse_string += "&etime=" + utime_end;

    xmlhttp.open("get", parse_string, true);
    xmlhttp.send();

    //获取并显示图表数据

    //pub_qps

    if($('#option_pub_qps').attr('selected') == 'selected')
    {
        $('#chart_pub_qps_area').css('display', 'block');

        //清空原数据
        if(chart_pub_qps != null)
        {
            chart_pub_qps.destroy();
        }
        options.title.text = 'pub qps';
        options.chart.renderTo = 'container_chart_pub_qps';
        chart_pub_qps = new Highcharts.Chart(options);
        if(window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp_pub_qps = new XMLHttpRequest();
        }
        else {
            // code for IE6, IE5
            xmlhttp_pub_qps = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp_pub_qps.onreadystatechange = function() {
            if (xmlhttp_pub_qps.readyState==4 && xmlhttp_pub_qps.status==200) {

                var ret = xmlhttp_pub_qps.responseText;
                //alert(ret);
                chart_pub_qps.addSeries(eval('(' + ret + ')'));
            }
        }

        parse_string = "/chart_data?type=broker&item=pub_qps";
        parse_string += "&cluster_name=" + selClusterName;
        parse_string += "&broker_name=" + selBrokerName;
        parse_string += "&stime=" + utime_start;
        parse_string += "&etime=" + utime_end;

        xmlhttp_pub_qps.open("get", parse_string, true);
        xmlhttp_pub_qps.send();
    }
    else
    {
        $('#chart_pub_qps_area').css('display', 'none');
    }

    //pub_flowrate

    if($('#option_pub_flowrate').attr('selected') == 'selected')
    {
        $('#chart_pub_flowrate_area').css('display', 'block');
        //清空原数据
        if(chart_pub_flowrate != null)
        {
            chart_pub_flowrate.destroy();
        }
        options.title.text = '发布流量';
        options.chart.renderTo = 'container_chart_pub_flowrate';
        chart_pub_flowrate= new Highcharts.Chart(options);

        if(window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp_pub_flowrate = new XMLHttpRequest();
        }
        else {
            // code for IE6, IE5
            xmlhttp_pub_flowrate = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp_pub_flowrate.onreadystatechange = function() {
            if (xmlhttp_pub_flowrate.readyState==4 && xmlhttp_pub_flowrate.status==200) {

                var ret = xmlhttp_pub_flowrate.responseText;
                //alert(ret);
                chart_pub_flowrate.addSeries(eval('(' + ret + ')'));
            }
        }

        parse_string = "/chart_data?type=broker&item=pub_flowrate";
        parse_string += "&cluster_name=" + selClusterName;
        parse_string += "&broker_name=" + selBrokerName;
        parse_string += "&stime=" + utime_start;
        parse_string += "&etime=" + utime_end;

        xmlhttp_pub_flowrate.open("get", parse_string, true);
        xmlhttp_pub_flowrate.send();
    }
    else
    {
        $('#chart_pub_flowrate_area').css('display', 'none');
    }

    //sub_flowrate
    if($('#option_sub_flowrate').attr('selected') == 'selected')
    {
        $('#chart_sub_flowrate_area').css('display', 'block');

        //清空原数据
        if(chart_sub_flowrate != null)
        {
            chart_sub_flowrate.destroy();
        }
        options.title.text = '订阅流量';
        options.chart.renderTo = 'container_chart_sub_flowrate';
        chart_sub_flowrate= new Highcharts.Chart(options);

        if(window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp_sub_flowrate = new XMLHttpRequest();
        }
        else {
            // code for IE6, IE5
            xmlhttp_sub_flowrate = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp_sub_flowrate.onreadystatechange = function() {
            if (xmlhttp_sub_flowrate.readyState==4 && xmlhttp_sub_flowrate.status==200) {

                var ret = xmlhttp_sub_flowrate.responseText;
                //alert(ret);
                chart_sub_flowrate.addSeries(eval('(' + ret + ')'));
            }
        }

        parse_string = "/chart_data?type=broker&item=sub_flowrate";
        parse_string += "&cluster_name=" + selClusterName;
        parse_string += "&broker_name=" + selBrokerName;
        parse_string += "&stime=" + utime_start;
        parse_string += "&etime=" + utime_end;

        xmlhttp_sub_flowrate.open("get", parse_string, true);
        xmlhttp_sub_flowrate.send();
    }
    else
    {
        $('#chart_sub_flowrate_area').css('display', 'none');
    }

    //bandwidth_in 注意，入口带宽和出口带宽是反的，所以这里名义上应该是出口带宽
    if($('#option_bandwidth_in').attr('selected') == 'selected')
    {
        $('#chart_bandwidth_in_area').css('display', 'block');

        //清空原数据
        if(chart_bandwidth_in != null)
        {
            chart_bandwidth_in.destroy();
        }
        options.title.text = '出口带宽';
        options.chart.renderTo = 'container_chart_bandwidth_in';
        chart_bandwidth_in = new Highcharts.Chart(options);

        if(window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp_bandwidth_in = new XMLHttpRequest();
        }
        else {
            // code for IE6, IE5
            xmlhttp_bandwidth_in = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp_bandwidth_in.onreadystatechange = function() {
            if (xmlhttp_bandwidth_in.readyState==4 && xmlhttp_bandwidth_in.status==200) {

                var ret = xmlhttp_bandwidth_in.responseText;
                //alert(ret);
                chart_bandwidth_in.addSeries(eval('(' + ret + ')'));
            }
        }

        parse_string = "/chart_data?type=broker&item=bandwidth_in";
        parse_string += "&cluster_name=" + selClusterName;
        parse_string += "&broker_name=" + selBrokerName;
        parse_string += "&stime=" + utime_start;
        parse_string += "&etime=" + utime_end;

        xmlhttp_bandwidth_in.open("get", parse_string, true);
        xmlhttp_bandwidth_in.send();
    }
    else
    {
        $('#chart_bandwidth_in_area').css('display', 'none');
    }

    //bandwidth_out 注意，入口带宽和出口带宽是反的，所以这里名义上应该是入口带宽
    if($('#option_bandwidth_out').attr('selected') == 'selected')
    {
        $('#chart_bandwidth_out_area').css('display', 'block');

        //清空原数据
        if(chart_bandwidth_out != null)
        {
            chart_bandwidth_out.destroy();
        }
        options.title.text = '入口带宽';
        options.chart.renderTo = 'container_chart_bandwidth_out';
        chart_bandwidth_out = new Highcharts.Chart(options);

        if(window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp_bandwidth_out = new XMLHttpRequest();
        }
        else {
            // code for IE6, IE5
            xmlhttp_bandwidth_out = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp_bandwidth_out.onreadystatechange = function() {
            if (xmlhttp_bandwidth_out.readyState==4 && xmlhttp_bandwidth_out.status==200) {

                var ret = xmlhttp_bandwidth_out.responseText;
                //alert(ret);
                chart_bandwidth_out.addSeries(eval('(' + ret + ')'));
            }
        }

        parse_string = "/chart_data?type=broker&item=bandwidth_out";
        parse_string += "&cluster_name=" + selClusterName;
        parse_string += "&broker_name=" + selBrokerName;
        parse_string += "&stime=" + utime_start;
        parse_string += "&etime=" + utime_end;

        xmlhttp_bandwidth_out.open("get", parse_string, true);
        xmlhttp_bandwidth_out.send();
    }
    else
    {
        $('#chart_bandwidth_out_area').css('display', 'none');
    }

    //connection_number
    if($('#option_connection_number').attr('selected') == 'selected')
    {
        $('#chart_connection_number_area').css('display', 'block');

        //清空原数据
        if(chart_connection_number != null)
        {
            chart_connection_number.destroy();
        }
        options.title.text = '连接数';
        options.chart.renderTo = 'container_chart_connection_number';
        chart_connection_number= new Highcharts.Chart(options);

        if(window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp_connection_number = new XMLHttpRequest();
        }
        else {
            // code for IE6, IE5
            xmlhttp_connection_number = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp_connection_number.onreadystatechange = function() {
            if (xmlhttp_connection_number.readyState==4 && xmlhttp_connection_number.status==200) {

                var ret = xmlhttp_connection_number.responseText;
                //alert(ret);
                chart_connection_number.addSeries(eval('(' + ret + ')'));
            }
        }

        parse_string = "/chart_data?type=broker&item=connection_number";
        parse_string += "&cluster_name=" + selClusterName;
        parse_string += "&broker_name=" + selBrokerName;
        parse_string += "&stime=" + utime_start;
        parse_string += "&etime=" + utime_end;

        xmlhttp_connection_number.open("get", parse_string, true);
        xmlhttp_connection_number.send();
    }
    else
    {
        $('#chart_connection_number_area').css('display', 'none');
    }

    //workload
    if($('#option_workload').attr('selected') == 'selected')
    {
        $('#chart_workload_area').css('display', 'block');

        //清空原数据
        if(chart_workload != null)
        {
            chart_workload.destroy();
        }
        options.title.text = '负载';
        options.chart.renderTo = 'container_chart_workload';
        chart_workload= new Highcharts.Chart(options);

        if(window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp_workload = new XMLHttpRequest();
        }
        else {
            // code for IE6, IE5
            xmlhttp_workload = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp_workload.onreadystatechange = function() {
            if (xmlhttp_workload.readyState==4 && xmlhttp_workload.status==200) {

                var ret = xmlhttp_workload.responseText;
                //alert(ret);
                chart_workload.addSeries(eval('(' + ret + ')'));
            }
        }

        parse_string = "/chart_data?type=broker&item=workload";
        parse_string += "&cluster_name=" + selClusterName;
        parse_string += "&broker_name=" + selBrokerName;
        parse_string += "&stime=" + utime_start;
        parse_string += "&etime=" + utime_end;

        xmlhttp_workload.open("get", parse_string, true);
        xmlhttp_workload.send();
    }
    else
    {
        $('#chart_workload_area').css('display', 'none');
    }

    //avg_disk_idle
    if($('#option_avg_disk_idle').attr('selected') == 'selected')
    {
        $('#chart_avg_disk_idle_area').css('display', 'block');

        //清空原数据
        if(chart_avg_disk_idle != null)
        {
            chart_avg_disk_idle.destroy();
        }
        options.title.text = '平均磁盘空闲';
        options.chart.renderTo = 'container_chart_avg_disk_idle';
        chart_avg_disk_idle= new Highcharts.Chart(options);

        if(window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp_avg_disk_idle = new XMLHttpRequest();
        }
        else {
            // code for IE6, IE5
            xmlhttp_avg_disk_idle = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp_avg_disk_idle.onreadystatechange = function() {
            if (xmlhttp_avg_disk_idle.readyState==4 && xmlhttp_avg_disk_idle.status==200) {

                var ret = xmlhttp_avg_disk_idle.responseText;
                //alert(ret);
                chart_avg_disk_idle.addSeries(eval('(' + ret + ')'));
            }
        }

        parse_string = "/chart_data?type=broker&item=avg_disk_idle";
        parse_string += "&cluster_name=" + selClusterName;
        parse_string += "&broker_name=" + selBrokerName;
        parse_string += "&stime=" + utime_start;
        parse_string += "&etime=" + utime_end;

        xmlhttp_avg_disk_idle.open("get", parse_string, true);
        xmlhttp_avg_disk_idle.send();
    }
    else
    {
        $('#chart_avg_disk_idle_area').css('display', 'none');
    }

    //lowest_disk_idle
    if($('#option_lowest_disk_idle').attr('selected') == 'selected')
    {
        $('#chart_lowest_disk_idle_area').css('display', 'block');

        //清空原数据
        if(chart_lowest_disk_idle != null)
        {
            chart_lowest_disk_idle.destroy();
        }
        options.title.text = '最低磁盘空闲';
        options.chart.renderTo = 'container_chart_lowest_disk_idle';
        chart_lowest_disk_idle= new Highcharts.Chart(options);

        if(window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp_lowest_disk_idle = new XMLHttpRequest();
        }
        else {
            // code for IE6, IE5
            xmlhttp_lowest_disk_idle = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp_lowest_disk_idle.onreadystatechange = function() {
            if (xmlhttp_lowest_disk_idle.readyState==4 && xmlhttp_lowest_disk_idle.status==200) {

                var ret = xmlhttp_lowest_disk_idle.responseText;
                //alert(ret);
                chart_lowest_disk_idle.addSeries(eval('(' + ret + ')'));
            }
        }

        parse_string = "/chart_data?type=broker&item=lowest_disk_idle";
        parse_string += "&cluster_name=" + selClusterName;
        parse_string += "&broker_name=" + selBrokerName;
        parse_string += "&stime=" + utime_start;
        parse_string += "&etime=" + utime_end;

        xmlhttp_lowest_disk_idle.open("get", parse_string, true);
        xmlhttp_lowest_disk_idle.send();
    }
    else
    {
        $('#chart_lowest_disk_idle_area').css('display', 'none');
    }

    $('#chart_tip_area').css("display", "block");
    $('#div_update_area').css("display", "block");
}

//更新趋势图到当前时间
function refreshToCurrent()
{
    updateToCurrentTime();
    load_chart();
}

//自动刷新每一秒的动作
var time_left = 30;
function fn_auto_refresh()
{
    time_left --;
    if(time_left < 0)
    {
        time_left = 30;
        refreshToCurrent();
    }
    $('#in_timeleft').html(time_left);
}

$(document).ready(function(){

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    //默认选定时间段为最近1天
    fastSelectTime(60*60*24*1);

    $('#selCluster').select2({
        placeholder: "选择一个集群",
    });
    $('#selBroker').select2({
        placeholder: "选择一个broker",
    });

    //初始时未选择cluster，broker列表和submit按钮禁用
    $('#selBroker').select2("enable", false);
    $('#submit').attr('disabled', true);

    //当cluster列表选项改变时的响应函数
    $('#selCluster').change(function(){

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

    //当submit按钮点击时的响应函数
    $('#submit').click(function(){
        load_chart();
    });

    //更新到最新按钮点击响应函数
    $('#btn_update').click(function(){
        refreshToCurrent();
    });

    //开启或关闭自动刷新
    $('#btn_auto_refresh').click(function(){

        if(auto_refresh == false)
        {
            auto_refresh = true;
            $('#btn_auto_refresh').removeClass('btn-success');
            $('#btn_auto_refresh').addClass('btn-danger');
            $('#btn_auto_refresh').text('关闭自动刷新');
            $('#out_timeleft').removeClass('hide');
            timer_refresh = window.setInterval('fn_auto_refresh()', 1000);
        }
        else
        {
            auto_refresh = false;
            window.clearInterval(timer_refresh);
            $('#btn_auto_refresh').removeClass('btn-danger');
            $('#btn_auto_refresh').addClass('btn-success');
            $('#btn_auto_refresh').text('开启自动刷新');
            $('#out_timeleft').addClass('hide');
        }
    });

    /*手动输入cluster*/
    $('#aCluster').click(function(){
        $('#s2id_selCluster').css("display", "none");
        $('#inputCluster').css("display", "block");
        $('#aCluster').css("display", "none");
        $('#s2id_selBroker').css("display", "none");
        $('#inputBroker').css("display", "block");
        $('#aBroker').css("display", "none");
        $('#submit').attr('disabled', false);
    });
    /*手动输入broker*/
    $('#aBroker').click(function(){
        $('#s2id_selBroker').css("display", "none");
        $('#inputBroker').css("display", "block");
        $('#aBroker').css("display", "none");
        $('#submit').attr('disabled', false);
    });

});
