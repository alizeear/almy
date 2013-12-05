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
        
        return this.each(function(){
                $(this).find("a").each(function() {
                    if((typeof $(this).attr("almy-cat") !== "undefined")) {
                        var cat = $(this).attr("almy-cat").split(";");
                        for (var i in a = cat) {
                            if(category.indexOf(a[i]) === -1)
                                category.push(a[i]);
                        }
                    }
                });
                var uiCat = "";
                for(var i=0; i<category.length; i++) {
                    uiCat += '<div>'+category[i]+'</div>';
                }
                $(this).html('<div class="almyListCat">'+uiCat+'</div>' + $(this).html());
            

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

            // positionnement des images suivantes du slider
            var $widthImageNext = $(this).find('#categoriesMiddle img:gt(0)').width(); // stock dans une variable la width de l'image qui arrive
                $(this).find('.imgContainer').css({ // modifie la width de la div contenant l'image pour que l'image reste bien au centre
                    width: $widthImageNext,
                    'text-align': 'center'
                }, 500);
            
            // Images du slider les unes dérrière les autres
        	$(this).find('.imgContainer img').css({
        		'width': defauts.widthImage,
                        'display': 'block',
                        position: 'absolute'
        	});
            // on cache toutes les images sauf la premiere
            $(this).find('#categoriesMiddle img:gt(0)').hide();

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
            var $widthImageNext = $('#categoriesMiddle img:visible').width(); // stock dans une variable la width de l'image qui arrive
            $('.imgContainer').animate({ // modifie la width de la div contenant l'image pour que l'image reste bien au centre
                width: $widthImageNext,
                'text-align': 'center'
            }, 500);
            $("#categoriesMiddle img:visible").stop().fadeOut('slow'); // on cache l'image actuelle
            $imageSuivante.stop().fadeIn('slow'); // on affiche la nouvelle
            return true;
        }

        function slidePrecedent(){
            var $imageSuivante = $('#categoriesMiddle img:visible').next('img'); // on stock la valeur de l'image suivante dans une variable
            if($imageSuivante.length<1) $imageSuivante = $("#categoriesMiddle img:first"); // on test si on est pas à la fin de la liste d'image et au cas ou on retourne à la première
            var $widthImageNext = $('#categoriesMiddle img:visible').width(); // stock dans une variable la width de l'image qui arrive
            $('.imgContainer').animate({ // modifie la width de la div contenant l'image pour que l'image reste bien au centre
                width: $widthImageNext,
                'text-align': 'center'
            }, 500);
            $("#categoriesMiddle img:visible").stop().fadeOut('slow'); // on cache l'image actuelle
            $imageSuivante.stop().fadeIn('slow'); // on affiche la nouvelle
            return true;
        }				   
	};
})(jQuery);
