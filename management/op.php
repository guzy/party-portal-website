<?php
session_start();
if(!isset($_SESSION['user']) || $_SESSION['user']!="admin"){
	echo "<script>location.href='/Account/Login.php'</script>"; // JS 跳转 
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
		<title>后台管理</title>
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
	
		<h3>文章管理</h3>
		  <div class="row-fluid" name="commandPositon">
                    <div class="span12">

                      <div class="widget-box collapsible">
			 <div class="widget-title">
                                <ul class="nav nav-tabs" style="float:right" id="commandTab">
                                    <li class="active" style="border-left-width:1px;border-left-style:solid;border-left-color:#DDDDDD">
                                        <a data-toggle="tab" href="#tab1">添加文章</a>
                                    </li>
                                    
                                    <li>
                                        <a data-toggle="tab" href="#tab2">删除文章</a>
                                    </li>
                                    
                                </ul>
			 </div>

		      <div class="widget-content tab-content in nopadding" id="commandContent" style="width:100%;padding:0">
<!--添加文章开始-->
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
					<label class="submitFormLabel">文章所属类别:</label>
				</td>
				<td width="80%">
					<select name="dalei" id="dalei" onchange="getContent();" >
						<option value="" >请选择文章所属大类</option>
							
						<option value="wenjianguizhang">文件规章 </option>
							
						<option value="zuzhijianshe">组织建设 </option>
							
						<option value="xueshengdangjian">学生党建 </option>
							
						<option value="lilunxuexi">理论学习 </option>
						<option value="xueshenghui">软件所学生会 </option>
						<option value="tongzhigonggao">通知公告 </option>
					</select>
				</td>
				<td width="80%">
					<select name="zhonglei" id="zhonglei" >
						<option value="" >请选择文章所属小类</option>
<script language="Javascript" type="text/javascript">
function getContent()
{
	if($("#dalei").val() == "wenjianguizhang"){
		$("#zhonglei").empty();
		$("#zhonglei").append("<option value='"+""+"'>"+"请选择文章所属小类"+"</option>");
		$("#zhonglei").append("<option value='"+"dangguidangzhang"+"'>"+"党规党章"+"</option>"); 
		$("#zhonglei").append("<option value='"+"zhongyaowenjian"+"'>"+"重要文件"+"</option>");
	        $("#zhonglei").append("<option value='"+"guizhangzhidu"+"'>"+"规章制度"+"</option>"); 	
	}
	if($("#dalei").val() == "zuzhijianshe"){
		$("#zhonglei").empty();
		$("#zhonglei").append("<option value='"+""+"'>"+"请选择文章所属小类"+"</option>");
		$("#zhonglei").append("<option value='"+"zuzhigoucheng"+"'>"+"组织构成"+"</option>"); 
		$("#zhonglei").append("<option value='"+"ganbugongzuo"+"'>"+"干部工作"+"</option>");
		$("#zhonglei").append("<option value='"+"dangyuanfazhan"+"'>"+"党员发展"+"</option>"); 
		$("#zhonglei").append("<option value='"+"zhibushenghuo"+"'>"+"支部生活"+"</option>");
	        $("#zhonglei").append("<option value='"+"tongzhangongzuo"+"'>"+"统战工作"+"</option>");
	}
	if($("#dalei").val() == "xueshengdangjian"){
		$("#zhonglei").empty();
		$("#zhonglei").append("<option value='"+""+"'>"+"请选择文章所属小类"+"</option>");
		$("#zhonglei").append("<option value='"+"zhidaoxingwenjian"+"'>"+"指导性文件"+"</option>"); 
		$("#zhonglei").append("<option value='"+"zhibujianshe"+"'>"+"支部建设"+"</option>");
		$("#zhonglei").append("<option value='"+"zhutihuodong"+"'>"+"主题活动"+"</option>"); 
		$("#zhonglei").append("<option value='"+"xueshengdangxiao"+"'>"+"学生党校"+"</option>");
	        $("#zhonglei").append("<option value='"+"yantaojiaoliu"+"'>"+"研讨交流"+"</option>");
	}
	if($("#dalei").val() == "lilunxuexi"){
		$("#zhonglei").empty();
		$("#zhonglei").append("<option value='"+""+"'>"+"请选择文章所属小类"+"</option>");
		$("#zhonglei").append("<option value='"+"dangshizhishi"+"'>"+"党史知识"+"</option>"); 
		$("#zhonglei").append("<option value='"+"dangjianyanjiu"+"'>"+"党建研究"+"</option>");
		$("#zhonglei").append("<option value='"+"wenxianziliao"+"'>"+"文献资料"+"</option>"); 
		$("#zhonglei").append("<option value='"+"gongzuodiaoyan"+"'>"+"工作调研"+"</option>");

	}
	if($("#dalei").val() == "" || $("#dalei").val() == "tongzhigonggao"||$("#dalei").val() == "xueshenghui"){
		$("#zhonglei").empty();
		$("#zhonglei").append("<option value='"+""+"'>"+"请选择文章所属小类"+"</option>");
	}
}
</script>
				
					</select>
				</td>
			</tr>
			<br/>
			<tr>
				<td width="20%" align="right" height="35">
					<label class="submitFormLabel">文章题目:</label>
				</td>
				<td width="80%">
					<input type="text" name="timu" />
				</td>

				<td width="20%" align="right" height="35">
					<label class="submitFormLabel">作者:</label>
				</td>
				<td width="80%">
					<input type="text" name="zuozhe" />
				</td>

				<td width="20%" align="right" height="35">
					<label class="submitFormLabel">来源:</label>
				</td>
				<td width="80%">
					<input type="text" name="laiyuan" />
				</td>
			</tr>
		      
		
			<textarea name="content" style="width:1500px;height:400px;visibility:hidden;"></textarea>
			<textarea name="content1" id="content1" style="width:0px;height:0px;visibility:hidden;"></textarea>
			<p>
				<input type="button" name="clear" value="清空内容" />
				<input type="submit" name="submit1" class="btn btn-primary"></a>
			</p>
		       </form>
		     </div>
<!--添加文章结束-->

<!--删除文章开始-->

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
					<label class="submitFormLabel">文章所属类别:</label>
				</td>
				<td width="80%">
					<select name="dalei" id="dalei" onchange="getContent();" >
						<option value="" >请选择文章所属大类</option>
							
						<option value="wenjianguizhang">文件规章 </option>
							
						<option value="zuzhijianshe">组织建设 </option>
							
						<option value="xueshengdangjian">学生党建 </option>
							
						<option value="lilunxuexi">理论学习 </option>
						<option value="xueshenghui">软件所学生会 </option>
						<option value="tongzhigonggao">通知公告 </option>
					</select>
				</td>
			
			</tr>
			<br/>
			<tr>
				<td width="20%" align="right" height="35">
					<label class="submitFormLabel">文章题目:</label>
				</td>
				<td width="80%">
					<input type="text" name="timu" />
				</td>

			</tr>
		      
		
			<p>
				<input type="submit" name="submit2" class="btn btn-primary" value="确认删除"></a>
			</p>
		       </form>
		     </div>
		    </div>
<!--删除文章结束-->
	     </div>
	</body>
    <script src="/js/jquery.min.js"></script>
    <script src="/Scripts/bootstrap.min.js"></script>
    <script src="/Scripts/jquery.ui.custom.js"></script>
    <script src="/Scripts/jquery.validate.js"></script>
</html>

