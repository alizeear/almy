var listeAllCats = Array();
var listeAllImgs = Array();
$(document).ready(function() {
	// gestion de l'affichage des 2 moyen d'upload
	$("#uploadDown").click(function() {
		$("#uploadContainIn").animate({
			'top': '-34px'
		}, 100);
	});
	$("#uploadUp").click(function() {
		$("#uploadContainIn").animate({
			'top': '0px'
		}, 100);
	});
	$("#inputFileUploadImg").change(function() {
		$(this).parents("form:first").submit();
	});
	// gestion du compte
	$("#account .passCol input").keydown(function(e) {
		if(e.keyCode==13) {
			$("#changePass").click();
		}
	});
	$("#nameText").keydown(function(e) {
		if(e.keyCode==13) {
			$("#changeName").click();
		}
	});
	$("#changePass").click(function() {
		if($("#afterPass1").val() == $("#afterPass2").val()) {
			loadOn();
			var requeteCat = $.ajax({
				url: "ajax.php?do=updateUser",
				type: "post",
				data : {
					'old' : $("#beforePass").val(),
					'new' : $("#afterPass2").val()
				},
				success: function() {
					$("#account .passCol input").val("");
					var json = JSON.parse(requeteCat.responseText);
					if(json[0]==true) {
						// si le serveur n'a pas retourné d'erreur dans le fichier JSON
						$("#errChangeAccount").slideUp(200, function() {
							$(this).text("");
						});
						$("#doneChangeAccount").text("Le mot de passe a correctement été modifié.").delay(200).slideDown(200);
					}
					else {
						// sinon, affichage d'un message d'erreur
						$("#errChangeAccount").text("L'ancien mot de passe est pas incorrect.").delay(200).slideDown(200);
						$("#doneChangeAccount").slideUp(200, function() {
							$(this).text("");
						});
					}
					loadOff();
				}
			});
		}
		else {
			$("#errChangePass").text("Les nouveaux mots de passe ne sont pas identiques.");
		}
	});
	$("#changeName").click(function() {
		if($("#nameText").val() != $("#name").text()) {
			loadOn();
			var requeteCat = $.ajax({
				url: "ajax.php?do=updateUser",
				type: "post",
				data : {
					'name' : $("#nameText").val()
				},
				success: function() {
					var json = JSON.parse(requeteCat.responseText);
					if(json[0]==true) {
						// si le serveur n'a pas retourné d'erreur dans le fichier JSON
						$("#name").text($("#nameText").val());
						$("#errChangeAccount").slideUp(200, function() {
							$(this).text("");
						});
						$("#doneChangeAccount").text("Votre nouveau nom a bien été pris en compte.").delay(200).slideDown(200);
					}
					else {
						// sinon, affichage d'un message d'erreur
						$("#errChangeAccount").text("Une erreur s'est produite.").delay(200).slideDown(200);
						$("#doneChangeAccount").slideUp(200, function() {
							$(this).text("");
						});
					}
					loadOff();
				}
			});
		}
	});
	$(".clear").mouseenter(function() {
		$(this).stop().animate({
			'opacity': 0.4
		}, 200);
	}).mouseleave(function() {
		$(this).stop().animate({
			'opacity': 1
		}, 200);
	}).click(function() {
		$(this).parents("div:first").find("ul").remove();
	});
	
	$('#onglets a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});
	
	// Chargement des categories
	loadOn();
	var requeteCat = $.ajax({
		url: "ajax.php?do=getCat",
		type: "post",
		success: function() {
			var json = JSON.parse(requeteCat.responseText);
			showCat({1:json});
			initCat("listeCat");
			loadOff();
		}
	});
	$('#textSearchCat').typeahead({
		source: function(query, process) { return listeAllCats; },
		updater: function(item) {
			$(this).val(item);
			var requeteCat = $.ajax({
				url: "ajax.php?do=searchCat",
				type: "post",
				data: {
					search: item
				},
				success: function() {
					var json = JSON.parse(requeteCat.responseText);
					$("#listeSearchCat").html("<ul></ul>");
					for(var i in a = json) {
						$("#listeSearchCat ul").append("<li><span class=\"title\">"+a[i]['name']+"</span> <span class=\"id\">"+a[i]['id']+"</span></li>");
					}
					initCat("listeSearchCat");
					if($("#listeSearchCat li").length == 1)
						$("#listeSearchCat li").click();
				}
			});
		},
		autoselect: false
	});
	
	var requeteImg = $.ajax({
		url: "ajax.php?do=getImg",
		type: "post",
		success: function() {
			var json = JSON.parse(requeteImg.responseText);
			showImg({1:json});
			initImg("listeImg");
			loadOff();
		}
	});
	$('#textSearchImg').typeahead({
		source: function(query, process) { return listeAllImgs; },
		updater: function(item) { 
			$(this).val(item);
			var requeteImg = $.ajax({
				url: "ajax.php?do=searchImg",
				type: "post",
				data: {
					search: item
				},
				success: function() {
					var json = JSON.parse(requeteImg.responseText);
					$("#listeSearchImg").html("<ul></ul>");
					for(var i in a = json) {
						$("#listeSearchImg ul").append("<li><span class=\"title\">"+a[i]['title']+"</span> <span class=\"id\">"+a[i]['id']+"</span></li>");
					}
					initImg("listeSearchImg");
					if($("#listeSearchImg li").length == 1)
						$("#listeSearchImg li").click();
				}
			});
		}
	});

	// Requte AJAX de verification d'existancee des fichiers avec la base
	$("#checkAllLink").click(function() {
		loadOn();
		var requete = $.ajax({
			url: "ajax.php?do=checkAllLink",
			type: "post",
			success: function() {
				var json = JSON.parse(requete.responseText);
				showImg(json);
				$("#reglageCat").html("");
				$("#reglageImg").html("");
				$(".tab-content .tab-pane .active").removeClass("active");
				initImg("listeImg");
				loadOff();
			}
		});
	});

	// Gestion de l'upload du drag'N drop
	$(document).on('dragenter', '#dropfile', function() {
		$(this).css('border', '1px solid #677EA1');
		return false;
	});
	$(document).on('dragover', '#dropfile', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).css('border-color', '1px solid #677EA1');
		return false;
	});
	$(document).on('drop', '#dropfile', function(e) {
		if(e.originalEvent.dataTransfer) {
			if(e.originalEvent.dataTransfer.files.length) {
				// Stop the propagation of the event
				e.preventDefault();
				e.stopPropagation();
				$(this).css('border', '1px solid #ccc');
				// Main function to upload
				upload(e.originalEvent.dataTransfer.files);
			}
		}
		else {
			$(this).css('border', '1px solid #ccc;');
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
			success: function() {
				var json = JSON.parse(requete.responseText);
				showCat(json);
				initCat("listeCat");
				if(json[0]==true) {
					// si le serveur n'a pas retourné d'erreur dans le fichier JSON
					$("#txtCatAdd").val("");
					$("#errCatAdd").slideUp(200, function() {
						$(this).text("");
					});
					$("#doneCatAdd").text("La catégorie à correcetement été enregistré.").delay(200).slideDown(200);
				}
				else {
					// sinon, affichage d'un message d'erreur
					$("#errCatAdd").text("Il est impossible d'ajouter cette catégorie.").delay(200).slideDown(200);
					$("#doneCatAdd").slideUp(200, function() {
						$(this).text("");
					});
				}
				if($("#idImgUpdate").length!=0) {
					var requeteCatImg = $.ajax({
						url: "ajax.php?do=getCatImg",
						type: "post",
						data: {
							id: $("#idImgUpdate").val()
						},
						success: function() {
							var json = JSON.parse(requeteCatImg.responseText);
							$("#catImgUpdate").html("");
							for(var i in a = json) {
								$("#catImgUpdate").append("<li "+((a[i]['is']) ? "class=\"selected\"" : "")+">"+a[i]['name']+"<span class=\"id\">"+a[i]['id']+"</class></li>");
							}
							$("#catImgUpdate li").click(function() {
								if($(this).hasClass("selected"))
									$(this).removeClass("selected");
								else
									$(this).addClass("selected");
							});
							loadOff();
						}
					});
				}
				else {
					loadOff();
				}
			}
		});
	});
	// détéction de l'appuye sur la touche [Entrée] du clavier, déclanche l'ajout de la catégorie
	$("#txtCatAdd").keydown(function(e) {
		if(e.keyCode==13) {
			$("#btnCatAdd").click();
		}
	});
});

