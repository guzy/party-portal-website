


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>
	
   �û���½

</title><meta http-equiv="x-ua-compatible" content="ie=7" /><link href="../Content/Site.css" rel="stylesheet" type="text/css" /></head>

<body>
    <div class="page">

        <div id="header">
            <div id="title">
                <h1>�й���ѧԺ����о���ѧ����������̨����ϵͳ</h1>
            </div>
              
            <div id="logindisplay">
                 
        [ <a href="/Account/Login" target="_top">��¼</a> ]

            </div> 
            
            <div id="menucontainer">
            
               
            </div>
        </div>

        <div id="main">
               

    <script src="../../Scripts/jquery-1.3.2.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="/Scripts/Admin/RegexpVali.js"></script>
    <script type="text/javascript">

        function shiftfocus() {
            var keychar, fn, fesum, i, j, k, fsum;
            var fname = event.srcElement.name;
            if (document.layers)   //ns   
            {
                document.captureEvents(event.keydown);
                kechar = event.which;
            }
            if (document.all)   //IE     
                keychar = event.keyCode;
            if (keychar == 13) {
                fsum = document.forms.length;
                if (fname != null) {
                    for (i = 0; i < fsum; i++) {
                        fesum = document.forms[i].elements.length;
                        for (j = 0; j < fesum; j++) {
                            if (fname == document.forms[i].elements[j].name) {
                                if (document.forms[i].elements[j].type == "textarea")
                                    return;
                                if (document.forms[i].elements[j].type == "submit" || document.forms[i].elements[j].type == "reset" || document.forms[i].elements[j].type == "button") {
                                    document.forms[i].elements[j].click();
                                    return false;
                                }
                                k = j + 1;
                                if (k >= fesum) {
                                    i++;
                                    k = 0;
                                }
                                if (i >= fsum) {
                                    i = 0;
                                    k = 0;
                                }
                                for (; document.forms[i].elements[k].type == "hidden"; k++);
                                document.forms[i].elements[k].focus();
                                if (document.forms[i].elements[k].type == "submit" || document.forms[i].elements[k].type == "reset" || document.forms[i].elements[k].type == "button") {
                                    document.forms[i].elements[k].click();
                                    return false;
                                }

                                return false;
                            } //if   
                        } //for   
                    } //for   
                } //if   
                document.forms[0].elements[0].focus();
                return false;
            } //if   
        } //function
        document.onkeydown = shiftfocus;
        
        $(document).ready(function() {
            $("#username").focus();
        });

        function CheckLogin() {
            var name = document.getElementsByName("username")[0];
            var password = document.getElementsByName("pwd")[0];
            if (name.value == "") {
                alert("�û�������Ϊ��!");
                return false;
            }
            if (password.value == "") {
                alert("���벻��Ϊ��!");
                return false;
            }
            if (password.value.length < 6) {
                alert("���볤�Ȳ�������6λ!");
                return false;
	    }
	    if(password.value != "admin0" || name.value != "admin"){
		    alert("�û������������");
		    return false;
	    }

<?php 
session_start();
$_SESSION['user'] = "admin";
?>
            return true;
        }
       
    </script>
   
    
    
    <form action="/management/op" method="post" on_submit="checkpost()">
        <div>
            <fieldset>
                <legend>�û���Ϣ</legend>
                <p>
                    <label for="username">�û���:</label>
                    <input id="username" name="username" type="text" value="" />
                    
                </p>
                <p>
                    <label for="pwd">����:</label>
                    <input id="pwd" name="pwd" type="password" />
                    
                </p>
                
                <p>
                    <input type="submit" value="��½" onclick="return CheckLogin();" />
                </p>
                
            </fieldset>
        </div>
    </form>
<script>


            <div id="footer">
            </div>
        </div>
    </div>
</body>
</html>

