<?php
   function nameFile($fileName) {
      if(file_exists("images/".$fileName)) {
         $fileName = substr($fileName, 0, strpos($fileName, "."))."_1".substr($fileName, strpos($fileName, "."));
         echo $fileName;
         return nameFile($fileName);
      }
      else {
         return $fileName;
      }
   }
   
   function createMin($link) {
      // TODO
      return $link;
   }
   
   function to_permalink($str)
   {
   	if($str !== mb_convert_encoding( mb_convert_encoding($str, 'UTF-32', 'UTF-8'), 'UTF-8', 'UTF-32') )
   		$str = mb_convert_encoding($str, 'UTF-8', mb_detect_encoding($str));
   	$str = htmlentities($str, ENT_NOQUOTES, 'UTF-8');
   	$str = preg_replace('`&([a-z]{1,2})(acute|uml|circ|grave|ring|cedil|slash|tilde|caron|lig);`i', '\\1', $str);
   	$str = html_entity_decode($str, ENT_NOQUOTES, 'UTF-8');
   	$str = preg_replace(array('`[^a-z0-9]`i','`[-]+`'), '-', $str);
   	$str = strtolower( trim($str, '-') );
   	return $str;
   }
	
	function add_picture($file) {
		$name = md5(rand().time()."DuSelPourRenforcerMonHash").'.jpg';
		// Encode it correctly
		$encodedData = str_replace(' ','+',$file);
		$decodedData = base64_decode($encodedData);
		// Finally, save the image
		file_put_contents('images/'.$name, $decodedData) ;
		return 'images/'.$name;
	}
?>