// initialise les clicks sur les noms de catégories
function initCat(idListe) {
	$("#"+idListe+" li").click(function() {
		$(".tab-content .tab-pane .active").removeClass("active");
		$(this).addClass("active");
		// code HTML affiché dans la colonne de droite (Reglages)
		var html = 'Nom de la Catégorie: \
				  <input id="txtCatUpdate" type="text" class="form-control" value="'+$(this).find(".title").text()+'"> \
				  <input id="idCatUpdate" type="hidden" value="'+$(this).find(".id").text()+'"> \
				  <button id="btnCatUpdate" class="btn btn-info" type="button">Modifier</button> \
				  <button id="btnCatDelete" class="btn btn-danger btn-xs delete" type="button">Supprimer</button>';
		$("#reglageCat").html(html);
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
				success: function() {
					var json = JSON.parse(requete.responseText);
					if(json[0]==true) {
						// si le serveur n'a pas retourné d'erreur dans le fichier JSON
						$("#errCatAdd").slideUp(200, function() {
							$(this).text("");
						});
						$("#doneCatAdd").text("La catégorie à correcetement été mise à jour.").delay(200).slideDown(200);
					}
					else {
						// sinon, affichage d'un message d'erreur
						$("#errCatAdd").text("Une erreur est survenue lors de la mise à jour de la catégorie.").delay(200).slideDown(200);
						$("#doneCatAdd").slideUp(200, function() {
							$(this).text("");
						});
					}
					showCat(json);
					$("#reglageCat").html("");
					$(".tab-content .tab-pane .active").removeClass("active");
					initCat("listeCat");
					loadOff();
				}
			});
		});

		$("#txtCatUpdate").keydown(function(e) {
			if(e.keyCode==13) {
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
				success: function() {
					var json = JSON.parse(requete.responseText);
					if(json[0]==true) {
						// si le serveur n'a pas retourné d'erreur dans le fichier JSON
						$("#errCatAdd").slideUp(200, function() {
							$(this).text("");
						});
						$("#doneCatAdd").text("La catégorie à correcetement été supprimé.").delay(200).slideDown(200);
					}
					else {
						// sinon, affichage d'un message d'erreur
						$("#errCatAdd").text("Une erreur est survenue lors de la suppression de la catégorie.").delay(200).slideDown(200);
						$("#doneCatAdd").slideUp(200, function() {
							$(this).text("");
						});
					}
					showCat(json);
					$("#reglageCat").html("");
					$(".tab-content .tab-pane .active").removeClass("active");
					initCat("listeCat");
					loadOff();
				}
			});
		});
	});
}
// initialise les clicks sur les images
function initImg(idListe) {
	$("#"+idListe+" li").click(function() {
		// code HTML affiché dans la colonne de droite (Reglages)
		loadOn();
		$(".tab-content .tab-pane .active").removeClass("active");
		$(this).addClass("active");
		var html = 'Titre de l\'image: \
				  <input id="txtImgUpdate" type="text" class="form-control" value="'+$(this).find(".title").text()+'"> \
				  <input id="idImgUpdate" type="hidden" value="'+$(this).find(".id").text()+'"> \
				  Description de l\'image \
				  <textarea id="descrImgUpdate" class="form-control" rows="3">'+$(this).find(".descr").text()+'</textarea> \
				  <ul id="catImgUpdate"></ul> \
				  <button id="btnImgUpdate" class="btn btn-info" type="button">Modifier</button> \
				  <button id="btnImgDelete" class="btn btn-danger btn-xs delete" type="button">Supprimer</button>';
		$("#reglageImg").html(html);

		var requete = $.ajax({
			url: "ajax.php?do=getCatImg",
			type: "post",
			data: {
				id: $("#idImgUpdate").val()
			},
			success: function() {
				var json = JSON.parse(requete.responseText);
				$("#catImgUpdate").html("");
				for(var i in a = json) {
					$("#catImgUpdate").append("<li "+((a[i]['is']) ? "class=\"selected\"" : "")+">"+a[i]['name']+"<span class=\"id\">"+a[i]['id']+"</class></li>");
				}
				$("#catImgUpdate li").click(function() {
					if($(this).hasClass("selected"))
						$(this).removeClass("selected");
					else
						$(this).addClass("selected");
				});
				loadOff();
			}
		});

		//envoye de la requette AJAX de modification de la catégorie
		$("#btnImgUpdate").click(function() {
			loadOn();
			var cat = Array();
			$("#catImgUpdate li.selected").each(function() {
				cat.push($(this).find(".id").text());
			});
			var requete = $.ajax({
				url: "ajax.php?do=updateImg",
				type: "post",
				data: {
					id: $("#idImgUpdate").val(),
					title: $("#txtImgUpdate").val(),
					descr: $("#descrImgUpdate").val(),
					cat: cat
				},
				success: function() {
					var json = JSON.parse(requete.responseText);
					if(json[0]==true) {
						// si le serveur n'a pas retourné d'erreur dans le fichier JSON
						$("#errChangeImage").slideUp(200, function() {
							$(this).text("");
						});
						$("#doneChangeImage").text("L'image à correcetement été mise à jour.").delay(200).slideDown(200);
					}
					else {
						// sinon, affichage d'un message d'erreur
						$("#errChangeImage").text("Une erreur est survenue lors de la mise à jour de l'image.").delay(200).slideDown(200);
						$("#doneChangeImage").slideUp(200, function() {
							$(this).text("");
						});
					}
					showImg(json);
					$("#reglageImg").html("");
					$(".tab-content .tab-pane .active").removeClass("active");
					initImg("listeImg");
					loadOff();
				}
			});
		});

		$("#txtImgUpdate").keydown(function(e) {
			if(e.keyCode==13) {
				$("#btnImgUpdate").click();
			}
		});

		// envoye de la requette AJAX de suppression de la catégorie
		$("#btnImgDelete").click(function() {
			loadOn();
			var requete = $.ajax({
				url: "ajax.php?do=deleteImg",
				type: "post",
				data: {
					id: $("#idImgUpdate").val()
				},
				success: function() {
					var json = JSON.parse(requete.responseText);
					if(json[0]==true) {
						// si le serveur n'a pas retourné d'erreur dans le fichier JSON
						$("#errChangeImage").slideUp(200, function() {
							$(this).text("");
						});
						$("#doneChangeImage").text("L'image à correcetement été supprimée.").delay(200).slideDown(200);
					}
					else {
						// sinon, affichage d'un message d'erreur
						$("#errChangeImage").text("Une erreur est survenue lors de la suppression de l'image.").delay(200).slideDown(200);
						$("#doneChangeImage").slideUp(200, function() {
							$(this).text("");
						});
					}
					showImg(json);
					$("#reglageImg").html("");
					$(".tab-content .tab-pane .active").removeClass("active");
					initImg("listeImg");
					loadOff();
				}
			});
		});
	});
}

