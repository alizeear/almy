<?php
   function nameFile($fileName) {
      if(file_exists("upload/".$fileName)) {
         $fileName = substr($fileName, 0, strpos($fileName, "."))."_1".substr($fileName, strpos($fileName, "."));
         echo $fileName;
         return nameFile($fileName);
      }
      else {
         return $fileName;
      }
   }
   
   
   function createMin($link, $H_max = 150, $W_max = 150, $compression = 70, $sortie = null) {
        if($sortie == null) {
            $temp = explode("/", $link);
            $sortie = "upload/miniatures/".$temp[count($temp)-1];
        }
        
        // recuperation des dimentions de la source
        if( !( list($W_Src, $H_Src) = @getimagesize($link) ) ) {
          return false;
        }
        
        // calcul des nouvelles dimentions
        $W_test = round($W_Src * ($H_max / $H_Src));
        $H_test = round($H_Src * ($W_max / $W_Src));
        if($W_Src<$W_max && $H_Src<$H_max) {
           $W = $W_Src;
           $H = $H_Src;
        } elseif($W_max==0 && $H_max==0) {
           $W = $W_Src;
           $H = $H_Src;
        } elseif($W_max==0) {
           $W = $W_test;
           $H = $H_max;
        } elseif($H_max==0) {
           $W = $W_max;
           $H = $H_test;
        } elseif($H_test > $H_max) {
           $W = $W_test;
           $H = $H_max;
        } else {
           $W = $W_max;
           $H = $H_test;
        }
    
        // copy de la source dans l'image de sortie
        $image = imagecreatetruecolor($W, $H);
        $source_image = imagecreatefromstring(file_get_contents($link));
        imagecopyresampled($image, $source_image, 0, 0, 0, 0, $W, $H, $W_Src, $H_Src);
        imagejpeg($image, $sortie, $compression);
        
        // retourne le lien vers la miniature
        return $sortie;
   }
	
	function add_picture($file) {
		$name = md5(rand().time()."AlmyUnPluginJQuery").'.jpg';
		// Encode it correctly
		$encodedData = str_replace(' ','+',$file);
		$decodedData = base64_decode($encodedData);
		// Finally, save the image
		file_put_contents('upload/'.$name, $decodedData) ;
		return 'upload/'.$name;
	}
?>