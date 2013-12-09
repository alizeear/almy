(function($) {
	$.fn.almy = function(params) {

		//On définit nos paramètres par défaut
		var defauts = $.extend({
			width: '400px',
			widthImage: '200px',
			running: true,
			paused: true,
			pauseTime: 3000,
			pauseOnHover: false
		}, params);

		var dateTime = new Date().getTime();
		var idAlmy = "#"+$(this).attr("id");
		var category = Array();
		// recalcul de la taille des image au redimentionnement de la fenêtre
		$(window).resize(function() {
			if($('#categoriesMiddle').length !== 0)
				alignImg($('#categoriesMiddle img:visible')); // on align l'image centre
		});
		return this.each(function() {

			// on recupere les differentes catégories presentes dans les tag des balises "a"
			$(this).find("a").each(function() {
				if((typeof $(this).attr("almy-cat")!=="undefined" && $(this).attr("almy-cat")!=="")) {
					var cat = $(this).attr("almy-cat").split(";");
					for(var i in a = cat) {
						if(category.indexOf(a[i])===-1)
							category.push(a[i]);
					}
				}
			});

			/**
			* Mise en forme de la gallerie d'image sur la page
			*/
			$(this).css({
				width: defauts.width,
				position: 'relative'
			});
		   $(this).css("border", "1px solid #333");
			
			var htmlCat = "<li><span class=\"all\">Toutes</span></li>";
			for(var i = 0;i<category.length;i++) {
				htmlCat += '<li><span>'+category[i]+'</span></li>';
			}
			$(this).prepend('<div class="almyListCat"><ul>'+htmlCat+'</ul></div>');
			$(".almyListCat").find("li").width($(this).find(".almyListCat").width()/$(".almyListCat").find("li").length);
			
			var n=0;
			$(this).find(".almyListCat ul li span").mouseenter(function() {
				$(this).parents("ul").find("span").stop().animate({
					'opacity': 0.7
				},"fast");
				$(this).stop().animate({
					'opacity': 1
				},"fast");
				var tempCat = $(this).text();
				if(!$(this).hasClass("all")) {
					$(idAlmy).find("img").parent().each(function() {
						if($(this).attr("almy-cat").indexOf(tempCat) == -1)
							$(this).stop().animate({
								'opacity': 0.6
							});
					});
				}
			}).mouseleave(function() {
				if($(this).parents("ul").find("span.active").length == 0) {
					$(this).parents("ul").find("span").stop().animate({
						'opacity': 1
					},"fast");
					$(idAlmy).find("img").parent().each(function() {
						$(this).stop().animate({
							'opacity': 1
						},"fast");
					});
				}
				else{
					$(this).parent().stop().animate({
						'opacity': 1
					},"fast");
					$(this).parents("ul").find("span").each(function() {
						if(!$(this).hasClass("active"))
							$(this).stop().animate({
								'opacity': 0.7
							},"fast");
						else
							$(this).stop().animate({
								'opacity': 1
							},"fast");
					});
				}
			}).click(function() {
				if(!$(this).hasClass("active")) {
					$(this).addClass("active");
					var tempCat = $(this).text();
					if(!$(this).hasClass("all")) {
						$(idAlmy).find("img").parent().each(function() {
							if($(this).attr("almy-cat").indexOf(tempCat) == -1)
								$(this).stop().slideUp();
						});
					}
					else {
						$(idAlmy).find("img").parent().stop().slideDown();
					}
				} else {
					$(this).removeClass("active");
					var tempCat = Array();
					$(idAlmy).find(".almyListCat ul li span.active").each(function() {
						tempCat.push($(this).text());
					});
					$(idAlmy).find("img").parent().each(function() {
						if($(this).attr("almy-cat").indexOf(tempCat) == -1)
							$(this).stop().slideUp();
					});
				}
			});
			$(this).children("a").click(function(e) {
				e.preventDefault();
				afficherSlider(this);
			});
			// Affichage les unes à coté des autres des miniatures
			$(this).find('a img').each(function() {
				$(this).css({
					'width': defauts.widthImage,
					'display': 'inline'
				});
			});
			
			var countPerLine = Math.floor($(this).width()/parseInt(defauts.widthImage));
			var heightImage = Array();
			var heightMax = -1;
			var count = 0;
			var line = 0;
			$(this).find('a img').each(function() {
				if(heightMax<$(this).height())
					heightMax = $(this).height();
				count++;
				if(count == countPerLine) {
					heightImage[line] = heightMax;
					count = 0;
					heightMax = -1;
					line++;
				}
			});
			var count = 0;
			var line = 0;
			$(this).find('a').each(function() {
				$(this).find("img").css({
					'marginTop': (heightImage[line]-$(this).height())/2,
					'marginBottom': (heightImage[line]-$(this).height())/2
				});
				count++;
				if(count == countPerLine) {
					count = 0;
					line++;
				}
			});
		});


		/////////////////////////////////////////////////////////
		////// Fonctions perso //////////////////////////////////
		/////////////////////////////////////////////////////////
		function stopSlide() {
			defauts.paused = true;
			clearInterval(timer);
			timer = '';
		}

		function runSlide() {
			timer = setInterval(function() {
				slideSuivant();
			}, defauts.pauseTime);
		}

		function slideSuivant() {
			var $imageSuivante = $('#categoriesMiddle img:visible').next('img'); // on stock la valeur de l'image suivante dans une variable
			if($imageSuivante.length<1)
				$imageSuivante = $("#categoriesMiddle img:first"); // on test si on est pas à la fin de la liste d'image et au cas ou on retourne à la première
			alignImg($imageSuivante); // on align l'image centre
			var margin = (($imageSuivante.width()>$("#categoriesMiddle img:visible").width()))
				?($imageSuivante.width()-$("#categoriesMiddle img:visible").width())/2
				:($("#categoriesMiddle img:visible").width()-$imageSuivante.width())/2;
			$("#categoriesMiddle img:visible").stop().css("marginLeft", "0px").animate({
				'marginLeft': margin,
				'opacity': 0
			},"slow", function() {
				$(this).hide().css({
					'opacity': 1,
					'marginLeft': "0px"
				});
			}); // on cache l'image actuelle
			
			$imageSuivante.stop().fadeIn('slow'); // on affiche la nouvelle
			return true;
		}

		function slidePrecedent() {
			var $imageSuivante = $('#categoriesMiddle img:visible').prev('img'); // on stock la valeur de l'image suivante dans une variable
			if($imageSuivante.length<1)
				$imageSuivante = $("#categoriesMiddle img:last"); // on test si on est pas à la fin de la liste d'image et au cas ou on retourne à la première
			alignImg($imageSuivante); // on align l'image centre
			if($imageSuivante.width()>$("#categoriesMiddle img:visible").width()) {
				var margin = ($imageSuivante.width()-$("#categoriesMiddle img:visible").width())/2;
				$imageSuivante.stop().css({
					"marginLeft": margin,
					'display': 'block',
					'opacity': 0
				}).animate({
					'opacity': 1,
					'marginLeft': "0px"
				}, "slow");
				$("#categoriesMiddle img:visible").stop().css("marginLeft", 0).animate({
					'marginLeft': margin,
					'opacity': 0
				},"slow", function() {
					$(this).hide().css({
						'opacity': 1,
						'marginLeft': "0px"
					});
				}); // on cache l'image actuelle
			}
			else {
				var margin = ($("#categoriesMiddle img:visible").width()-$imageSuivante.width())/2;
				$imageSuivante.stop().css("marginLeft", margin).animate({
					'marginLeft': 0
				}, "slow"); // on cache l'image actuelle
				$("#categoriesMiddle img:visible").stop().animate({
					'opacity': 0
				},"slow", function() {
					$(this).hide().css({
						'opacity': 1,
						'marginLeft': "0px"
					});
				}); // on cache l'image actuelle
			}
			return true;
		}

		// retourne les dimention optimal pour afficher l'image entiere sans la déformer
		function getDimMaxImg($W_Src, $H_Src) {
			var $H_max = $("#categoriesMiddle .imgContainer").height();
			var $W_max = $("#categoriesMiddle").width();
			var $W_test = Math.round($W_Src*($H_max/$H_Src));
			var $H_test = Math.round($H_Src*($W_max/$W_Src));

			if($W_Src<$W_max&&$H_Src<$H_max) {
				$W = $W_Src;
				$H = $H_Src;
			} else if($W_max===0&&$H_max===0) {
				$W = $W_Src;
				$H = $H_Src;
			} else if($W_max===0) {
				$W = $W_test;
				$H = $H_max;
			} else if($H_max===0) {
				$W = $W_max;
				$H = $H_test;
			} else if($H_test>$H_max) {
				$W = $W_test;
				$H = $H_max;
			} else {
				$W = $W_max;
				$H = $H_test;
			}

			return Array($W, $H);
		}

		// anime les images afin de les centrer
		function alignImg($image) {
			var temp = getDimMaxImg($image.width(), $image.height());
			var $widthImageNext = temp[0]; // stock dans une variable la width de l'image qui arrive
			var $heightImageNext = temp[1];

			// donne une taille minimal à 
			var minWidth = 270;
			if($widthImageNext<minWidth) {
				$("#categoriesMiddle").find('.imgContainer').stop().animate({// modifie la width de la div contenant l'image pour que l'image reste bien au centre
					'width': minWidth+"px"
				}, 500);
				$($image).css('left', Math.round((minWidth-$widthImageNext)/2)+"px").animate({
					'height': $heightImageNext,
					'width': $widthImageNext
				}, 500);
			}
			else {
				$($image).css('left', "0px").animate({
					'height': $heightImageNext,
					'width': $widthImageNext
				}, 500);
				$("#categoriesMiddle").find('.imgContainer').stop().animate({// modifie la width de la div contenant l'image pour que l'image reste bien au centre
					width: $widthImageNext
				}, 500);
			}
		}

		function afficherSlider(element) {
			var listImg = "";
			$(idAlmy).find("a").each(function() {
				listImg += '<img src="'+$(this).attr('href')+'" alt="'+$(this).find("img").attr('alt')+'" title="'+$(this).find("img").attr('title')+'">';
			});
			var catTmp = '';
			for(var i = 0;i<category.length;i++) {
				catTmp += '<div id="listCategoriesSlider">'+category[i]+'</div>';
			}
			if($(idAlmy).find(".background").length==0) {
				$(idAlmy).append('<div class="background">\
							<div id="categoriesTop">'+catTmp+'</div>\
							<div id="categoriesMiddle">\
								<div class="imgContainer">\
									'+listImg+'\
									<div class="navDirection">\
										<ul><li><a class="navPrev"></a></li><li><a class="navPause"></a></li><li><a class="navNext"></a></li></ul>\
									</div>\
								</div>\
								<div id="mosaiqueBottom"></div>\
							</div>\
						</div>');
			}

			$(idAlmy).find("#categoriesTop #listCategoriesSlider").mouseover(function() {
				$(this).stop().animate({
						'opacity': 0.5
						},"fast");
			});
			$(idAlmy).find("#categoriesTop #listCategoriesSlider").mouseout(function() {
				$(this).stop().animate({
						'opacity': 1
						},"fast");
			});
			

			


			/////////////////////////////////////////////////////////
			////// Initialisation du slider /////////////////////////
			///////////////////////////////////////////////////////// 

			var premiereImage = $(idAlmy).find(".imgContainer img[src='"+$(element).attr("href")+"']");

			// positionnement de la première image du slider
			var $widthImageFirst = premiereImage.width(); // stock dans une variable la width de l'image qui arrive
			$(idAlmy).find('.imgContainer').css({// modifie la width de la div contenant l'image pour que l'image reste bien au centre
				width: $widthImageFirst,
				'text-align': 'center',
			}, 500);


			// Images du slider les unes dérrière les autres
			$(idAlmy).find('.imgContainer img').css({
				'width': defauts.widthImage,
				'display': 'block',
				position: 'absolute'
			});
			// on cache toutes les images sauf la premiere
			$(idAlmy).find('#categoriesMiddle img').hide();
			premiereImage.show();

			// positionnement des images suivantes du slider
			premiereImage.load(function() {
				alignImg($(this));
			}); // on align l'image centre


			/////////////////////////////////////////////////////////
			////// Contrôles du slider //////////////////////////////
			/////////////////////////////////////////////////////////

			// initialisation du timer du slider
			var timer = 0;
			
			// mise en route auto du slider
			if(defauts.running&&!defauts.paused) {
				runSlide();
			} else if(defauts.paused) { // si la config dit qu'on est en pause, on stop le slider
				defauts.paused = true;
				clearInterval(timer);
				timer = '';
				$('.navPause').css('background-position', '0px 0px');
			}


			// Hover de la souris sur l'image si le slider n'est pas en pause par défaut
			if(!defauts.paused) {
				if(defauts.pauseOnHover) {
					$(idAlmy).find('#categoriesMiddle img, .navNext, .navPrev').hover(function() {
						stopSlide();
						$('.navPause').css('background-position', '0px 0px');
					}, function() {
						defauts.paused = false;
						if(timer==''&&!defauts.paused) {
							runSlide();
						}
						$('.navPause').css('background-position', '-30px 0px');
					});
				}
			}

			// Hover de la souris sur l'image
				if(defauts.pauseOnHover) {
					$(idAlmy).find('#categoriesMiddle img, .navNext, .navPrev').hover(function() {
						stopSlide();
						$('.navPause').css('background-position', '0px 0px');
					}, function() {
						defauts.paused = false;
						if(timer==''&&!defauts.paused) {
							runSlide();
						}
						$('.navPause').css('background-position', '-30px 0px');
					});
				}

			// au clic sur le bouton play/pause
			$(idAlmy).find('.navPause').click(function() {
				if(!defauts.paused) { // au clic sur pause
					stopSlide();
					$(this).css('background-position', '0px 0px');
				} else { // bouton play
					defauts.paused = false;
					if(timer==''&&!defauts.paused) {
						runSlide();
					}
					$(this).css('background-position', '-30px 0px');
				}
			});


			// au clic sur le bouton next
			$(idAlmy).find('.navNext').click(function() { // au clic sur next
				if(dateTime+600<new Date().getTime()) {
					slideSuivant();
					dateTime = new Date().getTime();
				}
				return false;
			});

			// au clic sur le bouton précédent
			$(idAlmy).find('.navPrev').click(function() { // au clic sur next
				if(dateTime+600<new Date().getTime()) {
					slidePrecedent();
					dateTime = new Date().getTime();
				}
				return false;
			});
			
			// appuye sur la touche Echap
			$(document).keydown(function(e) {
				if(e.keyCode == 27) {
					$(idAlmy).find(".background").remove();
				}
			});
		}
	};
})(jQuery);
