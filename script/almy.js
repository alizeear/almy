if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(elt) {
    /* function debug ie8 indeof of in array (Almy) */
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;
    for (; from < len; from++){
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

(function($) {

	$.fn.almy = function(params) {

		//On définit nos paramètres par défaut
		var defauts = $.extend({
			width: '400px',
			widthImage: '200px',
			blocDescriptionOnImg: true,
			blocDescriptionTop: true,
			textAlignInfoImgTop: 'center',
			running: true,
			paused: true,
			pauseTime: 3000,
			navBar: true,
			controlKey: true,
			animationDesc: 'fade',
			barreTop: true,
			classNavigationCat: 'classNavigationCat',
			pauseOnHover: false
		}, params);
		
		var timersCooldown = Array();
		var dateLastCat = new Date().getTime();
		
		var dateTime = new Date().getTime();
		var idAlmy = "#"+$(this).attr("id");
		var category = Array();
		
		var index = 0;
		var timer;
		var imagesAll 	= Array();

		// affichage d'un message pour prévenir que le plugin ne fonctionne pas bien sous ie7
		if(!((navigator.userAgent.toLowerCase().indexOf("msie") == -1) || (parseInt(navigator.userAgent.toLowerCase().substr(navigator.userAgent.toLowerCase().indexOf("msie")+5)) > 7))) {
			alert("Attention, votre navigateur n'est pas compatible avec ce plugin !");
		}

		// recalcul de la taille des image au redimentionnement de la fenêtre
		$(window).resize(function() {
			if($('#categoriesMiddle').length !== 0)
				alignImg($('#categoriesMiddle img:visible')); // on align l'image centre
			
			var tailleUl = 0;
			$(idAlmy).find('#mosaiqueBottom ul li').each(function(){
				$(this).width($(this).find("img").width());
				tailleUl += $(this).outerWidth(true);
			});
			$(idAlmy).find('#mosaiqueBottom ul').width(tailleUl);
			while(parseInt($(idAlmy).find('#mosaiqueBottom ul').css('left')) <= -5) {
				$(idAlmy).find('#mosaiqueBottom ul').css('left', '-=15')
			}
			$(idAlmy).find(".navPrevMosaique, .navNextMosaique").height($(idAlmy).find("#mosaiqueBottom").height());
			moveSelected();
		});
		return this.each(function() {

			// on recupere les differentes catégories presentes dans les tag des balises "a"
			$(this).find("a").each(function() {
				// precharge les images
				var img = new Image();
				img.src = $(this).attr("href");
				
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
		   // $(this).css("border", "1px solid #333");
		   
		   // affichage des catégories
			if(category.length != 0 && ((navigator.userAgent.toLowerCase().indexOf("msie") == -1) || (parseInt(navigator.userAgent.toLowerCase().substr(navigator.userAgent.toLowerCase().indexOf("msie")+5)) > 8))) {
				var htmlCat = "<li class='"+defauts.classNavigationCat+"'><span class=\"all\">Toutes</span></li>";
				for(var i = 0;i<category.length;i++) {
					if(typeof  category[i] != "function")
						htmlCat += '<li class="'+defauts.classNavigationCat+'"><span>'+category[i]+'</span></li>';
				}
				$(this).prepend('<div class="almyListCat"><ul>'+htmlCat+'</ul></div>');
				$(".almyListCat").find("li").width($(this).find(".almyListCat").width()/$(".almyListCat").find("li").length);
				
				var n=0;
				$(this).find(".almyListCat ul li span").mouseenter(function() {
					$(this).parents("ul").find("span").stop().animate({
						'opacity': 0.7
					},200);
					$(this).stop().animate({
						'opacity': 1
					},200);
					var tempCat = $(this).text();
					if(!$(this).hasClass("all")) {
						$(idAlmy).find("a img").parent().each(function() {
							if($(this).attr("almy-cat").indexOf(tempCat) == -1) {
								if(dateLastCat+300 < new Date().getTime()) {
									$(this).stop().animate({
										'opacity': 0.6
									},200);
								}
								else {
									$(this).animate({
										'opacity': 0.6
									},200);
								}
							}
						});
					}
				}).mouseleave(function() {
					if($(this).parents("ul").find("span.active").length == 0) {
						$(this).parents("ul").find("span").stop().animate({
							'opacity': 1
						},200);
					}
					else{
						$(this).parents("ul").find("span.active").parent().stop().animate({
							'opacity': 1
						},200);
						$(this).parents("ul").find("span.active").stop().animate({
							'opacity': 1
						},200);
					}
					
					if(dateLastCat+300 < new Date().getTime()) {
						$(idAlmy).find("a img").parent().stop().animate({
							'opacity': 1
						},200);
					}
					else {
						$(idAlmy).find("a img").parent().animate({
							'opacity': 1
						},200);
					}
				}).click(function() { 
					var temp = new Date().getTime();
					if(dateLastCat+400 < temp)  {
						dateLastCat = temp;
						if($(this).hasClass("all")) {
							catSelect = new Array();
							$(idAlmy).find(".active").each(function() {
								$(this).removeClass("active");
								animateColor($(this));
							});
						}
						else {
							if(!$(this).hasClass("active")) {
								$(this).addClass("active")
							}
							else {
								$(this).removeClass("active")
							}
							
							var catSelect = Array();
							$(idAlmy).find(".active").each(function() {
								catSelect.push($(this).text());
							});
							$(this).css("backgroundColor", $(this).parent().css("backgroundColor"));
							animateColor($(this)); 
							var catSelect = Array();
							$(idAlmy).find(".active").each(function() {
								catSelect.push($(this).text());
							});
							$(this).css("backgroundColor", $(this).parent().css("backgroundColor"));
							animateColor($(this));
						}
						
						$(idAlmy).find("a img").parent().each(function() {
							var aff = true;
							for(var i in a = catSelect) {
								if($(this).attr("almy-cat").indexOf(a[i])===-1)
									aff = false;
							}
							if(aff) {
								$(this).show()
								$(this).animate({
									'opacity': 1
								},300).removeClass("off");
							}
							else {
								$(this).animate({
									'opacity': 0
								},300, function() {
									$(this).hide();
								}).addClass("off");
							}
						});
					}
				});
			}
			
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
			$(this).find('a').each(function() {
				$(this).css({
					'overflow': 'hidden',
					'height': $(this).find('a img').height(),
					'width': $(this).find('a img').width()
				});
			}).append('<div class="loupe"></div>').mouseover(function(){
				$(this).find('.loupe').stop().fadeIn();
			}).mouseout(function(){
				$(this).find('.loupe').stop().fadeOut();
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
			$(idAlmy).find('.navPause').css('background-position', '0px 0px');
			defauts.paused = true;
			if(timer != '')
				clearInterval(timer);
			timer = '';
			
			for(var i in a = timersCooldown) {
				clearInterval(a[i]);
			}
			timersCooldown = Array();
			$("#clock").find("div").show();
		}

		function runSlide() {
			var count = 0;
			$("#clock").find("td").each(function() {
				eval("timersCooldown["+(count+1)+"] = setTimeout(function() { $(\"#clock\").find(\"."+(count+1)+"\").find(\"div:first\").toggle(); },"+(count*(defauts.pauseTime/25))+")")
				count++;
			})
			timer = setInterval(function() {
				if(dateTime+600<new Date().getTime()) {
					var count = 0;
					slideSuivant();
					$("#clock").find("td").each(function() {
						eval("timersCooldown["+(count+1)+"] = setTimeout(function() { $(\"#clock\").find(\"."+(count+1)+"\").find(\"div:first\").toggle(); },"+(count*(defauts.pauseTime/25))+")")
						count++;
					})
					dateTime = new Date().getTime();
				}
			}, defauts.pauseTime);
		}
		
		function slideSuivant() {
			var infoTmp = getInfoImage(index);
			var imageActuel = $('#categoriesMiddle .imgContainer > img[src=\''+infoTmp['url']+'\']'); 
			index++;
			if(index >= imagesAll.length)
				index = 0;
			var infoTmp = getInfoImage(index);
			
			var imageSuivante = $('#categoriesMiddle .imgContainer > img[src=\''+infoTmp['url']+'\']'); // on stock la valeur de l'image suivante dans une variable
			// here
			changerImage(imageActuel, imageSuivante);
			return true;
		}
		
		function slidePrecedent() {
			var infoTmp = getInfoImage(index);
			var imageActuel = $('#categoriesMiddle .imgContainer > img[src=\''+infoTmp['url']+'\']'); 
			index--;
			if(index < 0)
				index = imagesAll.length-1;
			var infoTmp = getInfoImage(index);
			var imagePrecedente = $('#categoriesMiddle .imgContainer > img[src=\''+infoTmp['url']+'\']'); // on stock la valeur de l'image suivante dans une variable
			// here 
			changerImage(imageActuel, imagePrecedente);
			return true;
		}

		// retourne les dimention optimal pour afficher l'image entiere sans la déformer
		function getDimMaxImg($W_Src, $H_Src) {
			var $H_max = $("#categoriesMiddle .imgContainer").height();
			var $W_max = $("#categoriesMiddle").width();
			var $W_test = Math.round($W_Src*($H_max/$H_Src));
			var $H_test = Math.round($H_Src*($W_max/$W_Src));

			// if($W_Src<$W_max&&$H_Src<$H_max) {
				// $W = $W_Src;
				// $H = $H_Src;
			// } else if($W_max===0&&$H_max===0) {
				// $W = $W_Src;
				// $H = $H_Src;
			// } else 
			if($W_max===0) {
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
		
		function changerImage(imageActuel, imageSuivante) {
			if(timersCooldown.length != 0) {
				for(var i in a = timersCooldown) {
					clearInterval(a[i]);
				}
				timersCooldown = Array();
			}
			$("#clock").find("div").show();
			var infoTmp = getInfoImage(index);
			moveSelected();
			$(idAlmy).find(".descriptionDiv > h2").text(infoTmp['title']);
			$(idAlmy).find(".descriptionDiv > p").text(infoTmp['desc']);

			

			if(defauts.animationDesc == 'slideUp'){
				$(idAlmy).find(".descriptionDivTop").animate({
					'top': '-100%'
				}, 'fast', function(){
					$(idAlmy).find(".descriptionDivTop > h2").text(infoTmp['title']);
					$(idAlmy).find(".descriptionDivTop > p").text(infoTmp['desc']);
				}).animate({
					'top': '0'
				}, 'fast');
			}else if(defauts.animationDesc == 'fade'){
				$(idAlmy).find(".descriptionDivTop").fadeOut('fast', function(){
					$(idAlmy).find(".descriptionDivTop > h2").text(infoTmp['title']);
					$(idAlmy).find(".descriptionDivTop > p").text(infoTmp['desc']);
				}).fadeIn('fast');
			}

			alignImg(imageSuivante); // on align l'image centre
			var margin = ((imageSuivante.width()>$(imageActuel).width()))
				?(imageSuivante.width()+$(imageActuel).width())/2
				:($(imageActuel).width()-imageSuivante.width())/2;
			$(imageActuel).stop().css("marginLeft", "0px").animate({
				'marginLeft': margin,
				'opacity': 0
			},"slow", function() {
				$(this).hide().css({
					'opacity': 1,
					'marginLeft': "0px"
				});
			}); // on cache l'image actuelle
			
			imageSuivante.stop().fadeIn('slow'); // on affiche la nouvelle
		}
		
		function animateColor(element) {
			// variables pour la transition du la font color
			var colorStart = Array();
			var tempColor = $(element).css("color");
			if(tempColor.indexOf("rgb") == -1) {
				colorStart['r'] = parseInt(tempColor.substr(1,2));
				colorStart['g'] = parseInt(tempColor.substr(3,2));
				colorStart['b'] = parseInt(tempColor.substr(5,2));
			}
			else {
				if(tempColor.indexOf("rgba") == -1) {
					colorStart['r'] = parseInt(tempColor.substr(4, tempColor.length-5).split(", ")[0]);
					colorStart['g'] = parseInt(tempColor.substr(4, tempColor.length-5).split(", ")[1]);
					colorStart['b'] = parseInt(tempColor.substr(4, tempColor.length-5).split(", ")[2]);
				}
				else {
					colorStart['r'] = parseInt(tempColor.substr(5, tempColor.length-5).split(", ")[0]);
					colorStart['g'] = parseInt(tempColor.substr(5, tempColor.length-5).split(", ")[1]);
					colorStart['b'] = parseInt(tempColor.substr(5, tempColor.length-5).split(", ")[2]);
				}
			}
			// variables pour la transition du la background color
			var backStart = Array();
			var tempColor = $(element).css("backgroundColor");
			if(tempColor.indexOf("rgb") == -1) {
				backStart['r'] = parseInt(tempColor.substr(1,2));
				backStart['g'] = parseInt(tempColor.substr(3,2));
				backStart['b'] = parseInt(tempColor.substr(5,2));
			}
			else {
				if(tempColor.indexOf("rgba") == -1) {
					backStart['r'] = parseInt(tempColor.substr(4, tempColor.length-5).split(", ")[0]);
					backStart['g'] = parseInt(tempColor.substr(4, tempColor.length-5).split(", ")[1]);
					backStart['b'] = parseInt(tempColor.substr(4, tempColor.length-5).split(", ")[2]);
				}
				else {
					backStart['r'] = parseInt(tempColor.substr(5, tempColor.length-5).split(", ")[0]);
					backStart['g'] = parseInt(tempColor.substr(5, tempColor.length-5).split(", ")[1]);
					backStart['b'] = parseInt(tempColor.substr(5, tempColor.length-5).split(", ")[2]);
				}
			}
			
			if($(element).hasClass("active")) {
				var colorEnd = {r: 31, g: 31, b:31};
				var backEnd = {r: 221, g: 221, b:221};
			}
			else {
				var colorEnd = {r: 221, g: 221, b:221};
				var backEnd = {r: 51, g: 51, b:51};
			}
			
			var colorStep = new Array();
			colorStep['r'] = parseInt((colorEnd['r'] - colorStart['r'])/10);
			colorStep['g'] = parseInt((colorEnd['g'] - colorStart['g'])/10);
			colorStep['b'] = parseInt((colorEnd['b'] - colorStart['b'])/10);
					
			var backStep = new Array();
			backStep['r'] = parseInt((backEnd['r'] - backStart['r'])/10);
			backStep['g'] = parseInt((backEnd['g'] - backStart['g'])/10);
			backStep['b'] = parseInt((backEnd['b'] - backStart['b'])/10);
			
			for(var i=0; i<10; i++) {
				setTimeout(function() {
					var colorActuel = new Array();
					var tempColor = $(element).css("color");
					if(tempColor.indexOf("rgb") == -1) {
						colorActuel['r'] = parseInt(tempColor.substr(1,2));
						colorActuel['g'] = parseInt(tempColor.substr(3,2));
						colorActuel['b'] = parseInt(tempColor.substr(5,2));
					}
					else {
						colorActuel['r'] = parseInt(tempColor.substr(4, tempColor.length-5).split(", ")[0]);
						colorActuel['g'] = parseInt(tempColor.substr(4, tempColor.length-5).split(", ")[1]);
						colorActuel['b'] = parseInt(tempColor.substr(4, tempColor.length-5).split(", ")[2]);
					}
					
					var backActuel = new Array();
					var tempColor = $(element).css("backgroundColor");
					if(tempColor.indexOf("rgb") == -1) {
						backActuel['r'] = parseInt(tempColor.substr(1,2));
						backActuel['g'] = parseInt(tempColor.substr(3,2));
						backActuel['b'] = parseInt(tempColor.substr(5,2));
					}
					else {
						if(tempColor.indexOf("rgba") == -1) {
							backActuel['r'] = parseInt(tempColor.substr(4, tempColor.length-5).split(", ")[0]);
							backActuel['g'] = parseInt(tempColor.substr(4, tempColor.length-5).split(", ")[1]);
							backActuel['b'] = parseInt(tempColor.substr(4, tempColor.length-5).split(", ")[2]);
						}
						else {
							backActuel['r'] = parseInt(tempColor.substr(5, tempColor.length-5).split(", ")[0]);
							backActuel['g'] = parseInt(tempColor.substr(5, tempColor.length-5).split(", ")[1]);
							backActuel['b'] = parseInt(tempColor.substr(5, tempColor.length-5).split(", ")[2]);
						}
					}
					
					$(element).css("color", "rgb("+(colorActuel['r']+colorStep['r'])+", "+(colorActuel['g']+colorStep['g'])+", "+(colorActuel['b']+colorStep['b'])+")");
					$(element).css("backgroundColor", "rgb("+(backActuel['r']+backStep['r'])+", "+(backActuel['g']+backStep['g'])+", "+(backActuel['b']+backStep['b'])+")");
				}, i*35);
			}
		}
		
		function moveSelected() {
			var infoTmp = getInfoImage(index);
			var tempImgMin = $("#mosaiqueBottom ul li img[src='"+infoTmp['url_min']+"']");
			var tempLeft = 0;
			$("#mosaiqueBottom ul li").slice(0,index).each(function() {
				tempLeft += $(this).outerWidth(true);
			});
			console.log($(idAlmy).find('#mosaiqueBottom ul').css("left"));
			console.log(tempLeft);
			tempLeft += parseInt($(idAlmy).find('#mosaiqueBottom ul').css("left"));
			$("#selected").stop().animate({
				'left': tempLeft,
				'width': $(tempImgMin).width()+24
			},200);
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
				$($image).css('left', Math.round((minWidth-$widthImageNext)/2)+"px").stop().animate({
					'height': $heightImageNext,
					'width': $widthImageNext
				}, 500);
			}
			else {
				$($image).css('left', "0px").stop().animate({
					'height': $heightImageNext,
					'width': $widthImageNext
				}, 500);
				$("#categoriesMiddle").find('.imgContainer').stop().animate({// modifie la width de la div contenant l'image pour que l'image reste bien au centre
					width: $widthImageNext
				}, 500);
			}
		}

		function afficherSlider(element) {
			imagesAll = Array();
			var indTmp = 0;
			$(idAlmy).find("a:not(.off)").each(function() {
				imagesAll.push({
					'index': indTmp,
					'url': $(this).attr('href'), 
					'url_min': $(this).find('img').attr('src'),
					'title': $(this).find('img').attr('title'),
					'desc': $(this).find('img').attr('alt'),
					'cat': $(this).attr('almy-cat').split(';')
				});
				indTmp++;
			});
			var infoTmp = getInfoImage($(element).attr("href"));
			index = imagesAll.indexOf(infoTmp);
			var listImg = "";
			var listMiniatures = "";
			$(imagesAll).each(function() {
				listImg += '<img src="'+$(this)[0]['url']+'" alt="'+$(this)[0]['desc']+'" title="'+$(this)[0]['title']+'">';
				listMiniatures += '<li><img src="'+$(this)[0]['url_min']+'" alt="'+$(this)[0]['desc']+'" title="'+$(this)[0]['title']+'"></li>';
			});

			var blocDesc = "";
			if(defauts.blocDescriptionOnImg)
				blocDesc = '<div class="descriptionDiv"><h2>'+infoTmp['title']+'</h2><p>'+infoTmp['desc']+'</p></div>';

			var blocDescTop = "";
			if(defauts.blocDescriptionTop)
				blocDescTop = '<div class="descriptionDivTop"><h2>'+infoTmp['title']+'</h2><p>'+infoTmp['desc']+'</p></div>';
			
			

			var catTmp = '';
			for(var i = 0;i<category.length;i++) {
				catTmp += '<div id="listCategoriesSlider">'+category[i]+'</div>';
			}

			if($(idAlmy).find(".background").length==0) {
				$(idAlmy).append('<div class="background">\
						'+((defauts.barreTop)?'\
							<div id="categoriesTop">\
								<img src="images/up.png" alt="up" id="up">\
								<table id="clock">\
									<tr>\
										<td class="1"></td><td class="2"></td><td class="3"></td><td class="4"></td><td class="5"></td>\
									</tr>\
									<tr>\
										<td class="16"></td><td class="17"></td><td class="18"></td><td class="19"></td><td class="6"></td>\
									</tr>\
									<tr>\
										<td class="15"></td><td class="24"></td><td class="25"></td><td class="20"></td><td class="7"></td>\
									</tr>\
									<tr>\
										<td class="14"></td><td class="23"></td><td class="22"></td><td class="21"></td><td class="8"></td>\
									</tr>\
									<tr>\
										<td class="13"></td><td class="12"></td><td class="11"></td><td class="10"></td><td class="9"></td>\
									</tr>\
								</table>\
								'+blocDescTop+'\
							</div>\
						':'')+'\
							<div id="categoriesMiddle">\
								<div class="imgContainer">\
									'+listImg+'\
									'+((defauts.navBar)?'\
											<div class="navDirection">\
												<ul><li><a class="navPrev"></a></li><li><a class="navPause"></a></li><li><a class="navNext"></a></li></ul>\
											</div>\
											':'')+'\
									'+blocDesc+'\
								</div>\
								<div id="mosaiqueBottom">\
									<div id="selected"></div>\
									<ul>'+listMiniatures+'</ul>\
									<div class="navDirectionMosaique">\
										<a class="navPrevMosaique"></a>\
										<a class="navNextMosaique"></a>\
									</div>\
								</div>\
							</div>\
						</div>');

				
				
				

				$(idAlmy).find(".navPrevMosaique, .navNextMosaique").height($(idAlmy).find("#mosaiqueBottom").height());
				$("#clock").find("td").each(function() {
					$(this).html("<div></div><div></div>");
				});
				$(idAlmy).find('.background').stop().animate({
					'top': '0'
				}, 450).animate({'top': '-2%'}, 200).animate({'top': '0'}, 300);
			}
			moveSelected();
				
			/////////////////////////////////////////////////////////
			////// Changement image clic image mosaique /////////////
			/////////////////////////////////////////////////////////

			$('#mosaiqueBottom ul li img').click(function(){
				var infoTmp = getInfoImage(index);
				var imageActuel = $('#categoriesMiddle .imgContainer > img[src=\''+infoTmp['url']+'\']'); 
				var infoTmp = getInfoImage($(this).attr('src'));
				index = infoTmp['index'];
				var imageSuivante = $('#categoriesMiddle .imgContainer > img[src=\''+infoTmp['url']+'\']'); // on stock la valeur de l'image suivante dans une variable
				// here 
				changerImage(imageActuel, imageSuivante);
			});



			/////////////////////////////////////////////////////////
			////// Gestion du bloc description //////////////////////
			/////////////////////////////////////////////////////////

			$(idAlmy).find(".descriptionDiv").mouseover(function() {
				$(this).stop().animate({
						'right': 0
						},"fast");
			}).mouseout(function() {
				$(this).stop().animate({
						'right': '-64%'
						},"fast");
			});

			$(idAlmy).find('.descriptionDivTop').css({
				'text-align': defauts.textAlignInfoImgTop
			});

			/////////////////////////////////////////////////////////
			////// Initialisation du slider /////////////////////////
			///////////////////////////////////////////////////////// 

			var premiereImage = $(idAlmy).find(".imgContainer img[src='"+$(element).attr("href")+"']");

			// positionnement de la première image du slider
			var $widthImageFirst = premiereImage.width(); // stock dans une variable la width de l'image qui arrive
			$(idAlmy).find('.imgContainer').css({// modifie la width de la div contenant l'image pour que l'image reste bien au centre
				width: $widthImageFirst,
				'text-align': 'center'
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
			if(!defauts.paused&&defauts.running) {
				if(defauts.pauseOnHover) {
					$(idAlmy).find('#categoriesMiddle img, .navNext, .navPrev, .descriptionDiv').hover(function() {
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
					$(idAlmy).find('#categoriesMiddle img, .navNext, .navPrev, .descriptionDiv').hover(function() {
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
					if(timer == '')
						stopSlide();
					slideSuivant();
					dateTime = new Date().getTime();
				}
				return false;
			});

			// au clic sur le bouton précédent
			$(idAlmy).find('.navPrev').click(function() { // au clic sur next
				if(dateTime+600<new Date().getTime()) {
					if(timer == '')
						stopSlide();
					slidePrecedent();
					dateTime = new Date().getTime();
				}
				return false;
			});
			


			// clique sur le bouton de remonté
				$(idAlmy).find("#categoriesTop > img").click(function(){
					$(idAlmy).find(".background").stop().animate({
						'top': '-101%'
					}, 450, function(e) {
						$(this).remove();
					});
					stopSlide();
				});

			if(defauts.controlKey){
			// appuye sur la touche Echap
				$(document).keydown(function(e) {
					if(e.keyCode == 27) {
						$(idAlmy).find(".background").stop().animate({
							'top': '-101%'
						}, 450, function(e) {
							$(this).remove();
						});
					}
				
					if(e.keyCode == 39) {
						if(dateTime+600<new Date().getTime()) {
							if(timer == '')
								stopSlide();
							slideSuivant();
							dateTime = new Date().getTime();
						}
					}
					if(e.keyCode == 37) {
						if(dateTime+600<new Date().getTime()) {
							if(timer == '')
								stopSlide();
							slidePrecedent();
							dateTime = new Date().getTime();
						}
					}
					if(e.keyCode == 32) {
						if(!defauts.paused) {
							stopSlide();
						} else {
							defauts.paused = false;
							if(timer==''&&!defauts.paused) {
								runSlide();
							}
							$(idAlmy).find('.navPause').css('background-position', '-30px 0px');
						}
					}
				});
			}

			/////////////////////////////////////////////////////////
			////// Controle mosaique ////////////////////////////////
			/////////////////////////////////////////////////////////

			

			$(idAlmy).find('.navNextMosaique').mouseover(function() {
				time = '';
				time = setInterval(function() {
					var tailleUl = $(idAlmy).find('#mosaiqueBottom ul').width();

					if(parseInt($(idAlmy).find('#mosaiqueBottom ul').css('left')) >= (parseInt($(idAlmy).find('#mosaiqueBottom').width()) - parseInt($(idAlmy).find('#mosaiqueBottom ul').width()))){
						$(idAlmy).find('#mosaiqueBottom ul').stop().animate({
						'left': $(idAlmy).find('#mosaiqueBottom ul').css('left', '-=15')
						}, 30);
						$(idAlmy).find('#selected').stop().animate({
							'left': $(idAlmy).find('#selected').css('left', '-=15')
						}, 30);
					}
				}, 30);
			}).mouseout(function() {
				clearInterval(time);
				timer = '';
			});


			$(idAlmy).find('.navPrevMosaique').mouseover(function() {
				time = '';
				time = setInterval(function() {
					if(parseInt($(idAlmy).find('#mosaiqueBottom ul').css('left')) <= -5){
						$(idAlmy).find('#mosaiqueBottom ul').stop().animate({
							'left': $(idAlmy).find('#mosaiqueBottom ul').css('left', '+=15')
						}, 30);
						$(idAlmy).find('#selected').stop().animate({
							'left': $(idAlmy).find('#selected').css('left', '+=15')
						}, 30);
					}
				}, 30);
			}).mouseout(function() {
				clearInterval(time);
				timer = '';
			});

			var tailleUl = 0;
			$(idAlmy).find('#mosaiqueBottom ul li').each(function(){
				tailleUl += $(this).outerWidth(true);
			});
			$(idAlmy).find('#mosaiqueBottom ul').width(tailleUl);
		}


		/////////////////////////////////////////////////////////
		////// Retourne toutes les infos d'une image ////////////
		/////////////////////////////////////////////////////////

		function getInfoImage(search){
			//here 
			for(var i = 0;i<imagesAll.length;i++) {
				if(imagesAll[i]['url'] == search || imagesAll[i]['url_min'] == search || imagesAll[i]['index'] == search){
					return imagesAll[i];
				}
			}
			return false;
		}
	};
})(jQuery);
