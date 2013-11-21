<html>
   <head>
   	<title>ALMY</title>
   	<meta name="description" content="Almy, the new image galery" />
   	<meta name="keyword" lang="fr" content="HTML5, CSS3, test" />
   	<meta charset="UTF-8" />
   	<meta name="language" content="fr" />
   	<meta name="robots" content="index, follow, all" />
   	<meta name="googlebot" content="index, follow, all" />
   	<meta name="msvalidate.01" content="" />
   	<meta name="google-site-verication" content="" />
   	<meta name="author" content="Bazaim" />
   	
   	<link rel="shortcut icon" href="img/favicon.ico" />
   	<link href='http://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css'>
   	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css" media="screen" />
   	
   	<link rel="stylesheet" type="text/css" href="css/style.css" media="screen" />
   	<link rel="stylesheet" type="text/css" href="css/admin.css" media="screen" />
   	
   	<script type="text/javascript" src="script/jquery-1.10.2.min.js"></script>
   	<script type="text/javascript" src="script/admin.js"></script>
      <!--[if IE]>
         <script src="script/html5.js"></script>
      <![endif]-->   
   </head>
   <body>
      <nav class="navbar navbar-default navbar-static-top navbar-inverse" role="navigation">
         <div class="navbar-header">
          <a class="navbar-brand" href="#">Almy</a>
        </div>
      </nav>
      <div class="container">
           <div class="col-xs-6 col-md-4">
              <h2>Catégories</h2>
              Ajouter une Catégorie: 
              <div id="errCatAdd"></div>
              <div class="input-group">
                <input type="text" class="form-control" id="txtCatAdd">
                <span class="input-group-btn">
                  <button id="btnCatAdd" class="btn btn-default" type="button">Ajouter</button>
                </span>
              </div>
              <div id="listeCat">
                 <ul>
                    <?php
                        foreach($listeCat as $cat) {
                           echo "<li>".$cat['name']."<span class=\"id\">".$cat['id']."</class></li>";
                        }
                    ?>
                 </ul>
              </div>
           </div>
           <div class="col-xs-6 col-md-4">
              <h2>Images</h2>
              Ajouter une Image:
              <div id="errImgAdd"></div>
              <form id="uploadForm" enctype="multipart/form-data" action="ajax.php?do=addImage" target="uploadFrame" method="post">
                <div class="input-group">
                  <input class="form-control" id="uploadFile" name="uploadFile" type="file" />
                  <span class="input-group-btn">
                     <button id="uploadSubmit" class="btn btn-default" type="submit">Ajouter</button>
                  </span>
                </div>
              </form>
              <iframe id="uploadFrame" name="uploadFrame"></iframe>
           </div>
           <div class="col-xs-6 col-md-4">
              <h2>Réglages</h2>
              <div id="reglage"></div>
           </div>
      </div>
      <div id="load"></div>
   </body>
</html>