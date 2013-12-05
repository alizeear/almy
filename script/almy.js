(function($){
	$.fn.almy = function(params){

        //On définit nos paramètres par défaut
        var defauts = $.extend({
        	width        : '400px',
        	widthImage   : '200px',
            running: true,
            paused: true,
            pauseTime: 3000,
            pauseOnHover: true
        }, params);  
        var category = Array();
        // recalcul de la taille des image au redimentionnement de la fenêtre
        $( window ).resize(function() {
            alignImg($('#categoriesMiddle img:visible')); // on align l'image centre
        });
        return this.each(function(){
            
                // on recupere les differentes catégories presentes dans les tag des balises "a"
                $(this).find("a").each(function() {
                    if((typeof $(this).attr("almy-cat") !== "undefined")) {
                        var cat = $(this).attr("almy-cat").split(";");
                        for (var i in a = cat) {
                            if(category.indexOf(a[i]) === -1)
                                category.push(a[i]);
                        }
                    }
                });
                
                // on affiche la liste des catégories presentes
                var htmlCat = "";
                for(var i=0; i<category.length; i++) {
                    htmlCat += '<div>'+category[i]+'</div>';
                }
                $(this).html('<div class="almyListCat">'+htmlCat+'</div>' + $(this).html());
            

            /////////////////////////////////////////////////////////
            ////// Initialisation du slider /////////////////////////
            /////////////////////////////////////////////////////////

        	$(this).css({
        		width: defauts.width,
                position: 'relative'
        	});

            // positionnement de la première image du slider
            var $widthImageFirst = $(this).find('#categoriesMiddle img:first').width(); // stock dans une variable la width de l'image qui arrive
                $(this).find('.imgContainer').css({ // modifie la width de la div contenant l'image pour que l'image reste bien au centre
                    width: $widthImageFirst,
                    'text-align': 'center',
                }, 500);

            
            // Images du slider les unes dérrière les autres
        	$(this).find('.imgContainer img').css({
        		'width': defauts.widthImage,
                        'display': 'block',
                        position: 'absolute'
        	});
            // on cache toutes les images sauf la premiere
            $(this).find('#categoriesMiddle img:gt(0)').hide();

            // positionnement des images suivantes du slider
            alignImg($('#categoriesMiddle img:visible')); // on align l'image centre
                
            // Affichage les unes à coté des autres des miniatures
            $(this).find('a img').css({
                'width': defauts.widthImage,
                        'display': 'inline-block',
                        'vertical-align': 'text-top'
            });

            /////////////////////////////////////////////////////////
            ////// Contrôles du slider //////////////////////////////
            /////////////////////////////////////////////////////////

            // initialisation du timer du slider
            var timer = 0; 

            // mise en route auto du slider
            if(defauts.running && !defauts.paused){
               runSlide();
            }else if(defauts.paused){ // si la config dit qu'on est en pause, on stop le slider
                defauts.paused = true;
                clearInterval(timer);
                timer = '';
                $('.navPause').css('background-position', '0px 0px');
            }


            // Hover de la souris sur l'image si le slider n'est pas en pause par défaut
            if(!defauts.paused){
                 if(defauts.pauseOnHover){
                     $(this).find('#categoriesMiddle img, .navNext, .navPrev').hover(function(){
                     stopSlide();
                    $('.navPause').css('background-position', '0px 0px');
                 }, function(){
                        defauts.paused = false;
                        if(timer == '' && !defauts.paused){
                           runSlide(); 
                        }
                        $('.navPause').css('background-position', '-30px 0px');
                    });
                 }
             } 

             // au clic sur le bouton play/pause
            $(this).find('.navPause').click(function(){ 
               if(!defauts.paused){ // au clic sur pause
                    stopSlide();
                    $(this).css('background-position', '0px 0px');
               }else{ // bouton play
                    defauts.paused = false;
                    if(timer == '' && !defauts.paused){
                        runSlide();
                    }
                    $(this).css('background-position', '-30px 0px');
               } 
            });


            // au clic sur le bouton next
            $(this).find('.navNext').click(function(){ // au clic sur next
                slideSuivant();
                return false;
            });

            // au clic sur le bouton précédent
             $(this).find('.navPrev').click(function(){ // au clic sur next
               slidePrecedent();
                return false;
            });
		});	
            
            
        /////////////////////////////////////////////////////////
        ////// Fonctions perso //////////////////////////////////
        /////////////////////////////////////////////////////////
        function stopSlide(){
            defauts.paused = true;
            clearInterval(timer);
            timer = '';
        }

        function runSlide(){
            timer = setInterval(function() {
                slideSuivant();
            }, defauts.pauseTime);
        }

        function slideSuivant(){
            var $imageSuivante = $('#categoriesMiddle img:visible').next('img'); // on stock la valeur de l'image suivante dans une variable
            if($imageSuivante.length<1) $imageSuivante = $("#categoriesMiddle img:first"); // on test si on est pas à la fin de la liste d'image et au cas ou on retourne à la première
            alignImg($imageSuivante); // on align l'image centre
            $("#categoriesMiddle img:visible").stop().fadeOut('slow'); // on cache l'image actuelle
            $imageSuivante.stop().fadeIn('slow'); // on affiche la nouvelle
            return true;
        }

        function slidePrecedent(){
            var $imageSuivante = $('#categoriesMiddle img:visible').prev('img'); // on stock la valeur de l'image suivante dans une variable
            if($imageSuivante.length<1) $imageSuivante = $("#categoriesMiddle img:last"); // on test si on est pas à la fin de la liste d'image et au cas ou on retourne à la première
            alignImg($imageSuivante); // on align l'image centre
            $("#categoriesMiddle img:visible").stop().fadeOut('slow'); // on cache l'image actuelle
            $imageSuivante.stop().fadeIn('slow'); // on affiche la nouvelle
            return true;
        }	
        
        // retourne les dimention optimal pour afficher l'image entiere sans la déformer
        function getDimMaxImg($W_Src, $H_Src) {
            var $H_max = $("#categoriesMiddle .imgContainer").height();
            var $W_max = $("#categoriesMiddle").width();
            var $W_test = Math.round($W_Src * ($H_max / $H_Src));
            var $H_test = Math.round($H_Src * ($W_max / $W_Src));
            
            if($W_Src<$W_max && $H_Src<$H_max) {
               $W = $W_Src;
               $H = $H_Src;
            } else if($W_max===0 && $H_max===0) {
               $W = $W_Src;
               $H = $H_Src;
            } else if($W_max===0) {
               $W = $W_test;
               $H = $H_max;
            } else if($H_max===0) {
               $W = $W_max;
               $H = $H_test;
            } else if($H_test > $H_max) {
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
                $("#categoriesMiddle").find('.imgContainer').stop().animate({ // modifie la width de la div contenant l'image pour que l'image reste bien au centre
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
                $("#categoriesMiddle").find('.imgContainer').stop().animate({ // modifie la width de la div contenant l'image pour que l'image reste bien au centre
                    width: $widthImageNext
                }, 500);
            }
        }
	};
})(jQuery);
