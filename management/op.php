<?php
session_start();
if(!isset($_SESSION['user']) || $_SESSION['user']!="admin"){
	echo "<script>location.href='/Account/Login.php'</script>"; // JS ��ת 
}
date_default_timezone_set('PRC');
?>

<!doctype html>
<html>
	<head>
		<meta http-equiv="x-ua-compatible" content="ie=7";charset="utf-8" />
			<link rel="stylesheet" href="/css/bootstrap.min.css" />
			<link rel="stylesheet" href="/css/bootstrap-responsive.min.css" />
			<link rel="stylesheet" href="/css/bigpipe.main.css" />
			<link rel="stylesheet" href="/css/bigpipe.grey.css" class="skin-color" />
        		<link rel="stylesheet" href="/css/select2.css">
		<title>��̨����</title>
		<style>
			form {
				margin: 0;
			}
			textarea {
				display: block;
			}
		</style>
		<link rel="stylesheet" href="../content/default.css" />
		<script charset="utf-8" src="/editor/kindeditor.js"></script>
		<script charset="utf-8" src="/editor/lang/zh_CN.js"></script>
 		<script src="/Scripts/jquery-1.3.2.min.js" type="text/javascript"></script>
		<script>
			var editor;
			KindEditor.ready(function(K) {
				editor = K.create('textarea[name="content"]', {
					allowFileManager : true
				});
				K('input[name=isEmpty]').click(function(e) {
					alert(editor.isEmpty());
				});
				K('input[name=clear]').click(function(e) {
					editor.html('');
				});
			});
		</script>
	</head>
	<body>
		<script type="text/javascript">
		</script>
	
		<h3>���¹���</h3>
		  <div class="row-fluid" name="commandPositon">
                    <div class="span12">

                      <div class="widget-box collapsible">
			 <div class="widget-title">
                                <ul class="nav nav-tabs" style="float:right" id="commandTab">
                                    <li class="active" style="border-left-width:1px;border-left-style:solid;border-left-color:#DDDDDD">
                                        <a data-toggle="tab" href="#tab1">�������</a>
                                    </li>
                                    
                                    <li>
                                        <a data-toggle="tab" href="#tab2">ɾ������</a>
                                    </li>
                                    
                                </ul>
			 </div>

		      <div class="widget-content tab-content in nopadding" id="commandContent" style="width:100%;padding:0">
<!--������¿�ʼ-->
		       <div id="tab1" class="tab-pane active">
			<form action="op#tab1" method="post" class="form-horizontal" id="op_validate_tab1">
<?php
if(isset($_POST['submit1'])){
	$con=mysql_connect("127.0.0.1","root","000000","dangjianwenzhang") or die("error connecting");
mysql_query('set names gbk');
	mysql_select_db('dangjianwenzhang');
	$sql = "select max(timubianhao) from content";
	$timubianhao = mysql_query($sql, $con);

	$dalei = $_POST["dalei"];
	$zhonglei = $_POST["zhonglei"];
	$timu = $_POST["timu"];
	$zhengwen = $_POST["content"];
	$laiyuan = $_POST["laiyuan"];
	$zuozhe = $_POST["zuozhe"];
	$fabushijian = date("Y-m-d H:i:s");

	$sql = "insert into content values('$dalei', '$zhonglei', '$timubianhao', '$timu', '$zhengwen', '$fabushijian', '$laiyuan', '$zuozhe')";
	$result = mysql_query($sql, $con);
}
?>
			<tr>
				<td width="20%" align="right" height="35">
					<label class="submitFormLabel">�����������:</label>
				</td>
				<td width="80%">
					<select name="dalei" id="dalei" onchange="getContent();" >
						<option value="" >��ѡ��������������</option>
							
						<option value="wenjianguizhang">�ļ����� </option>
							
						<option value="zuzhijianshe">��֯���� </option>
							
						<option value="xueshengdangjian">ѧ������ </option>
							
						<option value="lilunxuexi">����ѧϰ </option>
						<option value="xueshenghui">�����ѧ���� </option>
						<option value="tongzhigonggao">֪ͨ���� </option>
					</select>
				</td>
				<td width="80%">
					<select name="zhonglei" id="zhonglei" >
						<option value="" >��ѡ����������С��</option>
