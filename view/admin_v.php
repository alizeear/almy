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
   </head>
   <body>
      <nav class="navbar navbar-default navbar-static-top navbar-inverse" role="navigation">
			<div class="navbar-header">
				<a class="navbar-brand" href="#">Almy</a>
				<a id="checkAllLink" class="btn btn-danger" role="button" href="#">Verifier les liens</a>
			</div>
         <div class="navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
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
						<div id="listeCat"></div>
					</div>
					<div class="col-xs-6 col-md-4">
						<h2>Réglages</h2>
						<div id="reglageCat"></div>
					</div>
					<div class="col-xs-6 col-md-4">
						<h2>Recherche<img src="css/img/clear.png" class="clear"></h2>
						<input class="form-control" id="textSearchCat">
						<div id="searchCat"></div>
						<div id="listeSearchCat"></div>
					</div>
				</div>
				<div class="tab-pane" id="img">
					<div class="col-xs-6 col-md-4">
						<h2>Images</h2>
						Ajouter une Image:
						<div id="errImgAdd"></div>
						<div id="dropfile">Glissez / Déposez des images ici</div>
						<div id="listeImg"></div>
					</div>
					<div class="col-xs-6 col-md-4">
						<h2>Réglages</h2>
						<div id="reglageImg"></div>
					</div>
					<div class="col-xs-6 col-md-4">
						<h2>Recherche<img src="css/img/clear.png" class="clear"></h2>
						<input class="form-control" id="textSearchImg">
						<div id="searchImg"></div>
						<div id="listeSearchImg"></div>
					</div>
				</div>
				<div class="tab-pane" id="account">Comptes</div>
				<div class="tab-pane" id="settings">Options</div>
			</div>

			<div id="load"></div>
   </body>
</html>