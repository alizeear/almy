<?php
	include "include/almyDb.class";
	include "include/function.php";
	$db =  almyDb::getDB();  
	
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
		case "getCatImg":
			$list = $db->getListeCategorieImg($_POST['id']);
			echo json_encode($list);
			break;
		case "addImage":
			$targetpath = add_picture($_POST['file']);
			$retour = $db->addImage($targetpath, createMin($targetpath));
			$db->checkAllLink();
	
			$list = $db->getListeImage();
			echo json_encode(array($retour, $list));
			break;
                case "updateImg":
                        $retour = $db->updateImage($_POST['id'], array(
                            'title' => $_POST['title'],
                            'descr' => $_POST['descr']
                        ));
                    
                        $list = $db->getListeIdCategorieImg($_POST['id']);
                        if(isset($_POST['cat']) && !empty($_POST['cat'])) {
                            foreach($list as $temp)  {
                                if(!in_array($temp, $_POST['cat'])) {
                                    $retour = (($retour)?$db->removeCatImage($_POST['id'], $temp):$retour);
                                }
                            }
                        }
                        else {
                            foreach($list as $temp)  {
                                    $retour = (($retour)?$db->removeCatImage($_POST['id'], $temp):$retour);
                            }
                        }
                        
                        $list = $db->getListeIdCategorieImg($_POST['id']);
                        if(isset($_POST['cat']) && !empty($_POST['cat'])) {
                            foreach($_POST['cat'] as $temp) {
                                if(!in_array($temp, $list)) {
                                    $retour = (($retour)?$db->addCatImage($_POST['id'], $temp):$retour);
                                }
                            }
                        }
                        
			$list = $db->getListeImage();
			echo json_encode(array($retour, $list));
			break;
	}
?>