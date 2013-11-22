(function($){
	$.fn.almy = function(params){

        //On définit nos paramètres par défaut
        var defauts = $.extend({
        	width        : '400px',
        	widthImage   : '200px'
        }, params);  
           		
        return this.each(function(){

        	$(this).css(
        		'width', defauts.width
        	);
        	$(this).find('img').css(
        		'width', defauts.widthImage
        	).click(function(){
        		$(this).animate({
        			height: '0px',
        			width: '0px'
        		}, 500);
        	});
        	$(this).find('a').click(function(){
        		return false;
        	});
		});						   
	};
})(jQuery);