$(document).ready(function() {   
   initCat();
   
   $("#btnCatAdd").click(function() {
      loadOn();
      var requete = $.ajax({
   		url: "ajax.php?do=addCat",
   		type: "post",
   		data: {
   			name: $("#txtCatAdd").val()
   		},
   		success: function(){
   		   var json = JSON.parse(requete.responseText);
      	   showCat(json);
            initCat();
            if(json[0]==true) {
               $("#txtCatAdd").val("");
               $("#errCatAdd").text("");
            }
            else {
               $("#errCatAdd").text("Il est impossible d'ajouter cette catégorie.");
            }
            loadOff();
   		}
   	});
   });
   
   $("#txtCatAdd").keydown(function(e) {
      if(e.keyCode == 13) {
         $("#btnCatAdd").click();
      }
   });
});

function initCat() {
   $("#listeCat li").click(function () {
      var html = 'Nom de la Catégorie: \
              <div class="input-group"> \
                <input id="txtCatUpdate" type="text" class="form-control" value="'+$(this).text().substr(0,$(this).text().length-$(this).find("span").text().length)+'"> \
                <input id="idCatUpdate" type="hidden" value="'+$(this).find("span").text()+'"> \
                <span class="input-group-btn"> \
                  <button id="btnCatUpdate" class="btn btn-default" type="button">Modifier</button> \
                </span> \
              </div> \
              <button id="btnCatDelete" class="btn btn-danger btn-xs delete" type="button">Supprimer</button>';
      $("#reglage").html(html);
      
      $("#btnCatUpdate").click(function() {
         loadOn();
         var requete = $.ajax({
      		url: "ajax.php?do=updateCat",
      		type: "post",
      		data: {
      		   id: $("#idCatUpdate").val(),
      			name: $("#txtCatUpdate").val()
      		},
      		success: function(){
      		   var json = JSON.parse(requete.responseText);
      		   showCat(json);
               $("#reglage").html("");
               initCat();
               loadOff();
      		}
      	});
      });
      
      $("#txtCatUpdate").keydown(function(e) {
         if(e.keyCode == 13) {
            $("#btnCatUpdate").click();
         }
      });
      
      $("#btnCatDelete").click(function() {
         loadOn();
         var requete = $.ajax({
      		url: "ajax.php?do=deleteCat",
      		type: "post",
      		data: {
      		   id: $("#idCatUpdate").val()
      		},
      		success: function(){
      		   var json = JSON.parse(requete.responseText);
      		   showCat(json);
               $("#reglage").html("");
               initCat();
               loadOff();
      		}
      	});
      });
   });
   
   
   $('#uploadFrame').load(function() {
      loadOff();
   });
   
   document.getElementById('uploadForm').addEventListener('submit', function() {
       loadOn();
   }, true);
}

   
function showCat(json) {
   $("#listeCat").html("<ul></ul>");
   for (var i in a = json[1]) {
      $("#listeCat ul").append("<li>"+a[i]['name']+"<span class=\"id\">"+a[i]['id']+"</class></li>");
   }
}

function loadOn() {
   $("#load").fadeIn("fast");
}
function loadOff() {
   $("#load").fadeOut("fast");
}