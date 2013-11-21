$(document).ready(function() {	
	// initialise les clicks sur les noms de catégories
	initCat();
	
	// Gestion de l'upload du drag'N drop
	$(document).on('dragenter', '#dropfile', function() {
		$(this).css('border', '3px dashed red');
		return false;
	});
	$(document).on('dragover', '#dropfile', function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).css('border', '3px dashed red');
		return false;
	});
	$(document).on('dragleave', '#dropfile', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).css('border', '3px dashed #BBBBBB');
		return false;
	});
	$(document).on('drop', '#dropfile', function(e) {
		if(e.originalEvent.dataTransfer){
			if(e.originalEvent.dataTransfer.files.length) {
				// Stop the propagation of the event
				e.preventDefault();
				e.stopPropagation();
				$(this).css('border', '3px dashed green');
				// Main function to upload
				upload(e.originalEvent.dataTransfer.files);
			}  
		}
		else {
			$(this).css('border', '3px dashed #BBBBBB');
		}
		return false;
	});

	// ajout d'une nouvelle catégorie
	$("#btnCatAdd").click(function() {
		loadOn();
		var requete = $.ajax({
			url: "ajax.php?do=addCat",
			type: "post",
			data: {
				name: $("#txtCatAdd").val()
			},
			success: function(){
				var json = JSON.parse(requete.responseText);
				showCat(json);
				initCat();
				if(json[0]==true) {
					// si le serveur n'a pas retourné d'erreur dans le fichier JSON
					$("#txtCatAdd").val("");
					$("#errCatAdd").text("");
				}
				else {
					// sinon, affichage d'un message d'erreur
					$("#errCatAdd").text("Il est impossible d'ajouter cette catégorie.");
				}
				loadOff();
			}
		});
	});
	// détéction de l'appuye sur la touche [Entrée] du clavier, déclanche l'ajout de la catégorie
	$("#txtCatAdd").keydown(function(e) {
		if(e.keyCode == 13) {
			$("#btnCatAdd").click();
		}
	});
});

// initialise les clicks sur les noms de catégories
function initCat() {
	$("#listeCat li").click(function () {
		// code HTML affiché dans la colonne de droite (Reglages)
		var html = 'Nom de la Catégorie: \
				  <div class="input-group"> \
					 <input id="txtCatUpdate" type="text" class="form-control" value="'+$(this).text().substr(0,$(this).text().length-$(this).find("span").text().length)+'"> \
					 <input id="idCatUpdate" type="hidden" value="'+$(this).find("span").text()+'"> \
					 <span class="input-group-btn"> \
						<button id="btnCatUpdate" class="btn btn-default" type="button">Modifier</button> \
					 </span> \
				  </div> \
				  <button id="btnCatDelete" class="btn btn-danger btn-xs delete" type="button">Supprimer</button>';
		$("#reglage").html(html);
		//envoye de la requette AJAX de modification de la catégorie
		$("#btnCatUpdate").click(function() {
			loadOn();
			var requete = $.ajax({
				url: "ajax.php?do=updateCat",
				type: "post",
				data: {
					id: $("#idCatUpdate").val(),
					name: $("#txtCatUpdate").val()
				},
				success: function(){
					var json = JSON.parse(requete.responseText);
					showCat(json);
					$("#reglage").html("");
					initCat();
					loadOff();
				}
			});
		});
		
		$("#txtCatUpdate").keydown(function(e) {
			if(e.keyCode == 13) {
				$("#btnCatUpdate").click();
			}
		});
		
		// envoye de la requette AJAX de suppression de la catégorie
		$("#btnCatDelete").click(function() {
			loadOn();
			var requete = $.ajax({
				url: "ajax.php?do=deleteCat",
				type: "post",
				data: {
					id: $("#idCatUpdate").val()
				},
				success: function(){
					var json = JSON.parse(requete.responseText);
					showCat(json);
					$("#reglage").html("");
					initCat();
					loadOff();
				}
			});
		});
	});
}

// Affiche les catégories dans la colonne de gauche grace au JSON retourné par le serveur
function showCat(json) {
	$("#listeCat").html("<ul></ul>");
	for (var i in a = json[1]) {
		$("#listeCat ul").append("<li>"+a[i]['name']+"<span class=\"id\">"+a[i]['id']+"</class></li>");
	}
}

// fonction utilisé pour l'upload des fichier avec le drag'N drop

function upload(files) {
	var f = files[0] ;
	// Only process image files.
	if (!f.type.match('image/jpeg') && !f.type.match('image/png') && !f.type.match('image/gif')) {
		alert('The file must be a image') ;
		return false ;
	}
	var reader = new FileReader();
	
	// When the image is loaded,
	// run handleReaderLoad function
	reader.onload = handleReaderLoad;
	
	// Read in the image file as a data URL.
	reader.readAsDataURL(f);            
}
function handleReaderLoad(evt) {
	loadOn();
	var pic = {};
	pic.file = evt.target.result.split(',')[1];
	var str = jQuery.param(pic);
	$.ajax({
		type: 'POST',
		url: 'ajax.php?do=addImage',
		data: str,
		success: function(data) {
			console.log(data) ;
			loadOff();
		}
	});
}

// fonction d'affichage des chargements
function loadOn() {
	$("#load").fadeIn("fast");
}
function loadOff() {
	$("#load").fadeOut("fast");
}