<script language="Javascript" type="text/javascript">
function getContent()
{
	if($("#dalei").val() == "wenjianguizhang"){
		$("#zhonglei").empty();
		$("#zhonglei").append("<option value='"+""+"'>"+"��ѡ����������С��"+"</option>");
		$("#zhonglei").append("<option value='"+"dangguidangzhang"+"'>"+"���浳��"+"</option>"); 
		$("#zhonglei").append("<option value='"+"zhongyaowenjian"+"'>"+"��Ҫ�ļ�"+"</option>");
	        $("#zhonglei").append("<option value='"+"guizhangzhidu"+"'>"+"�����ƶ�"+"</option>"); 	
	}
	if($("#dalei").val() == "zuzhijianshe"){
		$("#zhonglei").empty();
		$("#zhonglei").append("<option value='"+""+"'>"+"��ѡ����������С��"+"</option>");
		$("#zhonglei").append("<option value='"+"zuzhigoucheng"+"'>"+"��֯����"+"</option>"); 
		$("#zhonglei").append("<option value='"+"ganbugongzuo"+"'>"+"�ɲ�����"+"</option>");
		$("#zhonglei").append("<option value='"+"dangyuanfazhan"+"'>"+"��Ա��չ"+"</option>"); 
		$("#zhonglei").append("<option value='"+"zhibushenghuo"+"'>"+"֧������"+"</option>");
	        $("#zhonglei").append("<option value='"+"tongzhangongzuo"+"'>"+"ͳս����"+"</option>");
	}
	if($("#dalei").val() == "xueshengdangjian"){
		$("#zhonglei").empty();
		$("#zhonglei").append("<option value='"+""+"'>"+"��ѡ����������С��"+"</option>");
		$("#zhonglei").append("<option value='"+"zhidaoxingwenjian"+"'>"+"ָ�����ļ�"+"</option>"); 
		$("#zhonglei").append("<option value='"+"zhibujianshe"+"'>"+"֧������"+"</option>");
		$("#zhonglei").append("<option value='"+"zhutihuodong"+"'>"+"����"+"</option>"); 
		$("#zhonglei").append("<option value='"+"xueshengdangxiao"+"'>"+"ѧ����У"+"</option>");
	        $("#zhonglei").append("<option value='"+"yantaojiaoliu"+"'>"+"���ֽ���"+"</option>");
	}
	if($("#dalei").val() == "lilunxuexi"){
		$("#zhonglei").empty();
		$("#zhonglei").append("<option value='"+""+"'>"+"��ѡ����������С��"+"</option>");
		$("#zhonglei").append("<option value='"+"dangshizhishi"+"'>"+"��ʷ֪ʶ"+"</option>"); 
		$("#zhonglei").append("<option value='"+"dangjianyanjiu"+"'>"+"�����о�"+"</option>");
		$("#zhonglei").append("<option value='"+"wenxianziliao"+"'>"+"��������"+"</option>"); 
		$("#zhonglei").append("<option value='"+"gongzuodiaoyan"+"'>"+"��������"+"</option>");

	}
	if($("#dalei").val() == "" || $("#dalei").val() == "tongzhigonggao"||$("#dalei").val() == "xueshenghui"){
		$("#zhonglei").empty();
		$("#zhonglei").append("<option value='"+""+"'>"+"��ѡ����������С��"+"</option>");
	}
}
</script>
				
					</select>
				</td>
			</tr>
			<br/>
			<tr>
				<td width="20%" align="right" height="35">
					<label class="submitFormLabel">������Ŀ:</label>
				</td>
				<td width="80%">
					<input type="text" name="timu" />
				</td>

				<td width="20%" align="right" height="35">
					<label class="submitFormLabel">����:</label>
				</td>
				<td width="80%">
					<input type="text" name="zuozhe" />
				</td>

				<td width="20%" align="right" height="35">
					<label class="submitFormLabel">��Դ:</label>
				</td>
				<td width="80%">
					<input type="text" name="laiyuan" />
				</td>
			</tr>
		      
		
			<textarea name="content" style="width:1500px;height:400px;visibility:hidden;"></textarea>
			<textarea name="content1" id="content1" style="width:0px;height:0px;visibility:hidden;"></textarea>
			<p>
				<input type="button" name="clear" value="�������" />
				<input type="submit" name="submit1" class="btn btn-primary"></a>
			</p>
		       </form>
		     </div>
<!--������½���-->

<!--ɾ�����¿�ʼ-->

<?php
if(isset($_POST['submit2'])){
	$con=mysql_connect("127.0.0.1","root","000000","dangjianwenzhang") or die("error connecting");
	mysql_select_db('dangjianwenzhang');
	mysql_query('set names gbk');
	$dalei=$_POST["dalei"];
	$timu=$_POST["timu"];
	//$sql = "delete from content where dalei='".$_POST["dalei"]."' and timu='".$_POST["timu"]."'";
	$sql="delete from content where locate(`timu`,'$timu')>0";
	mysql_query($sql, $con);
}
?> 
		       <div id="tab2" class="tab-pane">
			<form action="op#tab2" method="post" class="form-horizontal" id="op_validate_tab2">
			<tr>
				<td width="20%" align="right" height="35">
					<label class="submitFormLabel">�����������:</label>
				</td>
				<td width="80%">
					<select name="dalei" id="dalei" onchange="getContent();" >
						<option value="" >��ѡ��������������</option>
							
						<option value="wenjianguizhang">�ļ����� </option>
							
						<option value="zuzhijianshe">��֯���� </option>
							
						<option value="xueshengdangjian">ѧ������ </option>
							
						<option value="lilunxuexi">����ѧϰ </option>
						<option value="xueshenghui">�����ѧ���� </option>
						<option value="tongzhigonggao">֪ͨ���� </option>
					</select>
				</td>
			
			</tr>
			<br/>
			<tr>
				<td width="20%" align="right" height="35">
					<label class="submitFormLabel">������Ŀ:</label>
				</td>
				<td width="80%">
					<input type="text" name="timu" />
				</td>

			</tr>
		      
		
			<p>
				<input type="submit" name="submit2" class="btn btn-primary" value="ȷ��ɾ��"></a>
			</p>
		       </form>
		     </div>
		    </div>
<!--ɾ�����½���-->
	     </div>
	</body>
    <script src="/js/jquery.min.js"></script>
    <script src="/Scripts/bootstrap.min.js"></script>
    <script src="/Scripts/jquery.ui.custom.js"></script>
    <script src="/Scripts/jquery.validate.js"></script>
</html>

