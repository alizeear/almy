<?php
	if (empty($_POST['login']) || empty($_POST['password'])) {
		$error = "Login ou mot de passe non remplis";
	}else{
		
		$tmp = $db->traitementConnexion($_POST['login'], $_POST['password']);

		$_SESSION['id'] = $tmp['id'];


		if (!empty($_SESSION['id'])) {
			header("location: index.php"); 
		}
	}
 ?>