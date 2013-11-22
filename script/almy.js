(function($){
	$.fn.almy = function(params){

        //On définit nos paramètres par défaut
        var defauts = $.extend({
        	text         : 'Hello, World!',
            color        : 'blue',
            fontWeight    : null
        }, params);  
           		
        return this.each(function(){

        	$(this).html($(this).html()+"<br>"+defauts.text).css(
        		'color', defauts.color,
        		'fontWeight', defauts.fontWeight
        	);

		});						   
	};
})(jQuery);