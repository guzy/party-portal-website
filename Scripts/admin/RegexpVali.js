//Email�����ʽ��֤
var emailReg = /^([\w\_\.])+@([\w]+\.)+([\w])+$/;
//�ֻ����������ʽ��֤
var MobileReg = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
//�绰����
var teleReg = /^(\d{3}-)?\d{8}|(\d{4}-)?(\d{7})$/;
//���룬�����֣���ĸ���»��ߣ�6-20λ
var passwordReg = /^(\w){6,20}$/;
//�������ģ����֣���ĸ���»���
var morecharExp = /^[\u4e00-\u9fa5]*\w*$/g;
//��������
var postCodeExp = /^[1-9]\d{5}(?!\d)$/;
//�����ַ�
var diffentExp = /([~!@#$%&*()`=+,.?<>-]|\\|\/)/;
    