var chart = new Array();
chart['pub_qps'] = null;
chart['pub_flowrate'] = null;
chart['sub_flowrate'] = null;
chart['bandwidth_in'] = null;
chart['bandwidth_out'] = null;
chart['connection_number'] = null;
chart['workload'] = null;
chart['avg_disk_idle'] = null;
chart['lowest_disk_idle'] = null;

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


//点击某一项历史数据
function checkbox_clicked(checkbox)
{
    var xmlhttp;
    //alert(checkbox.value);

    var para = eval('(' + checkbox.value + ')');

    if(checkbox.checked) {

        var startTime = document.getElementById('dateInputStart').value;
        var endTime = document.getElementById('dateInputEnd').value;
        var unixtimeStart = get_unixtime(startTime);
        var unixtimeEnd = get_unixtime(endTime);

        if(unixtimeStart > unixtimeEnd)
        {
            $('#timeWrongAlert', window.parent.document).modal();
            checkbox.checked = false;
            return ;
        }
        //选择时间段超过10天，提示用户
        if(unixtimeEnd - unixtimeStart > 60*60*24*10)
        {
            //显示提示信息
            $('#timeTooLongAlert', window.parent.document).modal();
            checkbox.checked = false;
            return ;
        }

        if(chart[para.item] == null)
        {
            if(para.item == 'pub_qps')
            {
                options.title.text = 'pub qps';
            }
            else if(para.item == 'sub_flowrate')
            {
                options.title.text = '订阅流量';
            }
            else if(para.item == 'pub_flowrate')
            {
                options.title.text = '发布流量';
            }
            //注意，这里入口带宽和出口带宽是相反的
            else if(para.item == 'bandwidth_out')
            {
                options.title.text = '入口带宽';
            }
            else if(para.item == 'bandwidth_in')
            {
                options.title.text = '出口带宽';
            }
            else if(para.item == 'connection_number')
            {
                options.title.text = '连接数';
            }
            else if(para.item == 'workload')
            {
                options.title.text = '负载';
            }
            else if(para.item == 'avg_disk_idle')
            {
                options.title.text = '平均磁盘空闲率';
            }
            else if(para.item == 'lowest_disk_idle')
            {
                options.title.text = '最低磁盘空闲率';
            }
            options.chart.renderTo = 'container_chart_' + para.item;
            chart[para.item] = new Highcharts.Chart(options);

        }

        for(var i=0; i < chart[para.item].series.length; i++)
        {
            if(chart[para.item].series[i].name == checkbox.name)
            {
                alert('该项历史趋势图已经显示在图表区域');
                return ;
            }
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
                chart[para.item].addSeries(eval('(' + ret + ')'));

                //这个地方用这句话会使Highcharts出现错误，原因不明
                //chart.addSeries(eval('(' + xmlhttp.responseText + ')'));
                
            }
        }

        var parse_string = "/chart_data?"; 
        if(para.type == 'pipe')
        {
            parse_string += 'type=pipe';
            parse_string += '&item=' + para.item;
            parse_string += '&cluster_name=' + para.cluster_name;
            parse_string += '&pipe_name=' + para.pipe_name;
        }
        else if(para.type == 'pipelet')
        {
            parse_string += 'type=pipelet';
            parse_string += '&item=' + para.item;
            parse_string += '&cluster_name=' + para.cluster_name;
            parse_string += '&pipelet_name=' + para.pipelet_name;
        }
        else if(para.type == 'broker')
        {
            parse_string += 'type=broker';
            parse_string += '&item=' + para.item;
            parse_string += '&cluster_name=' + para.cluster_name;
            parse_string += '&broker_name=' + para.broker_name;
        }

        parse_string += "&stime=" + unixtimeStart;
        parse_string += "&etime=" + unixtimeEnd;
        xmlhttp.open("get", parse_string, true);
        xmlhttp.send();

    }
    //删除某行数据
    else
    {
        if(chart[para.item] == null)
        {
            alert('所选项已不在趋势图中');
            return ;
        }
        for(var i=0; i<chart[para.item].series.length; i++)
        {
            if(chart[para.item].series[i].name == checkbox.name)
            {
                chart[para.item].series[i].remove();
                if(chart[para.item].series.length == 0)
                {
                    chart[para.item].destroy();
                    chart[para.item] = null;
                }
                return ;
            }
        }
        alert('所选项已不在趋势图中');
        return ;
    }
}

$(document).ready(function(){

    //禁用UTC时间，否则会有8小时时差
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    //默认选定时间段为最近1天
    fastSelectTime(60*60*24*1);
});
