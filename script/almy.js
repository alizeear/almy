(function($){
	$.fn.almy = function(params){

        //On définit nos paramètres par défaut
        var defauts = $.extend({
        	width        : '400px',
        	widthImage   : '200px'
        }, params);  
           		
        return this.each(function(){

        	$(this).css(
        		'width', defauts.width,
                "position", "relative"
        	);
            
        	$(this).find('img').css(
        		'width', defauts.widthImage,
                "position", "absolute"
        	).click(function(){
        		$(this).animate({
        			height: '0px',
        			width: '0px'
        		}, 500);
        	});
            $(this).find('#categoriesMiddle img:gt(0)').hide();

            $(this).find('.navNext').click(function(){
                var $imageSuivante = $('#categoriesMiddle img:visible').next('img');
                if($imageSuivante.length<1) $imageSuivante = $("#categoriesMiddle img:first");
                $("#categoriesMiddle img:visible").fadeOut();
                $imageSuivante.fadeIn();
                return false;
            });

        	$(this).find('a').click(function(){
        		return false;
        	});
		});						   
	};
})(jQuery);