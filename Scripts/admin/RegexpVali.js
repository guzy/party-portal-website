//Email输入格式验证
var emailReg = /^([\w\_\.])+@([\w]+\.)+([\w])+$/;
//手机号码输入格式验证
var MobileReg = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
//电话号码
var teleReg = /^(\d{3}-)?\d{8}|(\d{4}-)?(\d{7})$/;
//密码，由数字，字母及下划线，6-20位
var passwordReg = /^(\w){6,20}$/;
//输入中文，数字，字母及下划线
var morecharExp = /^[\u4e00-\u9fa5]*\w*$/g;
//邮政编码
var postCodeExp = /^[1-9]\d{5}(?!\d)$/;
//特殊字符
var diffentExp = /([~!@#$%&*()`=+,.?<>-]|\\|\/)/;
    