// Affiche les catégories dans la colonne de gauche grace au JSON retourné par le serveur
function showCat(json) {
	listeAllCats = Array();
	$("#listeCat").html("<ul></ul>");
	for(var i in a = json[1]) {
		listeAllCats.push(a[i]['name']);
		$("#listeCat ul").append("<li><span class=\"title\">"+a[i]['name']+"</span><span class=\"id\">"+a[i]['id']+"</span></li>");
	}
}
function showImg(json) {
	listeAllImgs = Array();
	$("#listeImg").html("<ul></ul>");
	for(var i in a = json[1]) {
		listeAllImgs.push(a[i]['title']);
		$("#listeImg ul").append("<li><img src=\""+a[i]['url_min']+"\"><span class=\"title\">"+((a[i]['title']!=null) ? a[i]['title'] : "")+"</span><span class=\"id\">"+a[i]['id']+"</span><span class=\"descr\">"+((a[i]['descr']!=null) ? a[i]['descr'] : "")+"</span></li>");
	}
}

// fonction utilisé pour l'upload des fichier avec le drag'N drop

function upload(files) {
	var f = files[0];
	// Only process image files.
	if(!f.type.match('image/jpeg')&&!f.type.match('image/png')&&!f.type.match('image/gif')) {
		alert('The file must be a image');
		return false;
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
			var json = JSON.parse(data);
			showImg(json);
			if(json[0]==true) {
				// si le serveur n'a pas retourné d'erreur dans le fichier JSON
				$("#errChangeImage").slideUp(200, function() {
					$(this).text("");
				});
				$("#doneChangeImage").text("L'image à correcetement été uploadée et ajoutée.").delay(200).slideDown(200);
			}
			else {
				// sinon, affichage d'un message d'erreur
				$("#errChangeImage").text("Une erreur est survenue lors de l'upload de l'image.").delay(200).slideDown(200);
				$("#doneChangeImage").slideUp(200, function() {
					$(this).text("");
				});
			}
			initImg("listeImg");
			loadOff();
		}
	});
}

// fonction d'affichage des chargements
function loadOn() {
	$("#load").stop().fadeIn("fast");
}
function loadOff() {
	$("#load").stop().fadeOut("fast");
}