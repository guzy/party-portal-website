function fastSelectTime(time)
{
    var curTime = new Date();
    var curUnixTime = curTime.getTime();
    var preUnixTime = curUnixTime - time*1000;
    var preTime = new Date();
    preTime.setTime(preUnixTime);
    document.getElementById('dateInputStart').value = Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', preTime);
    document.getElementById('dateInputEnd').value = Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', curTime);
}

function updateToCurrentTime()
{
    var curTime = new Date();
    var curUnixTime = curTime.getTime();
    document.getElementById('dateInputEnd').value = Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', curTime);
}

//普通时间toUNIX时间
function get_unixtime(str)
{
    //规范日期格式，解决firefox中日期错误问题
    str = str.replace(/-/g, "/");
    var date = new Date(str);
    /*
    var unixtime = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(),
                date.getHours(), date.getMinutes(), date.getSeconds()));

    //unixtime 为当前UTC时间距离1970/01/01 00:00:00的毫秒数
    return unixtime.getTime()/1000 + date.getTimezoneOffset()*60;
    */
    return date.getTime()/1000;
}

