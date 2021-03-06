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
		<script type="text/javascript" src="script/bootstrap.min.js"></script>
		<script type="text/javascript" src="script/bootstrap.typeahead.min.js"></script>
		<script type="text/javascript" src="script/admin.js"></script>
      <!--[if IE]>
         <script src="script/html5.js"></script>
      <![endif]-->   
	  <?php if(isset($_SESSION['upload']) && ($_SESSION['upload'] != 0)) { ?>
		<script type="text/javascript">
			$(document).ready(function() {
				$("#doneChangeImage").text("L'image à correcetement été uploadée.").delay(200).slideDown(200);
				$("a[href=\"#img\"]").click();
			});
		</script>
	  <?php  $_SESSION['upload'] = 0; } ?>
   </head>
   <body>
      <nav class="navbar navbar-default navbar-static-top navbar-inverse" role="navigation">
			<div class="navbar-header">
				<a class="navbar-brand" href="#">Almy</a>
				<a id="checkAllLink" class="btn btn-danger" role="button" href="#">Verifier les liens</a>
			</div>
         <div class="navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
					<li><a id="name"><?php echo $_SESSION['name']; ?></a></li>
					<li><a href="?do=logout" id="deconnexion">Déconnexion</a></li>
				</ul>
			</div>
      </nav>

      <div class="container">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs" id="onglets">
				<li class="active"><a href="#cat" data-toggle="tab">Catégories</a></li>
				<li><a href="#img" data-toggle="tab">Images</a></li>
				<li><a href="#account" data-toggle="tab">Comptes</a></li>
				<li><a href="#settings" data-toggle="tab">Options</a></li>
			</ul>
			<div class="tab-content">
				<div class="tab-pane active" id="cat">
					<div id="doneCatAdd" class="alert alert-success"></div>
					<div id="errCatAdd" class="alert alert-danger"></div>
					<div class="col-xs-6 col-md-4">
						<h2>Catégories</h2>
						Ajouter une Catégorie: 
						<div class="input-group">
							<input type="text" class="form-control" id="txtCatAdd">
							<span class="input-group-btn">
								<button id="btnCatAdd" class="btn btn-default" type="button">Ajouter</button>
							</span>
						</div>
						<div id="listeCat"></div>
					</div>
					<div class="col-xs-6 col-md-4">
						<h2>Réglages</h2>
						<div id="reglageCat"></div>
					</div>
					<div class="col-xs-6 col-md-4">
						<h2>Recherche<img src="css/img/clear.png" class="clear"></h2><br>
						<input class="form-control" id="textSearchCat">
						<div id="searchCat"></div>
						<div id="listeSearchCat"></div>
					</div>
				</div>
				<div class="tab-pane" id="img">
					<div id="doneChangeImage" class="alert alert-success"></div>
					<div id="errChangeImage" class="alert alert-danger"></div>
					<div class="col-xs-6 col-md-4">
						<h2>Images</h2>
						Ajouter une Image:
						<div id="errImgAdd"></div>
						<div id="uploadContain">
							<div id="uploadContainIn">
								<div id="uploadDown"></div>
								<div id="dropfile">Glissez / Déposez des images ici</div>
								<div id="uploadUp"></div>
								<form method="post" action="?upload" enctype="multipart/form-data">
									<input name="file" type="file" id="inputFileUploadImg" class="form-control" >
								</form>
							</div>
						</div>
						<div id="listeImg"></div>
					</div>
					<div class="col-xs-6 col-md-4">
						<h2>Réglages</h2>
						<div id="reglageImg"></div>
					</div>
					<div class="col-xs-6 col-md-4">
						<h2>Recherche<img src="css/img/clear.png" class="clear"></h2><br>
						<input class="form-control" id="textSearchImg">
						<div id="searchImg"></div>
						<div id="listeSearchImg"></div>
					</div>
				</div>
				<div class="tab-pane" id="account">
					<div id="doneChangeAccount" class="alert alert-success"></div>
					<div id="errChangeAccount" class="alert alert-danger"></div>
					<div class="col-xs-6 col-md-4 passCol">
						<h2>Changer de mot de passe</h2><br>
						Ancien mot de passe
						<input class="form-control" id="beforePass">
						Nouveau mot de passe
						<input class="form-control" id="afterPass1">
						Nouveau mot de passe
						<input class="form-control" id="afterPass2">
						<button type="button" class="btn btn-info" id="changePass">Valider</button>
					</div>
					<div class="col-xs-6 col-md-4">
						<h2>Changer de nom</h2>
						<input class="form-control" id="nameText" value="<?php echo $_SESSION['name']; ?>">
						<button type="button" class="btn btn-info" id="changeName">Valider</button>
					</div>
				</div>
				<div class="tab-pane" id="settings">
					<div id="doneChangeSettings" class="alert alert-success"></div>
					<div id="errChangeSettings" class="alert alert-danger"></div>
					<div id="listeOptions">
					</div>
				</div>
			</div>

			<div id="load"></div>
   </body>
</html>