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
var chart_sub_flowrate = null;
var chart_pub_flowrate = null;
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
    if($('#s2id_selPipelet').css("display") != "none")
    {
        var selPipeletName= $('#selPipelet').find("option:selected").text();
    }
    else
    {
        var selPipeletName = $('#inputPipelet').attr("value");
    }

    if(selClusterName == '')
    {
        alert('请填写cluster');
        return ;
    }
    if(selPipeletName == '')
    {
        alert('请填写pipelet');
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

    var parse_string = "/history_data?type=pipelet";
    parse_string += "&cluster_name=" + selClusterName;
    parse_string += "&pipelet_name=" + selPipeletName;
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

        parse_string = "/chart_data?type=pipelet&item=pub_qps";
        parse_string += "&cluster_name=" + selClusterName;
        parse_string += "&pipelet_name=" + selPipeletName;
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

        parse_string = "/chart_data?type=pipelet&item=pub_flowrate";
        parse_string += "&cluster_name=" + selClusterName;
        parse_string += "&pipelet_name=" + selPipeletName;
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

        parse_string = "/chart_data?type=pipelet&item=sub_flowrate";
        parse_string += "&cluster_name=" + selClusterName;
        parse_string += "&pipelet_name=" + selPipeletName;
        parse_string += "&stime=" + utime_start;
        parse_string += "&etime=" + utime_end;

        xmlhttp_sub_flowrate.open("get", parse_string, true);
        xmlhttp_sub_flowrate.send();
    }
    else
    {
        $('#chart_sub_flowrate_area').css('display', 'none');
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
    $('#selPipelet').select2({
        placeholder: "选择一个pipelet",
    });

    //初始时未选择cluster，pipe列表和submit按钮禁用
    $('#selPipelet').select2("enable", false);
    $('#submit').attr('disabled', true);

    //当cluster列表选项改变时的响应函数
    $('#selCluster').change(function(){

        //获取下级列表过程中禁用下级选择框和提交按钮
        $('#selPipelet').select2("enable", false);
        $('#submit').attr('disabled', true);
        $('#s2id_selPipelet > a > span').html('正在读取列表...');

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
                var selPipelet = document.getElementById('selPipelet');
                selPipelet.innerHTML = ret;

                if(selPipelet.length > 0)
                {
                    selPipelet[0].selected = true;
                    $('#s2id_selPipelet > a > span').html(selPipelet[0].value);

                    $('#selPipelet').select2("enable", true);
                    $('#submit').attr('disabled', false);
                }
                else
                {
                    $('#s2id_selPipelet > a > span').html('没有项目');
                    $('#submit').attr('disabled', true);
                }
            }
            //读取列表失败
        }
        var parse_string = "/history_pipelet_list?cluster_id=" + selClusterId;
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
        $('#s2id_selPipelet').css("display", "none");
        $('#inputPipelet').css("display", "block");
        $('#aPipelet').css("display", "none");
        $('#submit').attr('disabled', false);
    });
    /*手动输入Pipelet*/
    $('#aPipelet').click(function(){
        $('#s2id_selPipelet').css("display", "none");
        $('#inputPipelet').css("display", "block");
        $('#aPipelet').css("display", "none");
        $('#submit').attr('disabled', false);
    });

});
