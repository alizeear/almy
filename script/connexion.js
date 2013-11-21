 jQuery(document).ready(function(){
 	$("#connexion").click(function(){
      	$("#backgroundConnex").fadeIn("slow");
    });
 	$("#backgroundConnex").click(function(e){
 	 	if($(e.target).attr("id") == "backgroundConnex")
        	$("#backgroundConnex").fadeOut("slow");
    });

    $("#formSignin").bind("submit", function(){
    	var retour = true;
    	$("#error").html("");

    	if ($("#login").val().length==0) {
		    $("#error").append("<div>Champs nom non renseigné</div>");
			retour = false;
    	};
    	if ($("#password").val().length==0) {
    		$("#error").append("<div>Mot de passe invalide</div>");
    		retour = false;
    	};
    	return retour;
	});

    // si il y a une erreur php on simule un clique pour réafficher le formulaire
    if($("#errorPhp").length != 0)
        $("#connexion").click();
});