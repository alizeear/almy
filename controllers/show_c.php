<?php session_start(); ?>
<?php
	if (empty($_POST['login']) || empty($_POST['password'])) {
		$error = "Login ou mot de passe non remplis";
		echo $error;
	}else{
		

		$_login = $data['login'];
		$_SESSION['login'] = $_login;

		if (!empty($_SESSION['login'])) {
			header("location:../home.php"); 
		}
	}
 ?>