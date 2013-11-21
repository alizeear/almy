<?php
   session_start();
   include "include/almyDb.class";
   $db =  almyDb::getDB();  
   
   // $_SESSION['id'] = 0;
   
   
   if((!isset($_SESSION['id'])) && ((!isset($_GET['do'])) || ($_GET['do'] != "login"))) {
      include "controllers/show_c.php";
      include "view/show_v.php";
   }
   else {
      include "controllers/admin_c.php";
      include "view/admin_v.php";
   }
?>