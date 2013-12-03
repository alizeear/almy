(function($){
	$.fn.almy = function(params){

        //On définit nos paramètres par défaut
        var defauts = $.extend({
        	width        : '400px',
        	widthImage   : '200px'
        }, params);  
           		
        return this.each(function(){

        	$(this).css({
        		width: defauts.width,
                position: 'relative'
        	});

            var $widthImageNext = $(this).find('#categoriesMiddle img:gt(0)').width(); // stock dans une variable la width de l'image qui arrive
                $(this).find('.imgContainer').css({ // modifie la width de la div contenant l'image pour que l'image reste bien au centre
                    width: $widthImageNext
                }, 500);
            
        	$(this).find('img').css({
        		width: defauts.widthImage,
                position: 'absolute'
        	})
         //    .click(function(){
        	// 	$(this).animate({
        	// 		height: '0px',
        	// 		width: '0px'
        	// 	}, 500);
        	// })
            ;
            $(this).find('#categoriesMiddle img:gt(0)').hide();// on cache toutes les images sauf la premiere

            $(this).find('.navNext').click(function(){ // au clic sur next
                var $imageSuivante = $('#categoriesMiddle img:visible').next('img'); // on stock la valeur de l'image suivante dans une variable
                if($imageSuivante.length<1) $imageSuivante = $("#categoriesMiddle img:first"); // on test si on est pas à la fin de la liste d'image et au cas ou on retourne à la première
                var $widthImageNext = $('#categoriesMiddle img:visible').width(); // stock dans une variable la width de l'image qui arrive
                $('.imgContainer').animate({ // modifie la width de la div contenant l'image pour que l'image reste bien au centre
                    width: $widthImageNext
                }, 500);
                $("#categoriesMiddle img:visible").stop().fadeOut('slow'); // on cache l'image actuelle
                $imageSuivante.stop().fadeIn('slow'); // on affiche la nouvelle
                return false;
            });

        	$(this).find('a').click(function(){
        		return false;
        	});
		});						   
	};
})(jQuery);