<?php 
	$images = $db->getListeImage();
        for($i=0; $i<count($images); $i++) {
            $temp = array();
            foreach ($db->getListeCategorieImg($images[$i]['id']) as $cat) {
					if($cat['is'] == true)
						$temp[] = $cat['name'];
            }
            $images[$i]['cat'] = $temp;
        }
	
	$options = $db->getOption();
?>