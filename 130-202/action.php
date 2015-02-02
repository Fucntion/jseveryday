<?php
PHP:header('Content-Type:text/html;charset=utf-8');
	$con = mysql_connect("localhost","root","root");
	if (!$con){
	  die('Could not connect: ' . mysql_error());
	  }
	mysql_select_db("dami", $con);
	mysql_query("set names utf8");
	$result= mysql_query("SELECT count(*) FROM jx_question");
	$qeLength=mysql_fetch_array($result);
	$length=$qeLength[0]+0;
	$action=$_GET["action"];

	if($action=='getquestion'){
		$id=rand(1,$length);
		$row=mysql_query("SELECT * FROM jx_question where id=".$id);
		$data=mysql_fetch_array($row);
		$newData= array ();
		$newData[0]=$data[0];
		$newData[1]=$data[1];
		$newData[2]=$data[2];
		echo json_encode($data);
	}else if($action=='dati'){
		$id=$_GET["id"];
		$select=$_GET["select"];
		$row=mysql_query("SELECT * FROM jx_question where id=".$id);
		$data=mysql_fetch_array($row);
		// var_dump($data[2]);exit();
		if($data[2]==$select){
			echo 'true';
		}else{
			echo 'fasle';
		}
	}


