<?php
	if(isset($_GET['upload'])) {
		$name = md5(rand().time()."AlmyUnPluginJQuery").'.jpg';
		$targetpath = 'upload/'.$name;
		if(move_uploaded_file($_FILES['file']['tmp_name'], $targetpath)) {
			$retour = $db->addImage($targetpath, createMin($targetpath));
			$_SESSION['upload'] = 1;
		}
		header("location: index.php");
		die();
	}
	
	$listeCat = $db->getListeCategorie();
	$listeImg = $db->getListeImage();
?>