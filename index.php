<?php
	session_start();
	include "include/almyDb.class";
	include "include/function.php";
	$db =  almyDb::getDB();  
	
	// si l'user est pas connecté, et qu'il n'y a pas de requette de connexion, la page d'accueil est affiché
	if((!isset($_SESSION['id'])) && ((!isset($_GET['do'])) || ($_GET['do'] != "login"))) {
		include "controllers/show_c.php";
		include "view/show_v.php";
	}
	else {
		if(!isset($_GET['do']) && (isset($_SESSION['id']))) {
			include "controllers/admin_c.php";
			include "view/admin_v.php";
		}else{
			switch ($_GET['do']) {
				case 'login':
					include "controllers/connexion_c.php";
					break;
				case 'logout':
					include "controllers/deconnexion_c.php";
					break;
				default:
					include "controllers/show_c.php";
					include "view/show_v.php";
					break;
			}
		}
	}
?>