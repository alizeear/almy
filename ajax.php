<?php
   include "include/almyDb.class";
   include "include/function.php";
   $db =  almyDb::getDB();  
   
   switch($_GET['do']) {
      case "addCat":
         $retour = $db->addCategorie($_POST['name']);
         $list = $db->getListeCategorie();
         echo json_encode(array($retour, $list));
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
      case "addImage":
         $error    = NULL;
         $filename = NULL;
         $retour = false;
         
         if (isset($_FILES['uploadFile']) && $_FILES['uploadFile']['error'] === 0) {
            $filename = nameFile(to_permalink($_FILES['uploadFile']['name']));
            $targetpath = 'images/' . $filename; // On stocke le chemin où enregistrer le fichier
            echo $targetpath;
            // On déplace le fichier depuis le répertoire temporaire vers $targetpath
            if (@move_uploaded_file($_FILES['uploadFile']['tmp_name'], $targetpath)) { // Si ça fonctionne
               $retour = $db->addImage($targetpath, createMin($targetpath));
            }
         }
     
         $list = $db->getListeImage();
         echo json_encode(array($retour, $list));
         break;
   }
?>