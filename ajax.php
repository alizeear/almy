<?php
	session_start();
	include "include/almyDb.class";
	include "include/function.php";
	$db = almyDb::getDB();
	
	if(isset($_SESSION['id']) && !empty($_SESSION['id'])) {
		switch($_GET['do']) {
			case "addCat":
				if($_POST['name'] != "") {
					$retour = $db->addCategorie($_POST['name']);
					$list = $db->getListeCategorie();
					echo json_encode(array($retour, $list));
				}
				else {
					$list = $db->getListeCategorie();
					echo json_encode(array(false, $list));
				}
				break;
			case "updateCat":
				$retour = $db->updateCategorie($_POST['id'], $_POST['name']);
				$list = $db->getListeCategorie();
				echo json_encode(array($retour, $list));
				break;
			case "deleteCat":
				$retour = $db->deleteCategorie($_POST['id']);
				$list = $db->getListeCategorie();
				echo json_encode(array($retour, $list));
				break;
			case "getCat":
				$list = $db->getListeCategorie();
				echo json_encode($list);
				break;
			case "searchCat":
				$list = $db->getListeCategorie($_POST['search']);
				echo json_encode($list);
				break;
			case "getCatImg":
				$list = $db->getListeCategorieImg($_POST['id']);
				echo json_encode($list);
				break;
			case "getImg":
				$list = $db->getListeImage();
				echo json_encode($list);
				break;
			case "searchImg":
				$list = $db->getListeSearchImage($_POST['search']);
				echo json_encode($list);
				break;
			case "addImage":
				$targetpath = add_picture($_POST['file']);
				$retour = $db->addImage($targetpath, createMin($targetpath));

				$list = $db->getListeImage();
				echo json_encode(array($retour, $list));
				break;
			case "updateImg":
				// echo "/*";
				// print_r($_POST);
				// echo "*/";
				$retour2 = $db->updateImage($_POST['id'], array(
					'title'=>$_POST['title'],
					'descr'=>$_POST['descr']
				));
				$retour = true;
				
				$list = $db->getListeIdCategorieImg($_POST['id']);
				if(isset($_POST['cat']) && !empty($_POST['cat'])) {
					foreach($list as $temp) {
						if(!in_array($temp, $_POST['cat'])) {
							$retour = (($retour) ? $db->removeCatImage($_POST['id'], $temp) : $retour);
						}
					}
				}
				else {
					foreach($list as $temp) {
						$retour = (($retour) ? $db->removeCatImage($_POST['id'], $temp) : $retour);
					}
				}

				$list = $db->getListeIdCategorieImg($_POST['id']);
				if(isset($_POST['cat']) && !empty($_POST['cat'])) {
					foreach($_POST['cat'] as $temp) {
						if(!in_array($temp, $list)) {
							$retour = (($retour) ? $db->addCatImage($_POST['id'], $temp) : $retour);
						}
					}
				}

				$list = $db->getListeImage();
				echo json_encode(array($retour, $list, $retour2));
				break;
			case "deleteImg":
				$image = $db->getImage($_POST['id']);
				$retour = $db->deleteImage($_POST['id']);
				$retour2 = $db->removeAllCatImage($_POST['id']);
				$list = $db->getListeImage();
				unlink($image['url']);
				if($image['url'] != $image['url_min'])
					unlink($image['url_min']);
				echo json_encode(array($retour, $list, $retour2));
				break;
			case "checkAllLink":
				$retour = $db->checkAllLink();
				$list = $db->getListeImage();
				echo json_encode(array($retour, $list));
				break;
			case "updateUser":
				$retour = false;
				$temp = $db->getUser(isset($_POST['id'])? $_POST['id'] : $_SESSION['id']);
				if(isset($_POST['old']) && isset($_POST['new'])) {
					if($temp['pass'] == md5($_POST['old'])) {
						$retour = $db->updateUser((isset($_POST['id'])? $_POST['id'] : $_SESSION['id']), Array("pass" => md5($_POST['new'])));
					}
				}
				if(isset($_POST['name'])) {
					$_SESSION['name'] = $_POST['name'];
					$retour = $db->updateUser((isset($_POST['id'])? $_POST['id'] : $_SESSION['id']), Array("name" => $_POST['name']));
				}
				echo json_encode(array($retour));
				break;
			case "getOptions": 
				$list = $db->getOption();
				echo json_encode($list);
				break;
			case "updateOption": 
				if(isset($_POST['id'])) {
					$retour = $db->updateOption($_POST['id'], $_POST['attribut'], $_POST['value'], $_POST['active']);
				}
				else {
					$retour = false;
				}
				$list = $db->getOption();
				echo json_encode(array($retour, $list));
				break;
			case "deleteOption": 
				if(isset($_POST['id'])) {
					$retour = $db->deleteOption($_POST['id']);
				}
				else {
					$retour = false;
				}
				$list = $db->getOption();
				echo json_encode(array($retour, $list));
				break;
			case "addOption": 
				$retour = $db->addOption($_POST['attribut'], $_POST['value'], $_POST['active']);
				$list = $db->getOption();
				echo json_encode(array($retour, $list));
				break;
			case "updateOptions": 
				$retour = true;
				$opts = json_decode($_POST['options']);
				foreach($opts as $opt) {
					if($opt->id == -1) 
						$db->addOption($opt->attribut, $opt->value, $opt->active);
					else 
						$db->updateOption($opt->id, $opt->attribut, $opt->value, $opt->active);
				}
				$list = $db->getOption();
				echo json_encode(array($retour, $list));
				break;
		}
	}
	else {
		echo json_encode(array(false, -1));
	}
?>